import {
	Home,
	Github,
	Triangle,
	Activity,
	DollarSign,
	Hotel,
	Briefcase,
	Compass,
	type LucideIcon,
} from "lucide-react";

export const topics = ["Jobs", "Housing", "Legal", "Health"] as const;
export type Topic = (typeof topics)[number];

export const icons: Record<Topic, LucideIcon> = {
	Health: Activity,
	Jobs: DollarSign,
	Housing: Hotel,
	Legal: Briefcase,
} as const;

export const descriptions: Record<Topic, string> = {
	Health: "Answer questions about health insurance, medical care, and more.",
	Jobs: "Answer questions about employment, taxes, and more.",
	Housing: "Answer questions about housing, rent, and more.",
	Legal: "Answer questions about legal status, citizenship, and more.",
} as const;

export const pages = [
	{
		title: "Home",
		href: "/",
		Icon: Home,
	},
	{
		title: "Compass",
		href: "/compass",
		Icon: Compass,
	},
] as const;

export const topicPages = [
	{
		title: "Jobs",
		href: "/compass/jobs",
		Icon: icons.Jobs,
	},
	{
		title: "Housing",
		href: "/compass/housing",
		Icon: icons.Housing,
	},
	{
		title: "Legal",
		href: "/compass/legal",
		Icon: icons.Legal,
	},
	{
		title: "Health",
		href: "/compass/health",
		Icon: icons.Health,
	},
] as const;

export const links = [
	{
		title: "GitHub",
		href: "https://github.com/ap-1/compass-usa",
		Icon: Github,
	},
	{
		title: "Vercel",
		href: "https://compass-usa.vercel.app",
		Icon: Triangle,
	},
] as const;
