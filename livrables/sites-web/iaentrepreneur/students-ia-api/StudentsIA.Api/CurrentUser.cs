using System.Security.Claims;
using StudentsIA.Application.Common;

namespace StudentsIA.Api;

/// <summary>Extrait l'id utilisateur du JWT Supabase (claim "sub" = auth.users.id).</summary>
public class CurrentUser(IHttpContextAccessor accessor) : ICurrentUser
{
    public Guid? UserId
    {
        get
        {
            var principal = accessor.HttpContext?.User;
            var sub = principal?.FindFirstValue(ClaimTypes.NameIdentifier)
                   ?? principal?.FindFirstValue("sub");
            return Guid.TryParse(sub, out var id) ? id : null;
        }
    }
}
