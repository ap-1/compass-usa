import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		OPENAI_API_KEY: z.string().min(1),
		CLERK_SECRET_KEY: z.string().min(1),
		LINKEDIN_API_KEY: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
		NEXT_PUBLIC_LINKEDIN_CLIENT_ID: z.string().min(1),
	},
	runtimeEnv: {
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		LINKEDIN_API_KEY: process.env.LINKEDIN_API_KEY,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		NEXT_PUBLIC_LINKEDIN_CLIENT_ID:
			process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
	},
});
