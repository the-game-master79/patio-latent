import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://inofzletbkuoembwdewe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlub2Z6bGV0Ymt1b2VtYndkZXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzOTI0OTksImV4cCI6MjA2Nzk2ODQ5OX0.T0RwWVE_LfvlXaDj7-XWG9npYhRH_VOEORlvl1bBV3A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
