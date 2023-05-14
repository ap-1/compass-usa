"use client";

import Image from "next/image";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useRef, forwardRef } from "react";
import { MousePointer2, ArrowRightSquare, Search } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Topic, descriptions, icons, topics } from "@/components/navbar/pages";
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
} from "@/components/ui/hover-card";

interface ArrowProps {
	angle: number;
}

const Arrow = forwardRef<HTMLDivElement, ArrowProps>(
	({ angle }: ArrowProps, arrowRef) => {
		const nearestQuadrant = Math.round(angle / 90) * 90;

		return (
			<>
				<div
					ref={arrowRef}
					className="absolute w-2 h-2 pointer-events-none top-1/2 left-1/2"
					style={{
						rotate: `${nearestQuadrant - 45}deg`,
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-40 h-40 rotate-90 -translate-x-1/2 -translate-y-1/2"
						viewBox="0 0 48 48"
					>
						<path
							className="fill-blue-600 dark:fill-blue-500"
							d="M24 4a20 20 0 0 1 20 20H24V4Z"
						/>
					</svg>
				</div>
				<div
					ref={arrowRef}
					className="absolute w-2 h-2 border-4 border-white rounded-full top-1/2 left-1/2"
					style={{ rotate: `${angle - 45}deg` }}
				>
					<MousePointer2 className="rotate-180" />
				</div>
			</>
		);
	}
);
Arrow.displayName = "Arrow";

interface ItemButtonProps {
	topic: Topic;
	setTopic: (arg0: Topic) => void;
}

const ItemButton = ({ topic, setTopic }: ItemButtonProps) => {
	const { text, description, Icon } = useMemo(
		() => ({
			Icon: icons[topic],
			description: descriptions[topic],
			text: topic.toUpperCase(),
		}),
		[topic]
	);

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button
					variant="ghost"
					onClick={() => setTopic(topic)}
					className="p-2 mx-3 my-2 text-black transition-transform rounded-lg dark:text-white hover:scale-105 "
				>
					<Icon />
					<span className="ml-2">{text}</span>
				</Button>
			</HoverCardTrigger>

			<HoverCardContent className="w-50">
				<div className="flex flex-row gap-x-4">
					<Icon className="w-10 h-10 my-auto" />
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">{topic}</h4>
						<p className="text-sm">{description}</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export const Compass: NextPage = () => {
	const router = useRouter();
	const [arrowAngle, setArrowAngle] = useState(0);
	const arrowRef = useRef<HTMLDivElement>(null!);

	const getArrowAngle = (event: MouseEvent) => {
		const arrowRect = arrowRef.current.getBoundingClientRect();
		const arrowCenterX = arrowRect.left + arrowRect.width / 2;
		const arrowCenterY = arrowRect.top + arrowRect.height / 2;

		const deltaX = event.clientX - arrowCenterX;
		const deltaY = event.clientY - arrowCenterY;

		const radians = Math.atan2(deltaY, deltaX);
		const degrees = (radians * 180) / Math.PI;

		return degrees;
	};

	const fastClick = (event: MouseEvent) => {
		const degrees = getArrowAngle(event);
		let nearestQuadrant = (Math.round(degrees / 90) * 90) % 360;

		// i don't know why this happens
		if (nearestQuadrant === -180) {
			nearestQuadrant = 180;
		}

		const quadrant = [-90, -0, 90, 180].indexOf(nearestQuadrant);
		router.push(`/compass/${topics[quadrant].toLowerCase()}`);
	};

	const setTopic = (topic: Topic) =>
		router.push(`/compass/${topic.toLowerCase()}`);

	useEffect(() => {
		const updateArrowAngle = (event: MouseEvent) => {
			const degrees = getArrowAngle(event);

			setArrowAngle(degrees);
		};

		window.addEventListener("mousemove", updateArrowAngle);

		return () => window.removeEventListener("mousemove", updateArrowAngle);
	}, []);

	return (
		<>
			<Navbar title="Compass" />
			<Content as="main" className="py-8">
				<div className="flex flex-col lg:flex-row">
					<div className="flex flex-col items-start">
						<p className="mb-4 text-3xl font-extrabold text-center uppercase">
							Welcome to Compass.
						</p>
						<p>
							{
								"We know that it can be hard to find the right resources when you're in need. That's why we've created the Compass USA, a tool to help you find what you're looking for."
							}
						</p>

						<div className="flex flex-col mt-4">
							<div className="flex flex-row text-xl font-semibold">
								<ArrowRightSquare className="w-6 h-6 my-auto mr-4 " />
								Getting started
							</div>

							<div className="mt-1 mb-2 text-sm">
								<p className="hidden lg:inline-block">
									{
										"To get started, click on one of the categories on the right. You'll be presented with a list of resources that can help you."
									}
								</p>
								<p className="inline-block lg:hidden">
									{
										"To get started, click on one of the categories below. You'll be presented with a list of resources that can help you."
									}
								</p>
							</div>
						</div>

						<div className="flex flex-col items-center mt-4 sm:flex-row ">
							<Image
								src="/computers.png"
								alt="Computers"
								className="rounded-lg "
								height={400}
								width={400}
							/>

							<div className="mt-4 ml-0 sm:ml-8 sm:mt-0">
								<div className="flex flex-row items-center text-xl font-semibold">
									<Search className="w-6 h-6 mr-4 " />
									Find what you need
								</div>

								<div className="mt-2 ">
									<p className="text-sm">
										{
											"Information is invaluable in today's world. We can help you find the right resources to help you with any health, employment, legal, or housing needs you may have."
										}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-row justify-center w-full mt-8 ml-0 lg:ml-8 lg:mt-0">
						<div className="flex items-center">
							<ItemButton topic="Health" setTopic={setTopic} />
						</div>

						<div className="flex flex-col items-center justify-center ">
							<ItemButton topic="Jobs" setTopic={setTopic} />

							<div
								className="relative rounded-full border-8 border-black dark:bg-blue-600 bg-blue-500 dark:border-white h-60 w-60 bg-[url(/tickmarks.png)] bg-contain bg-center"
								onClick={fastClick as any}
							>
								<Arrow angle={arrowAngle} ref={arrowRef} />
							</div>

							<ItemButton topic="Legal" setTopic={setTopic} />
						</div>

						<div className="flex items-center">
							<ItemButton topic="Housing" setTopic={setTopic} />
						</div>
					</div>
				</div>
			</Content>
		</>
	);
};

export default Compass;
