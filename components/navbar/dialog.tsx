"use client";

import {
	useRef,
	useState,
	type FormEvent,
	type Dispatch,
	type SetStateAction,
} from "react";
import { Loader2 } from "lucide-react";
import superjson from "superjson";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export async function getData(prompt: string) {
	const time = Date.now();
	const res = await fetch("/api/query", {
		method: "POST",
		body: superjson.stringify({ prompt }),
	});

	if (!res.ok) {
		console.error(await res.json());
		throw new Error("Failed to fetch data");
	}

	console.log(`Request time: ${(Date.now() - time) / 1000}`);

	return res.json();
}

interface AskDialogProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export const AskDialog = ({ open, setOpen }: AskDialogProps) => {
	const queryRef = useRef<HTMLTextAreaElement>(null);
	const [submitting, setSubmitting] = useState(false);

	const send = (e: FormEvent) => {
		e.preventDefault();

		const query = queryRef.current?.value;
		if (!query) return;

		setSubmitting(true);
		getData(query)
			.then((data) => alert(data.message))
			.catch(console.error)
			.finally(() => {
				setSubmitting(false);
				setOpen(false);
			});
	};

	return (
		<Dialog open={open}>
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
								<Loader2 className="animate-spin w-4 h-4 mr-2" />
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
