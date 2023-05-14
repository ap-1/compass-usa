"use client";

import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { icons, type Topic } from "@/app/compass/page";

import superjson from "superjson";
import { Send, Trash } from "lucide-react";

async function getData(prompt: string) {
	const res = await fetch("/api/query", {
		method: "POST",
		body: superjson.stringify({ prompt }),
	});

	if (!res.ok) {
		console.error(await res.json());
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

const textVariants = cva("flex flex-row items-center", {
	variants: {
		variant: {
			Health: "text-red-500",
			Jobs: "text-yellow-500",
			Housing: "text-green-500",
			Legal: "text-purple-500",
		},
	},
});

interface TextProps
	extends VariantProps<typeof textVariants>,
		React.HTMLProps<HTMLParagraphElement> {
	variant: Topic;
}

const Text = ({ variant, ...rest }: TextProps) => (
	<p className={textVariants({ variant })} {...rest} />
);

interface HelperProps {
	topic: Topic;
}

type Message = {
	sender: string;
	text: string;
};

export const Helper = ({ topic }: HelperProps) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [sources, setSources] = useState([]);
	const [links, setLinks] = useState([]);
	const [input, setInput] = useState("");

	const Icon = icons[topic];

	const send = async () => {
		if (!topic) return;

		setMessages([...messages, { sender: "user", text: input }]);

		const context = `
			You are a helpful, creative, clever, and very friendly AI assistant who works for the US Immigration Bureau, and the user is an immigrant who is seeking help in the topic of ${topic}.
			Return an in-depth response to the immigrant's request. This is not a conversation - this is a simple response to a query: ${input}.
			Then, send a list of sources (IDENTIFIED BY 'SOURCES:') with links, and then send a list of links (IDENTIFIED BY 'LINKS:') for further assistance.
		`;

		getData(context)
			.then((data) => data.message)
			.then((content) => {
				setMessages([
					...messages,
					{
						sender: "compass",
						text: content.split("SOURCES:")[0],
					},
				]);

				setSources(
					content
						?.split("SOURCES:")[1]
						?.split("LINKS:")[0]
						?.split("\n")
				);

				setLinks(content?.split("LINKS:")[1]?.split("\n"));
			})
			.catch(console.error);
	};

	// function to clear all messages, sources and links
	const clearAll = () => {
		setMessages([]);
		setSources([]);
		setLinks([]);
	};

	return (
		<div className="flex flex-col items-start col-span-2">
			<div className="mb-8 flex flex-row w-full items-center">
				<div className=" text-3xl font-extrabold uppercase text-center ">
					<p>Welcome to the Compass. </p>

					<Text variant={topic}>
						YOUR TOPIC:
						<Icon className="w-8 h-8 mx-2" />
						{topic}
					</Text>
				</div>

				<div className="relative ml-auto">
					<button
						onClick={() => {
							/* Your other button function */
						}}
						className="border-primary border-2 rounded-lg hover:bg-primary-dark text-white font-bold   pl-3 pr-4 py-2 flex flex-row items-center duration-150 ml-4"
					>
						<Send className="w-5 h-5 mr-2" /> BACK
					</button>
				</div>
			</div>

			<div className="border-2 border-gray-300 dark:border-gray-800 rounded-lg overflow-hidden w-full ">
				<div className="flex items-center">
					<button
						onClick={() => clearAll()}
						className="bg-red-500 hover:bg-red-700  text-primary font-bold   pl-3 pr-4 py-2 flex flex-row items-center duration-150 mr-2"
					>
						<Trash className="w-5 h-5 mr-2" /> Clear All
					</button>

					<button
						onClick={() => {
							/* Your other button function */
						}}
						className="bg-green-500 hover:bg-green-700  text-primary font-bold   pl-3 pr-4 py-2 flex flex-row items-center duration-150"
					>
						Add
					</button>
				</div>

				<div className="grid grid-cols-2 w-full">
					<div className="flex flex-col w-full h-96 max-h-full">
						<div className="flex flex-col flex-grow border-t-2 border-gray-300 dark:border-gray-800   overflow-auto px-4 py-2">
							{messages.map((message, index) => (
								<div
									key={index}
									className={`flex ${
										message.sender === "user"
											? "justify-end"
											: "justify-start"
									} mb-2`}
								>
									<div
										className={`rounded-lg p-2 bg-gray-200 dark:bg-gray-800 ${
											message.sender === "user"
												? "ml-2"
												: "mr-2"
										}`}
									>
										<p className="text-sm">
											{message.text}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="flex w-full">
							<input
								type="text"
								placeholder="Type your question here"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								className="flex-grow focus:outline-none border-t-2 border-r-2 border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white text-primary px-4 py-2"
							/>

							<button
								onClick={send}
								className="bg-blue-500 hover:bg-blue-700  text-primary font-bold   pl-3 pr-4 py-2 flex flex-row items-center duration-150"
							>
								<Send className="w-5 h-5 mr-2" /> Send
							</button>
						</div>
					</div>

					<div className="flex flex-col w-full h-96 max-h-full">
						<div className="flex flex-col flex-grow border-l-2 border-t-2 border-gray-300 dark:border-gray-800 overflow-auto px-4 py-2">
							{sources.map((source, index) => (
								<div key={index} className="">
									<p className="text-sm">{source}</p>
								</div>
							))}
						</div>

						<div className="flex flex-col flex-grow border-l-2 border-t-2 border-gray-300 dark:border-gray-800 overflow-auto px-4 py-2">
							{links.map((link, index) => (
								<div key={index} className="">
									<p className="text-sm">{link}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
