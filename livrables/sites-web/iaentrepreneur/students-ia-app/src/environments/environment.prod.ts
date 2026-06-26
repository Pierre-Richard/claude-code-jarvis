/**
 * Configuration de production (utilisée au build via fileReplacements dans angular.json).
 * apiUrl : URL publique de l'API .NET déployée sur Render. À renseigner une fois le back en ligne.
 * Les clés Supabase sont publiques (mêmes valeurs qu'en dev).
 */
export const environment = {
  production: true,
  supabaseUrl: 'https://qzliugqxeybecawjnylp.supabase.co',
  supabaseAnonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bGl1Z3F4ZXliZWNhd2pueWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTMwMzcsImV4cCI6MjA5Nzk2OTAzN30.zAGPXAnpwkaqV3T-jHP2p2TkC7sok-1dgx60SZ_wIRw',
  apiUrl: 'https://students-ia-api.onrender.com/api',
};
