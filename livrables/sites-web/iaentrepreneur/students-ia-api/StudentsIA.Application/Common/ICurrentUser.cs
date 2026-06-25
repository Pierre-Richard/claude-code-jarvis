namespace StudentsIA.Application.Common;

/// <summary>Identité de l'utilisateur courant, extraite du JWT Supabase (claim "sub").</summary>
public interface ICurrentUser
{
    /// <summary>Id du profil (= auth.users.id Supabase). Null si non authentifié.</summary>
    Guid? UserId { get; }
}
