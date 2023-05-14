"use client";

import { useState } from "react";
import {
	Activity,
	DollarSign,
	Home,
	Briefcase,
	type LucideIcon,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { Selector } from "@/app/compass/compass";
import { Helper } from "@/app/compass/helper";

export type Topic = "Health" | "Jobs" | "Legal" | "Housing";

export const icons: Record<Topic, LucideIcon> = {
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
			<Content as="main" className="grid grid-cols-2 py-20">
				{topic ? (
					<Helper topic={topic} setTopic={setTopic} />
				) : (
					<Selector setTopic={setTopic} />
				)}
			</Content>
		</>
	);
}
