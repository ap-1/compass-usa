"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Compass, Menu, Sun, MoonStar, X, type LucideIcon } from "lucide-react";

import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/navbar/search";
import { pages } from "@/components/navbar/pages";
import { Content } from "@/components/content";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavMenuProps {
	className?: string;
}

const NavMenu = ({ className }: NavMenuProps) => {
	return (
		<NavigationMenu className={className}>
			<NavigationMenuList className="flex justify-start pl-2 lg:pl-0">
				<NavigationMenuItem>
					{pages.map((page) => (
						<Link
							key={page.title}
							href={page.href}
							legacyBehavior
							noUnderline
							passHref
						>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
							>
								{page.title}
							</NavigationMenuLink>
						</Link>
					))}
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

interface NavbarProps {
	title: (typeof pages)[number]["title"];
}

export const Navbar = ({ title }: NavbarProps) => {
	const { theme, setTheme } = useTheme();
	const [ThemeIcon, setThemeIcon] = useState<LucideIcon>(Sun);
	const [menuOpen, setMenuOpen] = useState(false);

	const MenuIcon = menuOpen ? X : Menu;

	useEffect(() => {
		setThemeIcon(theme === "dark" ? Sun : MoonStar);
	}, [theme]);

	return (
		<Content as="nav" border="border-b" className=" flex flex-col">
			<div className="flex justify-between">
				<div className="flex flex-row gap-x-8">
					<Link
						className="font-bold text-2xl py-4 flex flex-row gap-x-4"
						noUnderline
						href="/"
					>
						<Compass className="h-8 w-8" />
						Compass USA
					</Link>

					<NavMenu className="hidden lg:block my-auto" />
				</div>

				<div className="my-auto md:flex md:flex-row md:gap-x-2">
					<div className="hidden md:block">
						<Search />
					</div>

					<Button variant="outline" className="px-2" asChild>
						<ThemeIcon
							className="w-10 h-10"
							onClick={() =>
								setTheme(theme === "dark" ? "light" : "dark")
							}
						/>
					</Button>

					<Button
						variant="outline"
						className="px-2 ml-2 md:ml-0 lg:hidden"
						asChild
					>
						<MenuIcon
							className="w-10 h-10"
							onClick={() => setMenuOpen(!menuOpen)}
						/>
					</Button>
				</div>
			</div>

			<div className="block md:hidden -mt-1 mb-4">
				<Search />
			</div>

			{menuOpen && (
				<NavMenu className="block lg:hidden w-full rounded-md border -mt-2 md:-mt-1 mb-4 py-2" />
			)}
		</Content>
	);
};
