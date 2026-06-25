import { MissionStatus } from '../models/data';

interface BadgeColors { bg: string; color: string; }

const MAP: Record<MissionStatus, BadgeColors> = {
  'Demande': { bg: '#f1f3f8', color: '#6b7789' },
  'Cadrage': { bg: '#fef3c7', color: '#b45309' },
  'En cours': { bg: '#eef0fe', color: '#4f46e5' },
  'Livrée': { bg: '#cffafe', color: '#0e7490' },
  'Validée': { bg: '#dcfce7', color: '#16a34a' },
};

/** Style inline d'un badge de statut de mission, cohérent avec la maquette. */
export function statusStyle(status: MissionStatus): string {
  const c = MAP[status] ?? MAP['Demande'];
  return `background:${c.bg};color:${c.color};font-size:12px;font-weight:600;padding:4px 11px;border-radius:999px;white-space:nowrap;`;
}
