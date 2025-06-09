import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our data
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  link: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description?: string;
  responsibilities?: string[];
  technologies: string[];
  link: string;
}