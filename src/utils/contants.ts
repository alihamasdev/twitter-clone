const productionUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
export const baseUrl = productionUrl ? `https://${productionUrl}` : "http://localhost:3000";

export const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!;
export const supabaseStorageUrl = `https://${supabaseProjectId}.supabase.co/storage/v1/object/public/`;

export const PAGE_SIZE = 15;

export const prohibitedUsernames = [
	"explore",
	"notifications",
	"notification",
	"messages",
	"message",
	"home",
	"communities",
	"community",
	"premium",
	"bookmarks",
	"bookmark",
	"setting",
	"settings",
	"logout",
	"auth",
	"login",
	"signup",
	"register",
	"account",
	"display",
	"username",
	"error",
	"follow",
	"following"
];
