/**
 * Configuration d'environnement (placeholders).
 * Renseigne ces valeurs depuis la console Supabase : Settings → API.
 * Ne commite PAS de vraies clés de production ici (l'anon key est publique mais reste à garder propre).
 */
export const environment = {
  production: false,
  supabaseUrl: 'https://VOTRE_REF.supabase.co',
  supabaseAnonKey: 'VOTRE_ANON_KEY',
  apiUrl: 'https://localhost:7001/api', // API ASP.NET Core (ajuster selon le port local)
};
