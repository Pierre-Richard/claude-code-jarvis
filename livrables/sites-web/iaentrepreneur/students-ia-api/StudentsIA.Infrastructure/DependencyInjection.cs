using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StudentsIA.Application.Common;
using StudentsIA.Infrastructure.Persistence;

namespace StudentsIA.Infrastructure;

public static class DependencyInjection
{
    /// <summary>Enregistre le DbContext EF Core (Npgsql + convention snake_case) pour Supabase Postgres.</summary>
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString)
                   .UseSnakeCaseNamingConvention());

        // Expose le DbContext via son abstraction à la couche Application.
        services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<AppDbContext>());

        return services;
    }
}
