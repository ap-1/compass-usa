import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { AskDialog } from "@/app/dialog";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<Navbar title="Home" />
			<Content as="main" className="py-4">
				{/* <AskDialog /> */}
				<div className="grid grid-cols-2">
					<div className=" ">
						<h1 className="uppercase font-extrabold text-4xl mb-4">
							Get answers to your immigration questions
						</h1>
						<p className="  mb-4">
							{
								"Our app uses ChatGPT to provide accurate and reliable answers to a wide range of immigration-related questions. Whether you're looking for information about visas, work permits, or citizenship, we've got you covered."
							}
						</p>
						<Link
							href="/compass"
							className=" border-2 border-primary rounded-lg px-2 py-1"
						>
							Get Started
						</Link>{" "}
						<div className="grid grid-cols-4 border-t-2 border-primary mt-4 mr-4 gap-4 py-4">
							<div className="bg-red-500 rounded-lg p-2">
								<p className="font-bold">HEALTH</p>
								<p className="mt-2 text-sm  ">
									Answer questions about health insurance,
									medical care, and more.
								</p>
							</div>
							<div className="bg-green-500 rounded-lg p-2">
								<p className="font-bold">JOBS</p>
								<p className="mt-2 text-sm  ">
									Answer questions about employment, taxes,
									and more.
								</p>
							</div>
							<div className="bg-yellow-500 rounded-lg p-2">
								<p className="font-bold">HOUSING</p>
								<p className="mt-2 text-sm  ">
									Answer questions about housing, rent, and
									more.
								</p>
							</div>
							<div className="bg-purple-500 rounded-lg p-2">
								<p className="font-bold">LEGAL</p>
								<p className="mt-2 text-sm  ">
									Answer questions about legal status,
									citizenship, and more.
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<Image
								src={"/usflag.jpg"}
								alt="US Flag"
								height={400}
								className="rounded-lg mb-4"
								width={400}
							/>
							<div>
								<h1 className="uppercase font-extrabold text-2xl mb-4">
									How it works
								</h1>
								<p className=" mb-4">
									{
										"Simply select a topic and ask a question. Our app will provide you with an answer to your question using information collected regarding immigration policies in the United States of America."
									}
								</p>
							</div>
						</div>
					</div>
					<div className=" ">
						<Image
							src={"/immigrants.jpg"}
							height={400}
							width={400}
							alt="App screenshot"
							className="rounded-lg w-full mb-4"
						/>
						<div className="flex flex-row gap-4">
							<Image
								src={"/immigrants2.jpg"}
								height={400}
								width={400}
								alt="App screenshot"
								className="rounded-lg mb-4 object-cover"
							/>
							<Image
								src={"/immigrants3.webp"}
								height={400}
								width={400}
								alt="App screenshot"
								className="rounded-lg mb-4 object-cover"
							/>
						</div>
					</div>
				</div>
			</Content>
		</>
	);
}
