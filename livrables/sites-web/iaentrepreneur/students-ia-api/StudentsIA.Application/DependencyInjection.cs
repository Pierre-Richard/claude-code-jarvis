using Microsoft.Extensions.DependencyInjection;
using StudentsIA.Application.Missions;
using StudentsIA.Application.Proposals;

namespace StudentsIA.Application;

public static class DependencyInjection
{
    /// <summary>Enregistre les services métier de la couche Application.</summary>
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IMissionService, MissionService>();
        services.AddScoped<IProposalService, ProposalService>();
        return services;
    }
}
