import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Mission, MissionStatus, Proposal } from '../../models/data';

/** DTO renvoyé par l'API .NET pour une mission. */
interface MissionDto {
  id: string;
  title: string;
  description: string;
  sector: string | null;
  budget: number | null;
  status: string;
  companyName: string;
  expertName: string | null;
  commission: number | null;
  net: number | null;
}

interface ProposalDto {
  id: string;
  missionId: string;
  missionTitle: string;
  companyName: string;
  sector: string | null;
  description: string;
  budget: number | null;
  status: string;
}

export interface CreateMissionPayload {
  title: string;
  description: string;
  sector: string | null;
  expertise: string | null;
  budget: number | null;
}

function toMission(d: MissionDto): Mission {
  return {
    id: d.id,
    title: d.title,
    status: d.status as MissionStatus,
    secteur: d.sector ?? '',
    budget: d.budget ?? 0,
    company: d.companyName,
    expertName: d.expertName ?? undefined,
    desc: d.description,
  };
}

function toProposal(d: ProposalDto): Proposal {
  return {
    id: d.id,
    title: d.missionTitle,
    company: d.companyName,
    secteur: d.sector ?? '',
    desc: d.description,
    budget: d.budget ?? 0,
  };
}

/** Accès à l'API .NET (missions, matching, propositions, paiement simulé). JWT ajouté par l'interceptor. */
@Injectable({ providedIn: 'root' })
export class MissionApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  async list(): Promise<Mission[]> {
    const data = await firstValueFrom(this.http.get<MissionDto[]>(`${this.base}/missions`));
    return data.map(toMission);
  }

  async get(id: string): Promise<Mission> {
    const d = await firstValueFrom(this.http.get<MissionDto>(`${this.base}/missions/${id}`));
    return toMission(d);
  }

  async create(payload: CreateMissionPayload): Promise<Mission> {
    const d = await firstValueFrom(this.http.post<MissionDto>(`${this.base}/missions`, payload));
    return toMission(d);
  }

  async advance(id: string): Promise<Mission> {
    const d = await firstValueFrom(this.http.post<MissionDto>(`${this.base}/missions/${id}/advance`, {}));
    return toMission(d);
  }

  async proposals(): Promise<Proposal[]> {
    const data = await firstValueFrom(this.http.get<ProposalDto[]>(`${this.base}/proposals`));
    return data.map(toProposal);
  }

  async acceptProposal(id: string): Promise<void> {
    await firstValueFrom(this.http.post(`${this.base}/proposals/${id}/accept`, {}));
  }

  async refuseProposal(id: string): Promise<void> {
    await firstValueFrom(this.http.post(`${this.base}/proposals/${id}/refuse`, {}));
  }
}
