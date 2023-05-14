import { Home, Github, Triangle, Compass } from "lucide-react";
import { icons } from "@/app/compass/page";

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
