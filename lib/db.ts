import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  throw new Error("Missing SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL environment variable");
}

const API_KEY = SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_ANON_KEY;
if (!API_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, API_KEY, { auth: { persistSession: false } });

export async function init() {
  // optional no-op check; migrations must be created in Supabase dashboard
  return true;
}

/* Colleges */
export async function getColleges() {
  const { data, error } = await supabase.from("colleges").select("*").order("id", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getCollegeById(id: number) {
  const { data, error } = await supabase.from("colleges").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function addCollege(college: any) {
  const { data, error } = await supabase.from("colleges").insert(college).select().single();
  if (error) throw error;
  return data;
}

export async function updateCollege(id: number, college: any) {
  const { data, error } = await supabase.from("colleges").update(college).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCollege(id: number) {
  const { data, error } = await supabase.from("colleges").delete().eq("id", id).select();
  if (error) throw error;
  return data;
}

/* Courses */
export async function getCourses() {
  const { data, error } = await supabase.from("courses").select("*").order("id", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getCourseById(id: number) {
  const { data, error } = await supabase.from("courses").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function addCourse(course: any) {
  const { data, error } = await supabase.from("courses").insert(course).select().single();
  if (error) throw error;
  return data;
}

export async function updateCourse(id: number, course: any) {
  const { data, error } = await supabase.from("courses").update(course).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCourse(id: number) {
  const { data, error } = await supabase.from("courses").delete().eq("id", id).select();
  if (error) throw error;
  return data;
}

/* Enquiries */
export async function addEnquiry(enq: any) {
  const { data, error } = await supabase.from("enquiries").insert(enq).select().single();
  if (error) throw error;
  return data;
}

export async function getEnquiries() {
  const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function deleteEnquiry(id: number) {
  const { data, error } = await supabase.from("enquiries").delete().eq("id", id).select();
  if (error) throw error;
  return data;
}