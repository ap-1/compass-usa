import { Home, Github } from "lucide-react";

export const pages = [
	{
		title: "Home",
		href: "/",
		Icon: Home,
	},
] as const;

export const links = [
	{
		title: "GitHub",
		href: "https://github.com/ap-1/compass-usa",
		Icon: Github,
	},
] as const;
