namespace StudentsIA.Domain.Entities;

/// <summary>Profil expert IA : compétences, secteurs, TJM et disponibilité.</summary>
public class Expert
{
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public string? Headline { get; set; }
    public string? Bio { get; set; }

    /// <summary>Domaines d'expertise (Machine Learning, NLP & LLM, Computer Vision, MLOps, Data Strategy).</summary>
    public string[] Expertise { get; set; } = [];

    /// <summary>Secteurs couverts (Santé, Finance, Retail, Industrie...).</summary>
    public string[] Sectors { get; set; } = [];

    public string? Languages { get; set; }
    public int ExperienceYears { get; set; }
    public decimal DailyRate { get; set; }
    public decimal Rating { get; set; }

    /// <summary>Certifié par l'Académie IA (validé en MVP via la console Supabase).</summary>
    public bool Certified { get; set; }
    public bool Available { get; set; } = true;

    public Profile Profile { get; set; } = null!;
    public ICollection<Mission> Missions { get; set; } = new List<Mission>();
    public ICollection<MissionProposal> Proposals { get; set; } = new List<MissionProposal>();
}
