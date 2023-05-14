"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Compass, Menu, Sun, MoonStar, X, type LucideIcon } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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

interface AdditionalProps {
	className?: string;
}

const Auth = ({ className }: AdditionalProps) => {
	return (
		<div className={className}>
			<SignedIn>
				<div className="pt-0 lg:pt-1 pr-1 lg:pr-0">
					<UserButton />
				</div>
			</SignedIn>
			<SignedOut>
				<Button>
					<SignInButton />
				</Button>
			</SignedOut>
		</div>
	);
};

const NavMenu = ({ className }: AdditionalProps) => {
	return (
		<NavigationMenu className={className}>
			<NavigationMenuList className="flex justify-between px-2 lg:px-0">
				<NavigationMenuItem className="flex flex-row gap-2">
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

				<NavigationMenuItem>
					<Auth className="block lg:hidden" />
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
						className="group font-bold text-2xl transition-all py-4 flex flex-row gap-x-4 hover:tracking-wider hover:gap-x-5"
						noUnderline
						href="/"
					>
						<Compass className="h-8 w-8 group-hover:animate-spin" />
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

					<Auth className="hidden lg:block" />

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
