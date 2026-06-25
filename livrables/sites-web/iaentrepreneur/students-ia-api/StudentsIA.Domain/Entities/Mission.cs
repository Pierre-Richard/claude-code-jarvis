using StudentsIA.Domain.Enums;

namespace StudentsIA.Domain.Entities;

/// <summary>
/// Mission publiée par une entreprise. Son cycle de vie (<see cref="MissionStatus"/>) est piloté
/// par l'API .NET : Demande → Cadrage → EnCours → Livree → Validee.
/// </summary>
public class Mission
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }

    /// <summary>Expert assigné (null tant que la mission n'est pas attribuée).</summary>
    public Guid? ExpertId { get; set; }

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Sector { get; set; }
    public decimal? Budget { get; set; }
    public MissionStatus Status { get; set; } = MissionStatus.Demande;
    public DateTime CreatedAt { get; set; }

    public Company Company { get; set; } = null!;
    public Expert? Expert { get; set; }
    public ICollection<MissionProposal> Proposals { get; set; } = new List<MissionProposal>();
    public Payment? Payment { get; set; }
}
