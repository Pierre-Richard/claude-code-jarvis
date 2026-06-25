using Microsoft.EntityFrameworkCore;
using StudentsIA.Application.Common;
using StudentsIA.Domain.Enums;

namespace StudentsIA.Application.Proposals;

public record ProposalDto(
    Guid Id,
    Guid MissionId,
    string MissionTitle,
    string CompanyName,
    string? Sector,
    string Description,
    decimal? Budget,
    string Status);

public interface IProposalService
{
    Task<IReadOnlyList<ProposalDto>> GetForExpertAsync(Guid userId, CancellationToken ct = default);
    Task<bool> AcceptAsync(Guid userId, Guid proposalId, CancellationToken ct = default);
    Task<bool> RefuseAsync(Guid userId, Guid proposalId, CancellationToken ct = default);
}

/// <summary>Gestion des propositions de mission côté expert : consultation, acceptation, refus.</summary>
public class ProposalService(IApplicationDbContext db) : IProposalService
{
    public async Task<IReadOnlyList<ProposalDto>> GetForExpertAsync(Guid userId, CancellationToken ct = default)
    {
        var expert = await db.Experts.FirstOrDefaultAsync(e => e.ProfileId == userId, ct);
        if (expert is null) return [];

        return await db.MissionProposals
            .Where(p => p.ExpertId == expert.Id && p.Status == ProposalStatus.Proposee)
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new ProposalDto(
                p.Id,
                p.MissionId,
                p.Mission.Title,
                p.Mission.Company.CompanyName,
                p.Mission.Sector,
                p.Mission.Description,
                p.Mission.Budget,
                p.Status.ToString()))
            .ToListAsync(ct);
    }

    public async Task<bool> AcceptAsync(Guid userId, Guid proposalId, CancellationToken ct = default)
    {
        var proposal = await LoadOwnedProposalAsync(userId, proposalId, ct);
        if (proposal is null) return false;

        proposal.Status = ProposalStatus.Acceptee;

        var mission = await db.Missions.FirstAsync(m => m.Id == proposal.MissionId, ct);
        mission.ExpertId = proposal.ExpertId;
        mission.Status = MissionStatus.Cadrage;

        // Les autres propositions de cette mission sont refusées.
        var others = await db.MissionProposals
            .Where(p => p.MissionId == proposal.MissionId && p.Id != proposal.Id)
            .ToListAsync(ct);
        foreach (var o in others) o.Status = ProposalStatus.Refusee;

        await db.SaveChangesAsync(ct);
        return true;
    }

    public async Task<bool> RefuseAsync(Guid userId, Guid proposalId, CancellationToken ct = default)
    {
        var proposal = await LoadOwnedProposalAsync(userId, proposalId, ct);
        if (proposal is null) return false;
        proposal.Status = ProposalStatus.Refusee;
        await db.SaveChangesAsync(ct);
        return true;
    }

    private async Task<Domain.Entities.MissionProposal?> LoadOwnedProposalAsync(Guid userId, Guid proposalId, CancellationToken ct)
    {
        var expert = await db.Experts.FirstOrDefaultAsync(e => e.ProfileId == userId, ct);
        if (expert is null) return null;
        return await db.MissionProposals.FirstOrDefaultAsync(p => p.Id == proposalId && p.ExpertId == expert.Id, ct);
    }
}
