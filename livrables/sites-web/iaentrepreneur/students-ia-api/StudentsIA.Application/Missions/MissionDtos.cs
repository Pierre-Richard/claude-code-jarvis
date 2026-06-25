using StudentsIA.Domain.Enums;

namespace StudentsIA.Application.Missions;

public record CreateMissionRequest(string Title, string Description, string? Sector, string? Expertise, decimal? Budget);

public record MissionDto(
    Guid Id,
    string Title,
    string Description,
    string? Sector,
    decimal? Budget,
    string Status,
    string CompanyName,
    string? ExpertName,
    decimal? Commission,
    decimal? Net);

/// <summary>Constantes et helpers du cycle de vie des missions.</summary>
public static class MissionRules
{
    /// <summary>Commission plateforme unique (paiement simulé).</summary>
    public const decimal CommissionRate = 0.15m;

    private static readonly MissionStatus[] Flow =
    [
        MissionStatus.Demande, MissionStatus.Cadrage, MissionStatus.EnCours,
        MissionStatus.Livree, MissionStatus.Validee,
    ];

    public static MissionStatus? Next(MissionStatus current)
    {
        var i = Array.IndexOf(Flow, current);
        return i >= 0 && i < Flow.Length - 1 ? Flow[i + 1] : null;
    }

    public static string Label(MissionStatus status) => status switch
    {
        MissionStatus.Demande => "Demande",
        MissionStatus.Cadrage => "Cadrage",
        MissionStatus.EnCours => "En cours",
        MissionStatus.Livree => "Livrée",
        MissionStatus.Validee => "Validée",
        _ => status.ToString(),
    };
}
