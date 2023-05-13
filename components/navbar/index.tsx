"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Compass, Menu, Sun, MoonStar, X } from "lucide-react";

import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/navbar/search";
import { pages } from "@/components/navbar/pages";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Content } from "@/components/content";

interface NavbarProps {
	title: (typeof pages)[number]["title"];
}

export const Navbar = ({ title }: NavbarProps) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	const MenuIcon = menuOpen ? X : Menu;
	const ThemeIcon = theme === "dark" ? Sun : MoonStar;

	return (
		<Content
			as="nav"
			border="border-b"
			className="h-[7.5rem] md:h-16 flex flex-col"
		>
			<Popover>
				<div className="flex justify-between">
					<Link
						className="font-bold text-2xl py-4 flex flex-row gap-4"
						hideUnderline
						href="/"
					>
						<Compass className="h-8 w-8" />
						Compass USA
					</Link>

					<div className="my-auto md:flex md:flex-row md:gap-2">
						<div className="hidden md:block">
							<Search />
						</div>

						<Button variant="outline" className="px-2" asChild>
							<ThemeIcon
								className="w-10 h-10"
								onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
							/>
						</Button>

						<PopoverTrigger>
							<Button variant="outline" className="px-2 ml-2 md:ml-0" asChild>
								<MenuIcon
									className="w-10 h-10"
									onClick={() => setMenuOpen(!menuOpen)}
								/>
							</Button>
						</PopoverTrigger>
					</div>
				</div>

				<div className="block md:hidden">
					<Search />
				</div>
			</Popover>
		</Content>
	);
};
