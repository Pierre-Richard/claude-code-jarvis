using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using StudentsIA.Api;
using StudentsIA.Application;
using StudentsIA.Application.Common;
using StudentsIA.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// --- Port d'écoute : Render/Railway injectent la variable d'environnement PORT ---
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// --- Base de données (Supabase Postgres via EF Core) ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("ConnectionStrings:DefaultConnection manquante.");
builder.Services.AddInfrastructure(connectionString);

// --- Logique métier + identité de l'utilisateur courant ---
builder.Services.AddApplication();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUser, CurrentUser>();

// --- Authentification : on valide les JWT émis par Supabase Auth ---
// Supabase signe les tokens et expose un JWKS sous {Url}/auth/v1.
// L'API ne ré-authentifie pas : elle fait confiance aux tokens Supabase et lit l'id user dans la claim "sub".
var supabaseUrl = builder.Configuration["Supabase:Url"]
    ?? throw new InvalidOperationException("Supabase:Url manquante.");
var authority = $"{supabaseUrl.TrimEnd('/')}/auth/v1";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = authority;
        options.RequireHttpsMetadata = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = authority,
            ValidateAudience = true,
            ValidAudience = "authenticated",
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
        };
        // Fallback projets Supabase en HS256 (secret partagé) : décommenter et renseigner Supabase:JwtSecret.
        // var secret = builder.Configuration["Supabase:JwtSecret"];
        // options.TokenValidationParameters.IssuerSigningKey =
        //     new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secret!));
    });

builder.Services.AddAuthorization();

// --- CORS pour l'app Angular ---
// localhost en dev + le(s) domaine(s) de prod (Vercel) fournis via "Cors:AllowedOrigins".
const string AngularCors = "AngularApp";
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? Array.Empty<string>();
var corsOrigins = new[] { "http://localhost:4200" }.Concat(allowedOrigins).Distinct().ToArray();
builder.Services.AddCors(o => o.AddPolicy(AngularCors, p => p
    .WithOrigins(corsOrigins)
    .AllowAnyHeader()
    .AllowAnyMethod()));

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// En prod, la terminaison TLS est gérée par le proxy de Render/Railway : pas de redirection ici.
if (app.Environment.IsDevelopment())
    app.UseHttpsRedirection();
app.UseCors(AngularCors);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
