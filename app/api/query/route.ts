import { z } from "zod";
import { env } from "@/env.mjs";
import superjson from "superjson";

import { Configuration, OpenAIApi } from "openai";
import { NextRequest, NextResponse } from "next/server";

const configuration = new Configuration({
	apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const schema = z.object({
	prompt: z.string(),
});

export async function POST(request: NextRequest) {
	const data = superjson.deserialize(await request.json());
	const parsed = schema.safeParse(data);

	if (!parsed.success) {
		return NextResponse.json({
			status: "error",
			message: parsed.error.issues[0].message,
		});
	}

	try {
		const completion = await openai.createCompletion({
			model: "gpt-3.5-turbo",
			prompt: parsed.data.prompt,
		});

		NextResponse.json({
			status: "success",
			message: completion.data.choices[0].text,
		});
	} catch (e) {
		NextResponse.json({
			status: "error",
			message: JSON.stringify(e),
		});
	}
}
