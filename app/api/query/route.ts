import { z } from "zod";
import { env } from "@/env.mjs";
import superjson from "superjson";

import { Configuration, OpenAIApi } from "openai";
import { NextRequest, NextResponse } from "next/server";

const configuration = new Configuration({
	apiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
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
		const res = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: parsed.data.prompt }],
			max_tokens: 200,
			temperature: 0.7,
			top_p: 1,
			frequency_penalty: 1,
			presence_penalty: 1,
		});

		return NextResponse.json({
			status: "success",
			message: res.data.choices[0].message?.content,
		});
	} catch (e) {
		return NextResponse.json({
			status: "error",
			message: JSON.stringify(e),
		});
	}
}
