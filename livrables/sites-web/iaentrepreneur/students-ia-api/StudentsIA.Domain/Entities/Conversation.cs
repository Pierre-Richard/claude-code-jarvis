namespace StudentsIA.Domain.Entities;

/// <summary>Fil de discussion entre une entreprise et un expert, éventuellement lié à une mission.</summary>
public class Conversation
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }
    public Guid ExpertId { get; set; }
    public Guid? MissionId { get; set; }

    public Company Company { get; set; } = null!;
    public Expert Expert { get; set; } = null!;
    public Mission? Mission { get; set; }
    public ICollection<Message> Messages { get; set; } = new List<Message>();
}
