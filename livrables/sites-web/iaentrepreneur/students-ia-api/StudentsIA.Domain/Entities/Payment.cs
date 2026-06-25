using StudentsIA.Domain.Enums;

namespace StudentsIA.Domain.Entities;

/// <summary>
/// Paiement d'une mission. Dans le MVP il est <b>simulé</b> : pas d'encaissement réel,
/// on enregistre le montant, la commission plateforme et on passe le statut à <see cref="PaymentStatus.PayeSimule"/>.
/// </summary>
public class Payment
{
    public Guid Id { get; set; }
    public Guid MissionId { get; set; }
    public decimal Amount { get; set; }
    public decimal Commission { get; set; }
    public PaymentStatus Status { get; set; } = PaymentStatus.EnAttente;
    public DateTime? PaidAt { get; set; }

    public Mission Mission { get; set; } = null!;
}
