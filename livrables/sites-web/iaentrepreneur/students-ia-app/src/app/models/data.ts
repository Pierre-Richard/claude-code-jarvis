/**
 * Modèles et données mockées de l'app IApreneur.
 * Reproduit la maquette Claude Design. Sera remplacé par les données Supabase / API .NET.
 */

export type Role = 'company' | 'expert' | 'admin';

export type MissionStatus = 'Demande' | 'Cadrage' | 'En cours' | 'Livrée' | 'Validée';

/** Commission plateforme unique appliquée au paiement (simulé). */
export const COMMISSION_RATE = 0.15;

export interface Expert {
  id: string;
  name: string;
  initials: string;
  role: string;
  certified: boolean;
  note: number;
  reviews: number;
  years: number;
  tjm: number;
  expertise: string;
  tags: string[];
  sectors: string[];
  langs: string[];
  available: boolean;
  bio: string;
}

export interface Mission {
  id: string;
  title: string;
  status: MissionStatus;
  secteur: string;
  budget: number;
  company: string;
  expertName?: string;
  desc: string;
}

export interface Proposal {
  id: string;
  title: string;
  company: string;
  secteur: string;
  desc: string;
  budget: number;
}

export interface Stat {
  label: string;
  value: string;
  delta: string;
  icon: string; // nom d'icône (voir IconComponent)
}

export interface Conversation {
  id: string;
  name: string;
  initials: string;
  last: string;
  time: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  mine: boolean;
}

export const EXPERTISE_FILTERS = ['Tous', 'Machine Learning', 'NLP & LLM', 'Computer Vision', 'MLOps', 'Data Strategy'];
export const SECTEUR_FILTERS = ['Santé', 'Finance', 'Retail', 'Industrie', 'Juridique', 'Énergie'];

export const EXPERTS: Expert[] = [
  {
    id: 'amine-khelifi', name: 'Dr. Amine Khelifi', initials: 'AK', role: 'Expert NLP & LLM',
    certified: true, note: 4.9, reviews: 47, years: 11, tjm: 900, expertise: 'NLP & LLM',
    tags: ['NLP & LLM', 'RAG', 'Santé'], sectors: ['Santé', 'RAG'], langs: ['FR', 'EN', 'AR'], available: true,
    bio: "11 ans d'expérience sur les modèles de langage. J'accompagne les entreprises de la preuve de concept à la mise en production d'assistants IA fiables et sécurisés.",
  },
  {
    id: 'camille-roussel', name: 'Camille Roussel', initials: 'CR', role: 'Lead MLOps',
    certified: true, note: 4.8, reviews: 38, years: 8, tjm: 760, expertise: 'MLOps',
    tags: ['MLOps', 'Cloud', 'Industrie'], sectors: ['Industrie', 'Cloud'], langs: ['FR', 'EN'], available: true,
    bio: "Industrialisation de modèles ML : CI/CD, monitoring, scalabilité. J'aide les équipes data à passer du notebook à la production robuste.",
  },
  {
    id: 'yacine-berthier', name: 'Yacine Berthier', initials: 'YB', role: 'Computer Vision',
    certified: true, note: 5.0, reviews: 52, years: 9, tjm: 890, expertise: 'Computer Vision',
    tags: ['Computer Vision', 'Edge AI', 'Retail'], sectors: ['Retail', 'Edge AI'], langs: ['FR', 'EN', 'ES'], available: false,
    bio: "Vision par ordinateur appliquée au retail et à l'industrie : détection, OCR, edge AI. Du prototype à la mise en production embarquée.",
  },
  {
    id: 'sofia-marchetti', name: 'Sofia Marchetti', initials: 'SM', role: 'ML Engineer',
    certified: true, note: 4.7, reviews: 29, years: 7, tjm: 720, expertise: 'Machine Learning',
    tags: ['Machine Learning', 'Scoring', 'Finance'], sectors: ['Finance', 'Scoring'], langs: ['FR', 'EN', 'IT'], available: true,
    bio: "Modèles de scoring et de prédiction pour la finance. Approche pragmatique, orientée valeur métier et conformité.",
  },
  {
    id: 'thomas-ndiaye', name: "Thomas N'Diaye", initials: 'TN', role: 'Data Strategy Lead',
    certified: true, note: 4.9, reviews: 61, years: 12, tjm: 950, expertise: 'Data Strategy',
    tags: ['Data Strategy', 'Énergie', 'Public'], sectors: ['Public', 'Énergie'], langs: ['FR', 'EN'], available: true,
    bio: "12 ans à cadrer des stratégies data et IA pour de grandes organisations. Feuilles de route pragmatiques, priorisation des cas d'usage.",
  },
  {
    id: 'lina-haddad', name: 'Lina Haddad', initials: 'LH', role: 'NLP Researcher',
    certified: false, note: 4.8, reviews: 24, years: 6, tjm: 700, expertise: 'NLP & LLM',
    tags: ['NLP & LLM', 'RAG', 'Juridique'], sectors: ['Juridique', 'RAG'], langs: ['FR', 'EN', 'AR'], available: true,
    bio: "Recherche appliquée en NLP : extraction d'information, RAG, IA juridique. Passerelle entre l'état de l'art et les besoins terrain.",
  },
];

export const COMPANY_STATS: Stat[] = [
  { label: 'Missions en cours', value: '3', delta: '+1 ce mois', icon: 'briefcase' },
  { label: 'Propositions reçues', value: '12', delta: '+5 cette semaine', icon: 'inbox' },
  { label: 'Experts contactés', value: '8', delta: '+2 récemment', icon: 'users' },
];

export const EXPERT_STATS: Stat[] = [
  { label: 'Propositions reçues', value: '4', delta: '+2 cette semaine', icon: 'inbox' },
  { label: 'Missions en cours', value: '2', delta: 'En bonne voie', icon: 'briefcase' },
  { label: 'Taux de réponse', value: '98 %', delta: 'Excellent', icon: 'checkCircle' },
];

export const ADMIN_STATS: Stat[] = [
  { label: 'Experts à valider', value: '5', delta: '2 nouveaux aujourd’hui', icon: 'users' },
  { label: 'Experts certifiés', value: '128', delta: '+9 ce mois', icon: 'badge' },
  { label: 'Missions actives', value: '34', delta: 'Sur la plateforme', icon: 'briefcase' },
];

export const COMPANY_MISSIONS: Mission[] = [
  { id: 'm1', title: 'Assistant IA pour le support client', status: 'En cours', secteur: 'Retail', budget: 15000, company: 'Acme Retail', expertName: 'Dr. Amine Khelifi', desc: "Mise en place d'un assistant conversationnel connecté à notre base de connaissances pour réduire le temps de traitement des tickets." },
  { id: 'm2', title: 'Audit de faisabilité scoring crédit', status: 'Cadrage', secteur: 'Finance', budget: 9000, company: 'Acme Retail', desc: "Évaluer la faisabilité d'un modèle de scoring conforme et explicable pour l'octroi de crédit." },
  { id: 'm3', title: 'Détection visuelle en entrepôt', status: 'Demande', secteur: 'Industrie', budget: 22000, company: 'Acme Retail', desc: "Système de vision pour le contrôle qualité et le comptage automatisé en entrepôt." },
];

export const EXPERT_MISSIONS: Mission[] = [
  { id: 'm1', title: 'Assistant IA pour le support client', status: 'En cours', secteur: 'Retail', budget: 15000, company: 'Acme Retail', desc: '' },
  { id: 'm4', title: 'Cadrage RAG documentaire', status: 'Livrée', secteur: 'Juridique', budget: 8000, company: 'Lex Partners', desc: '' },
];

export const PROPOSALS: Proposal[] = [
  { id: 'p1', title: 'Chatbot RH multilingue', company: 'GlobalCorp', secteur: 'RH', desc: "Concevoir un assistant interne pour répondre aux questions RH des collaborateurs en 4 langues.", budget: 18000 },
  { id: 'p2', title: 'Pipeline MLOps pour modèle de churn', company: 'Telco Plus', secteur: 'Télécom', desc: "Industrialiser un modèle de prédiction de résiliation : déploiement, monitoring et réentraînement.", budget: 24000 },
];

export const PENDING_EXPERTS: Expert[] = [
  EXPERTS[5], // Lina Haddad (non certifiée)
  { ...EXPERTS[3], id: 'pending-2', certified: false, name: 'Marc Olivier', initials: 'MO', role: 'ML Engineer' },
];

export const CONVERSATIONS: Conversation[] = [
  { id: 'c1', name: 'Dr. Amine Khelifi', initials: 'AK', last: "Parfait, je vous envoie une première version demain.", time: '10:24', unread: true },
  { id: 'c2', name: 'Camille Roussel', initials: 'CR', last: 'On peut caler un point cette semaine ?', time: 'Hier', unread: false },
  { id: 'c3', name: 'Acme Retail', initials: 'AR', last: 'Merci pour le cadrage, c’est validé.', time: 'Lun', unread: false },
];

export const THREAD: ChatMessage[] = [
  { id: 't1', text: "Bonjour, merci pour la mise en relation. J'ai bien pris connaissance du besoin.", time: '09:58', mine: false },
  { id: 't2', text: "Bonjour Amine, ravi de travailler avec vous. Avez-vous des questions sur le périmètre ?", time: '10:05', mine: true },
  { id: 't3', text: "Parfait, je vous envoie une première version demain.", time: '10:24', mine: false },
];
