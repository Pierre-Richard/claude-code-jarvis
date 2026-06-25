using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace StudentsIA.Infrastructure.Persistence;

/// <summary>
/// Factory utilisée par les outils EF Core (<c>dotnet ef migrations add</c> / <c>database update</c>)
/// pour instancier le contexte sans démarrer l'API.
/// La génération de migration n'a pas besoin d'une base réelle ; pour <c>database update</c>,
/// renseigne la vraie chaîne via la variable d'environnement <c>STUDENTSIA_DB</c>.
/// </summary>
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var connectionString =
            Environment.GetEnvironmentVariable("STUDENTSIA_DB")
            ?? "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=postgres";

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(connectionString)
            .UseSnakeCaseNamingConvention()
            .Options;

        return new AppDbContext(options);
    }
}
