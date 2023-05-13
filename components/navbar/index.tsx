import { Compass, Menu } from "lucide-react";

import { Link } from "@/components/link";
import { Content } from "@/components/content";
import { Search } from "@/components/navbar/search";
import { pages } from "@/components/navbar/pages";

interface NavbarProps {
	title: (typeof pages)[number]["title"];
}

export const Navbar = ({ title }: NavbarProps) => {
	return (
		<Content
			as="nav"
			border="border-b"
			className="h-[7.5rem] md:h-16 flex flex-col"
		>
			<div className="flex justify-between">
				<Link
					className="font-bold text-2xl py-4 flex flex-row gap-4"
					hideUnderline
					href="/"
				>
					<Compass className="h-8 w-8" />
					Compass USA
				</Link>

				<div className="my-auto md:flex md:flex-row md:gap-4">
					<div className="hidden md:block">
						<Search />
					</div>
					<Menu className="h-8 w-8 my-auto" />
				</div>
			</div>

			<div className="block md:hidden">
				<Search />
			</div>
		</Content>
	);
};
