"use server";

import { env } from "@/env.mjs";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export async function askChatGPT(prompt: string) {
	const completion = await openai.createCompletion({
		model: "gpt-3.5-turbo",
		prompt,
	});

	return completion.data.choices[0].text;
}
