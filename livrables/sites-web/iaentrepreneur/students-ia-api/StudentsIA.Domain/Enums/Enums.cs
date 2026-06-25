namespace StudentsIA.Domain.Enums;

/// <summary>Rôle d'un profil sur la marketplace.</summary>
public enum UserRole
{
    Entreprise,
    Expert,
}

/// <summary>Cycle de vie d'une mission (5 statuts du MVP).</summary>
public enum MissionStatus
{
    Demande,
    Cadrage,
    EnCours,
    Livree,
    Validee,
}

/// <summary>Statut d'une proposition de mission faite à un expert.</summary>
public enum ProposalStatus
{
    Proposee,
    Acceptee,
    Refusee,
}

/// <summary>Statut de paiement (simulé dans le MVP, pas de Stripe réel).</summary>
public enum PaymentStatus
{
    EnAttente,
    PayeSimule,
}
