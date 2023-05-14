"use client";

import { useRef, useState, type FormEvent } from "react";
import { askChatGPT } from "@/lib/openai";
import { Loader2 } from "lucide-react";

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
	const [submitting, setSubmitting] = useState(false);

	const send = (e: FormEvent) => {
		e.preventDefault();

		const query = queryRef.current?.value;
		if (!query) return;

		setSubmitting(true);
		askChatGPT(query)
			.then(console.log)
			.catch(console.error)
			.finally(() => setSubmitting(false));
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Ask ChatGPT</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Ask ChatGPT</DialogTitle>
					<DialogDescription>
						Write a query for ChatGPT to answer. Click send when
						you&apos;re done.
					</DialogDescription>
				</DialogHeader>

				<form className="grid w-full gap-2" onSubmit={send}>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="query">Your Query</Label>
						<Textarea
							ref={queryRef}
							placeholder="Write a question here."
							id="query"
							required
						/>
					</div>

					<Button type="submit" disabled={submitting}>
						{submitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4" />
								Sending...
							</>
						) : (
							"Send message"
						)}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
