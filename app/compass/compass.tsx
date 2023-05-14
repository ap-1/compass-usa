"use client";

import Image from "next/image";
import {
	useState,
	useEffect,
	useMemo,
	useRef,
	forwardRef,
	type Dispatch,
	type SetStateAction,
} from "react";

import { Button } from "@/components/ui/button";
import { icons, type Topic } from "@/app/compass/page";
import { MousePointer2, ArrowRightSquare, Search } from "lucide-react";

interface ArrowProps {
	angle: number;
}

const Arrow = forwardRef<HTMLDivElement, ArrowProps>(
	({ angle }: ArrowProps, arrowRef) => {
		return (
			<div
				ref={arrowRef}
				className="absolute top-1/2 left-1/2 w-2 h-2 border-4 rounded-full border-white"
				style={{ rotate: `${angle - 45}deg` }}
			>
				<MousePointer2 className="rotate-180" />
			</div>
		);
	}
);
Arrow.displayName = "Arrow";

interface ItemButtonProps {
	topic: Topic;
	setTopic: Dispatch<SetStateAction<Topic>>;
}

const ItemButton = ({ topic, setTopic }: ItemButtonProps) => {
	const { text, Icon } = useMemo(
		() => ({ Icon: icons[topic], text: topic.toUpperCase() }),
		[topic]
	);

	return (
		<Button
			variant="ghost"
			onClick={() => setTopic(topic)}
			className="my-2 mx-3 rounded-lg text-black dark:text-white p-2 hover:scale-105 transition-transform "
		>
			<Icon />
			<span className="ml-2">{text}</span>
		</Button>
	);
};

interface SelectorProps {
	setTopic: Dispatch<SetStateAction<Topic>>;
}

export const Selector = ({ setTopic }: SelectorProps) => {
	const [arrowAngle, setArrowAngle] = useState(0);
	const arrowRef = useRef<HTMLDivElement>(null!);

	useEffect(() => {
		const updateArrowAngle = (event: MouseEvent) => {
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

	return (
		<>
			<div className="flex flex-col items-start">
				<p className="text-3xl font-extrabold uppercase text-center mb-8">
					Welcome to the Compass.
				</p>
				<p>
					{
						"We know that it can be hard to find the right resources when you're in need. That's why we've created the Compass, a tool to help you find what you need."
					}
				</p>

				<div className="flex flex-row mt-4 justify-center items-center">
					<ArrowRightSquare className="inline-block h-12 w-12 mr-2 " />
					<p className="font-semibold">
						{
							"To get started, click on one of the categories to the right. You'll be presented with a list of resources that can help you."
						}
					</p>
				</div>

				<div className="flex-row flex mt-4 items-center ">
					<Image
						src="/computers.png"
						alt="Computers"
						className="rounded-lg "
						height={400}
						width={400}
					/>

					<div className="ml-4  ">
						<div className="text-xl font-semibold flex flex-row items-center">
							<Search className=" h-6 w-6 mr-4 " />
							Find what you need
						</div>

						<div className=" mt-2">
							<p className="text-sm">
								{
									"Technology is invaluable in today's world. We can help you find the right resources to help you with any health, employment, legal, or housing needs you may have."
								}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-row justify-center w-full">
				<div className="flex  items-center">
					<ItemButton topic="Health" setTopic={setTopic} />
				</div>

				<div className="flex flex-col justify-center items-center ">
					<ItemButton topic="Jobs" setTopic={setTopic} />

					<div className="relative rounded-full border-8 border-black dark:bg-blue-600 bg-blue-500 dark:border-white h-60 w-60 bg-[url(/tickmarks.png)] bg-contain bg-center">
						<Arrow angle={arrowAngle} ref={arrowRef} />
					</div>

					<ItemButton topic="Legal" setTopic={setTopic} />
				</div>

				<div className="flex  items-center">
					<ItemButton topic="Housing" setTopic={setTopic} />
				</div>
			</div>
		</>
	);
};
