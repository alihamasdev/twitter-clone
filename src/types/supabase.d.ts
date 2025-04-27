export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			bookmarks: {
				Row: {
					created_at: string;
					id: number;
					tweet_id: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					tweet_id: string;
					user_id?: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					tweet_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "bookmarks_tweet_id_fkey";
						columns: ["tweet_id"];
						isOneToOne: false;
						referencedRelation: "tweets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "bookmarks_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
			followers: {
				Row: {
					created_at: string;
					id: number;
					user_id: string;
					user_to_follow: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					user_id?: string;
					user_to_follow: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					user_id?: string;
					user_to_follow?: string;
				};
				Relationships: [
					{
						foreignKeyName: "followers_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "followers_user_to_follow_fkey";
						columns: ["user_to_follow"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
			likes: {
				Row: {
					created_at: string;
					id: number;
					tweet_id: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					tweet_id: string;
					user_id?: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					tweet_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "likes_tweet_id_fkey";
						columns: ["tweet_id"];
						isOneToOne: false;
						referencedRelation: "tweets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "likes_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
			profiles: {
				Row: {
					avatar: string;
					bio: string | null;
					created_at: string;
					followers_count: number;
					following_count: number;
					header_image: string | null;
					id: string;
					location: string | null;
					name: string;
					username: string;
					verified: boolean;
					website: string | null;
				};
				Insert: {
					avatar: string;
					bio?: string | null;
					created_at?: string;
					followers_count?: number;
					following_count?: number;
					header_image?: string | null;
					id: string;
					location?: string | null;
					name: string;
					username: string;
					verified?: boolean;
					website?: string | null;
				};
				Update: {
					avatar?: string;
					bio?: string | null;
					created_at?: string;
					followers_count?: number;
					following_count?: number;
					header_image?: string | null;
					id?: string;
					location?: string | null;
					name?: string;
					username?: string;
					verified?: boolean;
					website?: string | null;
				};
				Relationships: [];
			};
			retweets: {
				Row: {
					created_at: string;
					id: number;
					tweet_id: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					tweet_id: string;
					user_id?: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					tweet_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "retweets_tweet_id_fkey";
						columns: ["tweet_id"];
						isOneToOne: false;
						referencedRelation: "tweets";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "retweets_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
			tweets: {
				Row: {
					comment_count: number;
					content: string | null;
					created_at: string;
					id: string;
					image: string | null;
					likes_count: number;
					retweets_count: number;
					user_id: string;
				};
				Insert: {
					comment_count?: number;
					content?: string | null;
					created_at?: string;
					id?: string;
					image?: string | null;
					likes_count?: number;
					retweets_count?: number;
					user_id?: string;
				};
				Update: {
					comment_count?: number;
					content?: string | null;
					created_at?: string;
					id?: string;
					image?: string | null;
					likes_count?: number;
					retweets_count?: number;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "tweets_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "tweets_user_id_fkey1";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			get_tweet_metadata: {
				Args: { uid: string; tweet_ids: string[] };
				Returns: {
					tweet_id: string;
					liked: boolean;
					retweeted: boolean;
					bookmarked: boolean;
					following: boolean;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	graphql_public: {
		Enums: {}
	},
	public: {
		Enums: {}
	}
} as const;
