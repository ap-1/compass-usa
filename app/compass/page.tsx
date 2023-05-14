"use client";

import { useState } from "react";
import { Activity, DollarSign, Home, Briefcase } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Selector } from "@/app/compass/compass";
import { Helper } from "@/app/compass/helper";

export type Topic = "Health" | "Jobs" | "Legal" | "Housing";

export const icons = {
	Health: Activity,
	Jobs: DollarSign,
	Housing: Home,
	Legal: Briefcase,
};

export default function Compass() {
	const [topic, setTopic] = useState<Topic>(null!);

	return (
		<>
			<Navbar title="Compass" />
			<Content as="main" className="py-20 grid grid-cols-2">
				{topic ? (
					<Helper topic={topic} />
				) : (
					<Selector setTopic={setTopic} />
				)}
			</Content>
		</>
	);
}
