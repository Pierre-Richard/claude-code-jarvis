-- ============================================================================
-- Students IA — Configuration Supabase (à exécuter APRÈS la migration EF Core)
-- ----------------------------------------------------------------------------
-- Ordre d'exécution global :
--   1. Côté .NET :   dotnet ef database update   (crée les tables du schéma public)
--   2. Côté Supabase : coller ce script dans SQL Editor et l'exécuter
--
-- Ce script ajoute ce qu'EF ne gère pas : le lien vers auth.users, la création
-- automatique du profil à l'inscription, la sécurité RLS et le temps réel.
-- ============================================================================

-- 1) Lier profiles.id à l'utilisateur Supabase Auth ---------------------------
-- L'id d'un profil EST l'id du compte auth. Suppression du compte => suppression du profil.
alter table public.profiles
  add constraint fk_profiles_auth_users
  foreign key (id) references auth.users (id) on delete cascade;

-- 2) Création automatique du profil à l'inscription ---------------------------
-- À l'inscription, Angular envoie role + full_name dans les métadonnées (options.data).
-- Ce trigger crée la ligne profiles correspondante.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'role', 'Entreprise'),
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3) Activer la RLS sur toutes les tables -------------------------------------
alter table public.profiles          enable row level security;
alter table public.companies         enable row level security;
alter table public.experts           enable row level security;
alter table public.conversations     enable row level security;
alter table public.messages          enable row level security;
-- Tables pilotées exclusivement par l'API .NET (qui se connecte en rôle privilégié et
-- contourne donc la RLS) : on active la RLS sans policy => accès client direct bloqué.
alter table public.missions          enable row level security;
alter table public.mission_proposals enable row level security;
alter table public.payments          enable row level security;

-- 4) Policies : profiles ------------------------------------------------------
-- Lecture de tous les profils par un utilisateur connecté (noms/avatars dans l'annuaire et la messagerie).
create policy "profiles_select_authenticated"
  on public.profiles for select to authenticated using (true);
-- Chacun met à jour uniquement son propre profil.
create policy "profiles_update_own"
  on public.profiles for update to authenticated using (auth.uid() = id);

-- 5) Policies : experts (annuaire public) -------------------------------------
-- Lecture publique (visiteurs anonymes inclus) pour la vitrine/annuaire.
create policy "experts_select_public"
  on public.experts for select to anon, authenticated using (true);
-- L'expert gère sa propre fiche.
create policy "experts_modify_own"
  on public.experts for all to authenticated
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

-- 6) Policies : companies -----------------------------------------------------
create policy "companies_select_authenticated"
  on public.companies for select to authenticated using (true);
create policy "companies_modify_own"
  on public.companies for all to authenticated
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

-- 7) Policies : conversations -------------------------------------------------
-- Un utilisateur voit une conversation s'il en est l'entreprise ou l'expert.
create policy "conversations_select_participant"
  on public.conversations for select to authenticated
  using (
    exists (select 1 from public.companies co where co.id = company_id and co.profile_id = auth.uid())
    or exists (select 1 from public.experts ex where ex.id = expert_id  and ex.profile_id = auth.uid())
  );

-- 8) Policies : messages (lecture + envoi, temps réel) ------------------------
create policy "messages_select_participant"
  on public.messages for select to authenticated
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and (
          exists (select 1 from public.companies co where co.id = c.company_id and co.profile_id = auth.uid())
          or exists (select 1 from public.experts ex where ex.id = c.expert_id and ex.profile_id = auth.uid())
        )
    )
  );

create policy "messages_insert_participant"
  on public.messages for insert to authenticated
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and (
          exists (select 1 from public.companies co where co.id = c.company_id and co.profile_id = auth.uid())
          or exists (select 1 from public.experts ex where ex.id = c.expert_id and ex.profile_id = auth.uid())
        )
    )
  );

-- 9) Activer le temps réel sur la messagerie ----------------------------------
alter publication supabase_realtime add table public.messages;
