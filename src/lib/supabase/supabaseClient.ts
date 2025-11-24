import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://sjzuglbyycekaibpwdvb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqenVnbGJ5eWNla2FpYnB3ZHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDU3ODMsImV4cCI6MjA3OTU4MTc4M30.5r021_gA72M8sqIcydnLmkC9Idv87nLxF539v2lq8Lc"
);