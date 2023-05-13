"use client";

import { useRef } from "react";
import { askChatGPT } from "@/lib/openai";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const AskDialog = () => {
	const queryRef = useRef<HTMLTextAreaElement>(null);

	const send = () => {
		const query = queryRef.current?.value;
		if (!query) return;

		askChatGPT(query).then(console.log).catch(console.error);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Ask ChatGPT</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Ask ChatGPT</DialogTitle>
					<DialogDescription>
						Write a query for ChatGPT to answer. Click send when
						you&apos;re done.
					</DialogDescription>
				</DialogHeader>

				<form className="grid w-full gap-1.5" onSubmit={send}>
					<Label htmlFor="query">Your Query</Label>
					<Textarea
						ref={queryRef}
						placeholder="Write a question here."
						id="query"
						required
					/>

					<Button type="submit">Send message</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
