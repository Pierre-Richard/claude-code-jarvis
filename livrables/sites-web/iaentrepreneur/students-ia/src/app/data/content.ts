import {
  Expert, Mission, Step, ValueProp, Sector, Testimonial, Plan, FaqItem,
} from './models';

export const VALUE_PROPS: ValueProp[] = [
  {
    icon: '🏢',
    title: 'Pour les entreprises',
    description: 'Accédez à des experts pré-qualifiés et certifiés. Plus de tri fastidieux : chaque profil a passé notre processus de sélection rigoureux.',
  },
  {
    icon: '🎯',
    title: 'Pour les experts',
    description: 'Des missions premium et des clients qualifiés. Concentrez-vous sur votre valeur ajoutée, on s\'occupe du sourcing et du cadrage.',
  },
  {
    icon: '🛡️',
    title: 'Pour l\'écosystème',
    description: 'La garantie qualité par notre certification. Chaque mission renforce un standard d\'excellence partagé par toute la communauté.',
  },
];

export const MISSIONS: Mission[] = [
  { title: 'Implémentation d\'IA en entreprise', description: 'Du POC à la mise en production : intégration de modèles, MLOps, et industrialisation des cas d\'usage.' },
  { title: 'Formation et upskilling des équipes', description: 'Montée en compétence sur mesure de vos équipes tech et métier, du fondamental à l\'avancé.' },
  { title: 'Conseil stratégique sectoriel', description: 'Santé, finance, retail, industrie : une expertise métier doublée d\'une maîtrise IA de pointe.' },
  { title: 'Audit et cadrage de projets IA', description: 'Évaluation de faisabilité, priorisation des cas d\'usage et feuille de route pragmatique.' },
];

export const STEPS: Step[] = [
  { title: 'Décrivez votre besoin', description: 'Quelques minutes pour cadrer votre contexte, vos objectifs et votre secteur.' },
  { title: 'Recevez des profils matchés', description: 'Notre algorithme et notre équipe vous proposent les experts les plus pertinents.' },
  { title: 'Échangez avec les experts', description: 'Un appel de cadrage pour valider l\'adéquation, sans engagement.' },
  { title: 'Lancez la mission', description: 'Contrat sécurisé, paiement protégé, suivi qualité tout au long de la mission.' },
];

export const EXPERTISE_FILTERS: string[] = [
  'Tous', 'Machine Learning', 'NLP & LLM', 'Computer Vision', 'MLOps', 'Data Strategy',
];

export const EXPERTS: Expert[] = [
  { name: 'Dr. Amine Khelifi', role: 'Expert NLP & LLM', experienceYears: 11, expertise: 'NLP & LLM', sectors: ['Santé', 'RAG'], langs: 'FR / EN', rating: 4.9, dailyRate: 820 },
  { name: 'Camille Roussel', role: 'Lead MLOps', experienceYears: 8, expertise: 'MLOps', sectors: ['Industrie', 'Cloud'], langs: 'FR / EN', rating: 4.8, dailyRate: 760 },
  { name: 'Yacine Berthier', role: 'Computer Vision', experienceYears: 9, expertise: 'Computer Vision', sectors: ['Retail', 'Edge AI'], langs: 'FR / EN / ES', rating: 5.0, dailyRate: 890 },
  { name: 'Sofia Marchetti', role: 'ML Engineer', experienceYears: 7, expertise: 'Machine Learning', sectors: ['Finance', 'Scoring'], langs: 'FR / EN / IT', rating: 4.7, dailyRate: 720 },
  { name: 'Thomas N\'Diaye', role: 'Data Strategy Lead', experienceYears: 12, expertise: 'Data Strategy', sectors: ['Public', 'Énergie'], langs: 'FR / EN', rating: 4.9, dailyRate: 950 },
  { name: 'Lina Haddad', role: 'NLP Researcher', experienceYears: 6, expertise: 'NLP & LLM', sectors: ['Juridique', 'RAG'], langs: 'FR / EN / AR', rating: 4.8, dailyRate: 700 },
];

export const SECTORS: Sector[] = [
  { icon: '🏥', name: 'Santé' },
  { icon: '🏦', name: 'Finance' },
  { icon: '🛒', name: 'Retail' },
  { icon: '🏭', name: 'Industrie' },
  { icon: '⚖️', name: 'Juridique' },
  { icon: '🎓', name: 'Éducation' },
  { icon: '🚚', name: 'Logistique' },
  { icon: '⚡', name: 'Énergie' },
  { icon: '📡', name: 'Télécom' },
  { icon: '🏛️', name: 'Secteur public' },
  { icon: '🚗', name: 'Mobilité' },
  { icon: '🌾', name: 'Agritech' },
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: 'En trois semaines, l\'expert matché par Students IA a cadré notre stratégie LLM et formé l\'équipe data. Un niveau de sélection qu\'on ne trouve nulle part ailleurs.', author: 'Sophie Mar', role: 'VP Data, groupe retail' },
  { quote: 'Des missions premium, des clients sérieux et déjà cadrés. La certification de l\'Académie m\'ouvre des portes que je n\'aurais pas eues seul.', author: 'Karim B.', role: 'Expert MLOps freelance' },
  { quote: 'On a audité notre roadmap IA avec un consultant santé bluffant. ROI clair dès le premier trimestre. Le process est fluide et rassurant.', author: 'Dr. Lefèvre', role: 'Directeur innovation, e-santé' },
];

export const PLANS: Plan[] = [
  {
    name: 'Découverte', price: '0 €', priceNote: ' / inscription',
    caption: 'Pour explorer la marketplace côté entreprise.',
    features: ['Accès à l\'annuaire d\'experts', '3 mises en relation par mois', 'Support par email'],
    cta: 'Commencer',
  },
  {
    name: 'Business', price: '12 %', priceNote: ' de commission',
    caption: 'Prélevée sur les missions, côté entreprise.',
    features: ['Mises en relation illimitées', 'Matching prioritaire et accompagné', 'Paiement sécurisé sous séquestre', 'Suivi qualité dédié'],
    cta: 'Lancer une mission', featured: true,
  },
  {
    name: 'Expert', price: '8 %', priceNote: ' de commission',
    caption: 'Prélevée uniquement sur missions abouties.',
    features: ['Profil certifié mis en avant', 'Missions premium qualifiées', 'Facturation et contrats gérés', 'Aucun frais fixe'],
    cta: 'Devenir expert',
  },
];

export const CERTIFICATION_POINTS: string[] = [
  'Évaluation technique approfondie et études de cas réelles',
  'Vérification des références et des missions passées',
  'Mise à jour annuelle des compétences obligatoire',
  'Charte de qualité et d\'éthique IA signée',
  'Notation continue par les clients après chaque mission',
];

export const FAQ_ITEMS: FaqItem[] = [
  { question: 'Comment sont sélectionnés les experts ?', answer: 'Chaque expert passe une évaluation technique approfondie, une vérification de ses références et signe notre charte qualité. Seuls les profils validés par l\'Académie IA rejoignent la marketplace.' },
  { question: 'Combien coûte une mise en relation ?', answer: 'La mise en relation et le cadrage sont gratuits. Nous appliquons une commission transparente uniquement lorsqu\'une mission est effectivement lancée.' },
  { question: 'Comment est sécurisé le paiement ?', answer: 'Les fonds sont placés sous séquestre et libérés à la validation des jalons convenus. Vous ne payez que pour un travail livré et accepté.' },
  { question: 'Puis-je travailler avec le même expert sur plusieurs missions ?', answer: 'Oui. Beaucoup de nos clients tissent des relations récurrentes avec leurs experts. La plateforme facilite la continuité tout en gardant le cadre sécurisé.' },
  { question: 'Mes données sont-elles protégées (RGPD) ?', answer: 'Absolument. Nous sommes conformes au RGPD, les données sont hébergées en Europe et ne sont jamais partagées sans votre consentement explicite.' },
];
