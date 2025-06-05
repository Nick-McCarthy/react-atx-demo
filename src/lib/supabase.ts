import { config } from "dotenv";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
console.log("Loading environment variables from:", envPath);
config({ path: envPath });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Environment variables not found. Current env:", {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? "set" : "not set",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey ? "set" : "not set",
  });
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Pants = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  sizes: string[];
  created_at: string;
  stock: number;
  category: string;
};
