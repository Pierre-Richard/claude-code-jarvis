namespace StudentsIA.Domain.Entities;

/// <summary>
/// Message d'une conversation. Inséré/lu en temps réel par Angular via Supabase Realtime (RLS),
/// d'où le <c>SenderId</c> qui pointe directement sur l'<see cref="Profile"/> émetteur.
/// </summary>
public class Message
{
    public Guid Id { get; set; }
    public Guid ConversationId { get; set; }
    public Guid SenderId { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }

    public Conversation Conversation { get; set; } = null!;
}
