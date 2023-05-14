"use client";

import { useState, useEffect, useRef } from "react";
import { MousePointer2 } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";

interface ArrowProps {
	angle: number;
}

export default function Compass() {
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

	const Arrow = ({ angle }: ArrowProps) => {
		return (
			<div
				ref={arrowRef}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border-4 rounded-full border-white"
				style={{ rotate: `${angle - 45}deg` }}
			>
				<MousePointer2 className="rotate-180" />
			</div>
		);
	}

	return (
		<>
			<Navbar title="Compass" />
			<Content as="main" className="py-4">
				<div className="text-xl font-extrabold uppercase text-center mb-8">
					Welcome to the Compass.
				</div>
				<div className="flex flex-row justify-center w-full">
					<div className="flex  items-center">
						<button className="mr-4 bg-white rounded-lg text-black p-2 ">
							LEGAL
						</button>
					</div>
					<div className="flex flex-col justify-center items-center ">
						<button className="mb-4 bg-white rounded-lg text-black p-2 ">
							LEGAL
						</button>
						<div className="relative rounded-full border-8 border-white h-60 w-60">
							<Arrow angle={arrowAngle} />
						</div>
						<button className="mt-4 bg-white rounded-lg text-black p-2 ">
							LEGAL
						</button>
					</div>
					<div className="flex  items-center">
						<button className="ml-4 bg-white rounded-lg text-black p-2 ">
							LEGAL
						</button>
					</div>
				</div>
			</Content>
		</>
	);
}
