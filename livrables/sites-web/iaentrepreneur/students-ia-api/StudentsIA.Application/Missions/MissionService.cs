using Microsoft.EntityFrameworkCore;
using StudentsIA.Application.Common;
using StudentsIA.Domain.Entities;
using StudentsIA.Domain.Enums;

namespace StudentsIA.Application.Missions;

public interface IMissionService
{
    Task<MissionDto> CreateAsync(Guid userId, CreateMissionRequest request, CancellationToken ct = default);
    Task<IReadOnlyList<MissionDto>> GetMineAsync(Guid userId, CancellationToken ct = default);
    Task<MissionDto?> GetByIdAsync(Guid userId, Guid missionId, CancellationToken ct = default);
    Task<MissionDto?> AdvanceAsync(Guid userId, Guid missionId, CancellationToken ct = default);
}

/// <summary>Logique métier des missions : création + matching, listing par rôle, cycle de vie, paiement simulé.</summary>
public class MissionService(IApplicationDbContext db) : IMissionService
{
    private const int MaxProposals = 5;

    public async Task<MissionDto> CreateAsync(Guid userId, CreateMissionRequest request, CancellationToken ct = default)
    {
        var company = await db.Companies.FirstOrDefaultAsync(c => c.ProfileId == userId, ct)
            ?? throw new InvalidOperationException("Seule une entreprise peut créer une mission.");

        var mission = new Mission
        {
            CompanyId = company.Id,
            Title = request.Title,
            Description = request.Description,
            Sector = request.Sector,
            Budget = request.Budget,
            Status = MissionStatus.Demande,
        };
        db.Missions.Add(mission);
        await db.SaveChangesAsync(ct);

        await RunMatchingAsync(mission, request.Expertise, ct);

        return await GetByIdAsync(userId, mission.Id, ct)
            ?? throw new InvalidOperationException("Mission introuvable après création.");
    }

    /// <summary>Crée des propositions pour les experts certifiés/disponibles dont l'expertise ou le secteur correspond.</summary>
    private async Task RunMatchingAsync(Mission mission, string? expertise, CancellationToken ct)
    {
        var query = db.Experts.Where(e => e.Certified && e.Available);
        if (!string.IsNullOrWhiteSpace(expertise))
            query = query.Where(e => e.Expertise.Contains(expertise));
        else if (!string.IsNullOrWhiteSpace(mission.Sector))
            query = query.Where(e => e.Sectors.Contains(mission.Sector));

        var experts = await query.OrderByDescending(e => e.Rating).Take(MaxProposals).ToListAsync(ct);

        foreach (var expert in experts)
        {
            db.MissionProposals.Add(new MissionProposal
            {
                MissionId = mission.Id,
                ExpertId = expert.Id,
                Status = ProposalStatus.Proposee,
            });
        }
        if (experts.Count > 0) await db.SaveChangesAsync(ct);
    }

    public async Task<IReadOnlyList<MissionDto>> GetMineAsync(Guid userId, CancellationToken ct = default)
    {
        var company = await db.Companies.FirstOrDefaultAsync(c => c.ProfileId == userId, ct);
        var query = db.Missions.AsQueryable();

        if (company is not null)
        {
            query = query.Where(m => m.CompanyId == company.Id);
        }
        else
        {
            var expert = await db.Experts.FirstOrDefaultAsync(e => e.ProfileId == userId, ct);
            if (expert is null) return [];
            query = query.Where(m => m.ExpertId == expert.Id);
        }

        var missions = await query.OrderByDescending(m => m.CreatedAt).ToListAsync(ct);
        var result = new List<MissionDto>();
        foreach (var m in missions) result.Add(await MapAsync(m, ct));
        return result;
    }

    public async Task<MissionDto?> GetByIdAsync(Guid userId, Guid missionId, CancellationToken ct = default)
    {
        var mission = await db.Missions.FirstOrDefaultAsync(m => m.Id == missionId, ct);
        if (mission is null) return null;
        if (!await CanAccessAsync(userId, mission, ct)) return null;
        return await MapAsync(mission, ct);
    }

    public async Task<MissionDto?> AdvanceAsync(Guid userId, Guid missionId, CancellationToken ct = default)
    {
        var mission = await db.Missions.FirstOrDefaultAsync(m => m.Id == missionId, ct);
        if (mission is null) return null;
        if (!await CanAccessAsync(userId, mission, ct)) return null;

        var next = MissionRules.Next(mission.Status);
        if (next is null) return await MapAsync(mission, ct);

        mission.Status = next.Value;

        if (next == MissionStatus.Validee && mission.Budget is { } budget)
        {
            var commission = Math.Round(budget * MissionRules.CommissionRate, 2);
            db.Payments.Add(new Payment
            {
                MissionId = mission.Id,
                Amount = budget,
                Commission = commission,
                Status = PaymentStatus.PayeSimule,
                PaidAt = DateTime.UtcNow,
            });
        }

        await db.SaveChangesAsync(ct);
        return await MapAsync(mission, ct);
    }

    private async Task<bool> CanAccessAsync(Guid userId, Mission mission, CancellationToken ct)
    {
        var isOwner = await db.Companies.AnyAsync(c => c.Id == mission.CompanyId && c.ProfileId == userId, ct);
        if (isOwner) return true;
        return mission.ExpertId is { } eid
            && await db.Experts.AnyAsync(e => e.Id == eid && e.ProfileId == userId, ct);
    }

    private async Task<MissionDto> MapAsync(Mission m, CancellationToken ct)
    {
        var companyName = await db.Companies.Where(c => c.Id == m.CompanyId).Select(c => c.CompanyName).FirstOrDefaultAsync(ct) ?? "";
        string? expertName = null;
        if (m.ExpertId is { } eid)
        {
            expertName = await db.Experts.Where(e => e.Id == eid)
                .Select(e => e.Profile.FullName).FirstOrDefaultAsync(ct);
        }
        decimal? commission = m.Budget is { } b ? Math.Round(b * MissionRules.CommissionRate, 2) : null;
        decimal? net = m.Budget is { } bb ? bb - commission : null;
        return new MissionDto(m.Id, m.Title, m.Description, m.Sector, m.Budget,
            MissionRules.Label(m.Status), companyName, expertName, commission, net);
    }
}
