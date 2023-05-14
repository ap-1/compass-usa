"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { descriptions } from "@/app/compass/page";
import { Link } from "@/components/link";
import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<>
			<Navbar title="Home" />
			<Content as="main" className="py-8">
				<div className="flex flex-col sm:flex-row">
					<div>
						<h1 className="mb-4 text-4xl font-extrabold uppercase">
							Get answers to your immigration questions
						</h1>
						<p className="mb-4 ">
							{
								"Our platform uses text-based generative AI to provide accurate and reliable answers to a wide range of immigration-related questions. Whether you're looking for information about visas, work permits, or citizenship, we've got you covered."
							}
						</p>

						<Button asChild>
							<Link href="compass" noUnderline>
								Get started{" "}
								<ArrowRight className="w-4 h-4 ml-2" />
							</Link>
						</Button>
					</div>

					<div className="mt-8 ml-0 sm:ml-8 sm:mt-0">
						<Image
							src={"/immigrants.jpg"}
							height={400}
							width={400}
							alt="App screenshot"
							className="w-full mb-4 rounded-lg"
						/>

						<div className="flex flex-row gap-4">
							<Image
								src={"/immigrants2.jpg"}
								height={400}
								width={400}
								alt="App screenshot"
								className="object-cover w-1/2 mb-4 rounded-lg"
							/>

							<Image
								src={"/immigrants3.webp"}
								height={400}
								width={400}
								alt="App screenshot"
								className="object-cover w-1/2 mb-4 rounded-lg"
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4 mt-4 sm:mt-8 sm:flex-row">
					<Image
						src={"/usflag.jpg"}
						alt="US Flag"
						height={400}
						className="mb-4 rounded-lg max-h-40"
						width={400}
					/>
					<div className="ml-0 sm:ml-6">
						<h1 className="mb-4 text-2xl font-extrabold uppercase">
							How it works
						</h1>
						<p className="mb-4 ">
							{
								"Simply select a topic and ask a question. Our app will provide you with an answer to your question using information collected regarding immigration policies in the United States of America. Links and sources are also provided."
							}
						</p>
					</div>
				</div>

				<div className="grid grid-rows-4 gap-2 py-4 sm:grid-rows-2 sm:grid-cols-2">
					<Link
						href="/compass/health"
						noUnderline
						className="p-4 bg-red-500 rounded-lg text-background dark:text-foreground"
					>
						<p className="font-bold">HEALTH</p>
						<p className="mt-1 text-sm ">{descriptions.Health}</p>
					</Link>
					<Link
						href="/compass/jobs"
						noUnderline
						className="p-4 bg-green-500 rounded-lg dark:text-background text-foreground"
					>
						<p className="font-bold">JOBS</p>
						<p className="mt-1 text-sm ">{descriptions.Jobs}</p>
					</Link>
					<Link
						href="/compass/housing"
						noUnderline
						className="p-4 bg-yellow-500 rounded-lg dark:text-background text-foreground"
					>
						<p className="font-bold">HOUSING</p>
						<p className="mt-1 text-sm ">{descriptions.Housing}</p>
					</Link>
					<Link
						href="/compass/legal"
						noUnderline
						className="p-4 bg-purple-500 rounded-lg text-background dark:text-foreground"
					>
						<p className="font-bold">LEGAL</p>
						<p className="mt-1 text-sm ">{descriptions.Legal}</p>
					</Link>
				</div>
			</Content>
		</>
	);
}
