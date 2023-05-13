import { Compass } from "lucide-react";
import { Content } from "@/components/content";

const pages = [
	{
		title: "Home",
		href: "/",
	},
];

interface NavbarProps {
	title: (typeof pages)[number]["title"];
}

export const Navbar = ({ title }: NavbarProps) => {
	return (
		<Content
			as="nav"
			border="border-b"
			className="h-16 flex justify-between"
		>
			<div className="py-4 flex flex-row gap-4">
				<Compass className="h-8 w-8" />
				<p className="my-auto font-bold text-2xl">Compass USA</p>
			</div>

			<div className="my-auto">Current page: {title}</div>
		</Content>
	);
};
