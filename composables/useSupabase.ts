import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nsiyetewxlhxggawtfrq.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaXlldGV3eGxoeGdnYXd0ZnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NDk5ODUsImV4cCI6MjAwMDQyNTk4NX0.lP1ryMgmX2uKjoxBLsE9YJe4xNqI6c7HE3VCKSlPtYU";

const useSupabase = () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  return { supabase };
};

export default useSupabase;
