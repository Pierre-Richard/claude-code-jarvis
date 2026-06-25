using StudentsIA.Domain.Enums;

namespace StudentsIA.Domain.Entities;

/// <summary>Proposition d'une mission à un expert issu du matching ; il peut l'accepter ou la refuser.</summary>
public class MissionProposal
{
    public Guid Id { get; set; }
    public Guid MissionId { get; set; }
    public Guid ExpertId { get; set; }
    public ProposalStatus Status { get; set; } = ProposalStatus.Proposee;
    public DateTime CreatedAt { get; set; }

    public Mission Mission { get; set; } = null!;
    public Expert Expert { get; set; } = null!;
}
