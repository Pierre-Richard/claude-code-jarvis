using StudentsIA.Domain.Enums;

namespace StudentsIA.Domain.Entities;

/// <summary>
/// Profil utilisateur. L'Id correspond à l'identifiant <c>auth.users.id</c> de Supabase :
/// la ligne est créée automatiquement à l'inscription par le trigger <c>handle_new_user</c>.
/// </summary>
public class Profile
{
    public Guid Id { get; set; }
    public UserRole Role { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation : un profil est soit une entreprise, soit un expert.
    public Company? Company { get; set; }
    public Expert? Expert { get; set; }
}
