import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkemdjbWN4a2J4cm1sc3d2d216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMDQ5NTEsImV4cCI6MjA4Njg4MDk1MX0.RI2qeyAXuzTSltnrdTS_-6eI7LKtPXaCvd8u3oJ5dQU"
);
