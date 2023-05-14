"use client";

import { useState, useEffect, useRef, forwardRef } from "react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import CompassSelector from "./compass";
import Helper from "./helper";

export default function Compass() {
	const [topic, setTopic] = useState("");

	const topicHandler = () => {
		if (topic === "") {
			return <CompassSelector setTopic={setTopic} />;
		} else {
			return <Helper topic={topic} />;
		}
	};

	return (
		<>
			<Navbar title="Compass" />
			<Content as="main" className="py-20 grid grid-cols-2">
				{topicHandler()}
			</Content>
		</>
	);
}
