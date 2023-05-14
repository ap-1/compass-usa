import { Home, Github, Compass } from "lucide-react";

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
	}
] as const;

export const links = [
	{
		title: "GitHub",
		href: "https://github.com/ap-1/compass-usa",
		Icon: Github,
	},
] as const;
