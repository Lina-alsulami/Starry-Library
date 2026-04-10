import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wxwqqzknyrnnspkckhtr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4d3FxemtueXJubnNwa2NraHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDM3ODQsImV4cCI6MjA5MTM3OTc4NH0.N4zY6snfZaw-KwfcMrRlETItRpctsh61VnSDwiITZZY";

export const supabase = createClient(supabaseUrl, supabaseKey);
