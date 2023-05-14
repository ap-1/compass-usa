"use client";

import { useState, useRef, forwardRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { notFound, useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { Link } from "@/components/link";
import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { topics, icons, type Topic } from "@/app/compass/page";

import {
	Send,
	Trash,
	MousePointer2,
	ArrowLeft,
	UserPlus,
	Home,
	Link as LinkIcon,
	History,
	Album,
	Loader2,
} from "lucide-react";
import superjson from "superjson";

interface ArrowProps {
	angle: number;
}

const Arrow = forwardRef<HTMLDivElement, ArrowProps>(
	({ angle }: ArrowProps, arrowRef) => {
		return (
			<div
				ref={arrowRef}
				className="absolute w-2 h-2 border-4 border-white rounded-full"
				style={{ rotate: `${angle - 45}deg` }}
			>
				<MousePointer2 className="rotate-180" />
			</div>
		);
	}
);
Arrow.displayName = "Arrow";

const textVariants = cva("flex flex-row items-center", {
	variants: {
		variant: {
			Health: "text-red-500",
			Jobs: "text-green-500",
			Housing: "text-yellow-500",
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

type Message = {
	sender: string;
	text: string;
};

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

interface TopicHelperParams {
	params: {
		topic: Topic;
	};
}

export default function TopicHelper({ params }: TopicHelperParams) {
	const topic =
		params.topic.charAt(0).toUpperCase() +
		params.topic.slice(1).toLowerCase();
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [sources, setSources] = useState([]);
	const [links, setLinks] = useState([]);
	const [input, setInput] = useState("");

	const [arrowAngle, setArrowAngle] = useState(0);
	const arrowRef = useRef<HTMLDivElement>(null!);

	useEffect(() => {
		const updateArrowAngle = (event: MouseEvent) => {
			if (!arrowRef.current) return;

			const arrowRect = arrowRef.current.getBoundingClientRect();
			const arrowCenterX = arrowRect.left + arrowRect.width / 2;
			const arrowCenterY = arrowRect.top + arrowRect.height / 2;

			const deltaX = event.clientX - arrowCenterX;
			const deltaY = event.clientY - arrowCenterY;

			const radians = Math.atan2(deltaY, deltaX);
			const degrees = (radians * 180) / Math.PI;

			setArrowAngle(degrees);
		};

		window.addEventListener("mousemove", updateArrowAngle);

		return () => window.removeEventListener("mousemove", updateArrowAngle);
	}, []);

	if (!topics.includes(topic as Topic)) {
		return notFound();
	}
	const Icon = icons[topic as Topic];

	const send = async () => {
		if (!topic) return;

		setMessages((prevMessages) => [
			...prevMessages,
			{ sender: "user", text: input },
		]);
		const context = `
			You are a helpful, creative, clever, and very friendly AI assistant who works for the US Immigration Bureau, and the user is an immigrant who is seeking help in the topic of ${topic}.
			Return an in-depth response to the immigrant's request. This is not a conversation - this is a simple response to a query: ${input}.
			Then, send a list of sources (IDENTIFIED BY 'SOURCES:') with links, and then send a list of links (IDENTIFIED BY 'LINKS:') for further assistance.
		`;

		setLoading(true);
		getData(context)
			.then((data) => data.message)
			.then((content) => {
				setMessages((prevMessages) => [
					...prevMessages,
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
			.catch(console.error)
			.finally(() => setLoading(false));
	};

	const clearAll = () => {
		setMessages([]);
		setSources([]);
		setLinks([]);
	};

	return (
		<>
			<Navbar title="Compass" />
			<Content as="main" className="py-8">
				<SignedIn>
					<div className="flex flex-col items-start col-span-2">
						<div className="flex flex-row items-center w-full mb-8">
							<div className="flex justify-center items-center relative rounded-full border-4 mr-4 border-gray-900 dark:bg-blue-600 bg-blue-500 dark:border-white h-20 w-20 bg-[url(/tickmarks.png)] bg-contain bg-center">
								<Arrow angle={arrowAngle} ref={arrowRef} />
							</div>

							<div className="text-3xl font-bold text-center uppercase ">
								<p className="font-black tracking-wider">
									Welcome to the Compass.{" "}
								</p>

								<Text variant={topic as Topic}>
									YOUR TOPIC: {topic}
									<Icon className="w-8 h-8 ml-2" />
								</Text>
							</div>
						</div>

						<div className="w-full overflow-hidden border-2 rounded-lg border-border">
							<div className="flex items-center bg-gray-100 dark:bg-gray-900">
								<Button
									onClick={clearAll}
									variant="destructive"
									className="flex flex-row items-center py-1 pl-3 pr-4 m-2 mr-2"
								>
									<Trash className="w-5 h-5 mr-2" /> Clear All
								</Button>

								<div className="relative ml-auto mr-2">
									<Button
										onClick={() => {
											router.push("/compass");
										}}
										className="flex flex-row items-center py-2 pl-3 pr-4 ml-4"
									>
										<ArrowLeft className="w-5 h-5 mr-2" />{" "}
										BACK
									</Button>
								</div>
							</div>

							<div className="grid w-full grid-cols-2">
								<div className="flex flex-col w-full max-h-full h-96">
									<div className="flex flex-col flex-grow px-4 py-2 overflow-auto border-t-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-black border-border">
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
														message.sender ===
														"user"
															? "ml-2"
															: "mr-2 bg-blue-100 dark:bg-blue-800"
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
											onChange={(e) =>
												setInput(e.target.value)
											}
											className="flex-grow px-4 py-2 bg-gray-100 border-t-2 border-r-2 focus:outline-none border-border dark:bg-gray-900 dark:text-white text-primary"
										/>

										<Button
											onClick={send}
											disabled={loading}
											className="flex flex-row items-center h-full py-2 pl-3 pr-4 border-t-2 rounded-none"
										>
											{loading ? (
												<>
													<Loader2 className="w-5 h-5 mr-2 animate-spin" />
													Sending...
												</>
											) : (
												<>
													<Send className="w-5 h-5 mr-2" />
													Send message
												</>
											)}
										</Button>
									</div>
								</div>

								<div className="flex flex-col w-full max-h-full h-96">
									<div className="flex flex-col flex-grow px-4 py-2 overflow-auto border-t-2 border-l-2 border-border">
										<p className="flex items-center text-lg font-bold">
											<LinkIcon className="inline w-4 h-4 mr-2 " />{" "}
											SOURCES
										</p>

										{sources.map((source, index) => (
											<div key={index}>
												<p className="text-sm">
													{source}{" "}
												</p>
											</div>
										))}
									</div>

									<div className="flex flex-col flex-grow px-4 py-2 overflow-auto border-t-2 border-l-2 border-border">
										<p className="flex items-center text-lg font-bold">
											<Album className="inline w-4 h-4 mr-2 " />{" "}
											Links
										</p>

										{links.map((link, index) => (
											<div key={index}>
												<p className="text-sm">
													{link}
												</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</SignedIn>

				<SignedOut>
					<div className="flex flex-col">
						<h1 className="mb-2 text-6xl font-black uppercase">
							Whoops!
						</h1>
						<div className="mb-8 text-3xl font-bold text-muted-foreground">
							You&apos;re not signed in.
						</div>

						<div className="flex gap-4">
							<SignInButton mode="modal">
								<Button className="flex flex-row gap-2">
									Sign in
									<UserPlus className="w-4 h-4" />
								</Button>
							</SignInButton>

							<Button
								onClick={() => router.back()}
								variant="outline"
							>
								Go back
								<History className="w-4 h-4 ml-2" />
							</Button>
							<Link href="/" noUnderline>
								<Button variant="outline">
									Go home <Home className="w-4 h-4 ml-2" />
								</Button>
							</Link>
						</div>
					</div>
				</SignedOut>
			</Content>
		</>
	);
}
