export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!;
export const supabaseStorage = `https://${supabaseProjectId}.supabase.co/storage/v1/object/public/`;
