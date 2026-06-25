using Microsoft.EntityFrameworkCore;
using StudentsIA.Application.Common;
using StudentsIA.Domain.Entities;

namespace StudentsIA.Infrastructure.Persistence;

/// <summary>
/// Contexte EF Core, source de vérité du schéma <c>public</c> sur Postgres (Supabase).
/// Les enums sont stockés en texte, les Id et timestamps ont des valeurs par défaut côté base
/// (<c>gen_random_uuid()</c> / <c>now()</c>) pour que les inserts directs via Supabase fonctionnent aussi.
/// La convention snake_case est appliquée dans la configuration du DbContext (Program.cs).
/// </summary>
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options), IApplicationDbContext
{
    public DbSet<Profile> Profiles => Set<Profile>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Expert> Experts => Set<Expert>();
    public DbSet<Mission> Missions => Set<Mission>();
    public DbSet<MissionProposal> MissionProposals => Set<MissionProposal>();
    public DbSet<Conversation> Conversations => Set<Conversation>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<Payment> Payments => Set<Payment>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        base.OnModelCreating(b);

        b.Entity<Profile>(e =>
        {
            e.HasKey(p => p.Id);
            // L'Id est fourni par Supabase auth (pas de génération côté EF).
            e.Property(p => p.Id).ValueGeneratedNever();
            e.Property(p => p.Role).HasConversion<string>().HasMaxLength(20);
            e.Property(p => p.FullName).HasMaxLength(160).IsRequired();
            e.Property(p => p.CreatedAt).HasDefaultValueSql("now()");
        });

        b.Entity<Company>(e =>
        {
            e.HasKey(c => c.Id);
            e.Property(c => c.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(c => c.CompanyName).HasMaxLength(160).IsRequired();
            e.HasOne(c => c.Profile).WithOne(p => p.Company)
                .HasForeignKey<Company>(c => c.ProfileId).OnDelete(DeleteBehavior.Cascade);
            e.HasIndex(c => c.ProfileId).IsUnique();
        });

        b.Entity<Expert>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.Expertise).HasColumnType("text[]");
            e.Property(x => x.Sectors).HasColumnType("text[]");
            e.Property(x => x.DailyRate).HasPrecision(10, 2);
            e.Property(x => x.Rating).HasPrecision(3, 2);
            e.Property(x => x.Available).HasDefaultValue(true);
            e.HasOne(x => x.Profile).WithOne(p => p.Expert)
                .HasForeignKey<Expert>(x => x.ProfileId).OnDelete(DeleteBehavior.Cascade);
            e.HasIndex(x => x.ProfileId).IsUnique();
        });

        b.Entity<Mission>(e =>
        {
            e.HasKey(m => m.Id);
            e.Property(m => m.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(m => m.Title).HasMaxLength(200).IsRequired();
            e.Property(m => m.Status).HasConversion<string>().HasMaxLength(20);
            e.Property(m => m.Budget).HasPrecision(12, 2);
            e.Property(m => m.CreatedAt).HasDefaultValueSql("now()");
            e.HasOne(m => m.Company).WithMany(c => c.Missions)
                .HasForeignKey(m => m.CompanyId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(m => m.Expert).WithMany(x => x.Missions)
                .HasForeignKey(m => m.ExpertId).OnDelete(DeleteBehavior.SetNull);
        });

        b.Entity<MissionProposal>(e =>
        {
            e.HasKey(p => p.Id);
            e.Property(p => p.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(p => p.Status).HasConversion<string>().HasMaxLength(20);
            e.Property(p => p.CreatedAt).HasDefaultValueSql("now()");
            e.HasOne(p => p.Mission).WithMany(m => m.Proposals)
                .HasForeignKey(p => p.MissionId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(p => p.Expert).WithMany(x => x.Proposals)
                .HasForeignKey(p => p.ExpertId).OnDelete(DeleteBehavior.Cascade);
            e.HasIndex(p => new { p.MissionId, p.ExpertId }).IsUnique();
        });

        b.Entity<Conversation>(e =>
        {
            e.HasKey(c => c.Id);
            e.Property(c => c.Id).HasDefaultValueSql("gen_random_uuid()");
            e.HasOne(c => c.Company).WithMany()
                .HasForeignKey(c => c.CompanyId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(c => c.Expert).WithMany()
                .HasForeignKey(c => c.ExpertId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(c => c.Mission).WithMany()
                .HasForeignKey(c => c.MissionId).OnDelete(DeleteBehavior.SetNull);
        });

        b.Entity<Message>(e =>
        {
            e.HasKey(m => m.Id);
            e.Property(m => m.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(m => m.Content).IsRequired();
            e.Property(m => m.CreatedAt).HasDefaultValueSql("now()");
            e.HasOne(m => m.Conversation).WithMany(c => c.Messages)
                .HasForeignKey(m => m.ConversationId).OnDelete(DeleteBehavior.Cascade);
            e.HasIndex(m => m.ConversationId);
        });

        b.Entity<Payment>(e =>
        {
            e.HasKey(p => p.Id);
            e.Property(p => p.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(p => p.Amount).HasPrecision(12, 2);
            e.Property(p => p.Commission).HasPrecision(12, 2);
            e.Property(p => p.Status).HasConversion<string>().HasMaxLength(20);
            e.HasOne(p => p.Mission).WithOne(m => m.Payment)
                .HasForeignKey<Payment>(p => p.MissionId).OnDelete(DeleteBehavior.Cascade);
            e.HasIndex(p => p.MissionId).IsUnique();
        });
    }
}
