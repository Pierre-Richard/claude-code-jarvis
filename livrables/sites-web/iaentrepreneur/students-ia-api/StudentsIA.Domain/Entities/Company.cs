namespace StudentsIA.Domain.Entities;

/// <summary>Détails du côté entreprise de la marketplace, rattachés à un <see cref="Profile"/>.</summary>
public class Company
{
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string? Sector { get; set; }
    public string? Size { get; set; }

    public Profile Profile { get; set; } = null!;
    public ICollection<Mission> Missions { get; set; } = new List<Mission>();
}
