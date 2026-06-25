using Microsoft.EntityFrameworkCore;
using StudentsIA.Domain.Entities;

namespace StudentsIA.Application.Common;

/// <summary>
/// Abstraction du DbContext exposée à la couche Application, pour que la logique métier
/// ne dépende pas directement de l'Infrastructure (implémentée par AppDbContext).
/// </summary>
public interface IApplicationDbContext
{
    DbSet<Profile> Profiles { get; }
    DbSet<Company> Companies { get; }
    DbSet<Expert> Experts { get; }
    DbSet<Mission> Missions { get; }
    DbSet<MissionProposal> MissionProposals { get; }
    DbSet<Conversation> Conversations { get; }
    DbSet<Message> Messages { get; }
    DbSet<Payment> Payments { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
