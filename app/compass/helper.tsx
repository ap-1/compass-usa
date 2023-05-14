"use client";
import { useState } from "react";
import { askChatGPT } from "@/lib/openai";
import { env } from "@/env.mjs";
import { Configuration, OpenAIApi } from "openai";
import {
	DollarSign,
	Home,
	Briefcase,
	Activity,
	Send,
	Trash,
} from "lucide-react";

const configuration = new Configuration({
	apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default function CompassSelector(props: { topic: any }) {
	const [messages, setMessages] = useState([]);
	const [sources, setSources] = useState([]);
	const [links, setLinks] = useState([]);
	const [input, setInput] = useState("");

	const colorHandler = (selector) => {
		if (props.topic === "Health") {
			return `${selector}-red-500 flex items-center flex-row`;
		} else if (props.topic === "Employment") {
			return `${selector}-yellow-500 flex items-center flex-row`;
		} else if (props.topic === "Housing") {
			return `${selector}-green-500 flex items-center flex-row`;
		} else if (props.topic === "Legal") {
			return `${selector}-purple-500 flex items-center flex-row`;
		}
	};

	const iconHandler = () => {
		if (props.topic === "Health") {
			return <Activity className="w-8 h-8" />;
		} else if (props.topic === "Employment") {
			return <DollarSign className="w-8 h-8" />;
		} else if (props.topic === "Housing") {
			return <Home className="w-8 h-8" />;
		} else if (props.topic === "Legal") {
			return <Briefcase className="w-8 h-8" />;
		}
	};

	const send = async () => {
		if (!props.topic) return;

		setMessages([...messages, { sender: "user", text: input }]);

		const context =
			"You are a helpful, creative, clever, and very friendly AI assistant who works for the US Immigration Bureau, and the user is an immigrant who is seeking help in the topic of " +
			props.topic +
			". \n Return an in-depth response to the immigrant's request. This is not a conversation - this is a simple response to a query:" +
			input +
			"\n Then, send a list of sources (IDENTIFIED BY 'SOURCES:') with links, and then send a list of links (IDENTIFIED BY 'LINKS:') for further assistance.";

		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: context }],
		});

		setMessages([
			...messages,
			{
				sender: "compass",
				text: completion?.data?.choices[0]?.message?.content?.split(
					"SOURCES:"
				)[0],
			},
		]);

		setSources(
			completion?.data?.choices[0]?.message?.content
				?.split("SOURCES:")[1]
				?.split("LINKS:")[0]
				?.split("\n")
		);

		setLinks(
			completion?.data?.choices[0]?.message?.content
				?.split("LINKS:")[1]
				?.split("\n")
		);

		console.log(completion?.data?.choices[0]?.message?.content);
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
					<p className="">Welcome to the Compass. </p>
					<p className={colorHandler("text")}>
						{iconHandler()}{" "}
						<span className="ml-2">YOUR TOPIC: {props.topic}</span>
					</p>
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
								onClick={() => send()}
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
}
