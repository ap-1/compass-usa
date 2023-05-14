"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Compass, Menu, Sun, MoonStar, X, type LucideIcon } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/signIn";
import { Search } from "@/components/navbar/search";
import { pages, topicPages } from "@/components/navbar/pages";
import { Content } from "@/components/content";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export interface NavbarProps {
	title:
		| (typeof pages)[number]["title"]
		| (typeof topicPages)[number]["title"];
}

interface AdditionalProps {
	className: string;
	title: NavbarProps["title"];
}

const Auth = ({ className, title }: AdditionalProps) => {
	return (
		<div className={className}>
			<SignedIn>
				<div className="pt-0 pr-1 lg:pt-1 lg:pr-0">
					<UserButton
						appearance={{
							elements: {
								userButtonPopoverFooter: "hidden",
							},
						}}
					/>
				</div>
			</SignedIn>
			<SignedOut>
				<SignInButton title={title} />
			</SignedOut>
		</div>
	);
};

const NavMenu = ({ className, title }: AdditionalProps) => {
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
								className={cn(
									navigationMenuTriggerStyle(),
									"flex flex-row gap-2"
								)}
							>
								<page.Icon className="w-4 h-4" />
								{page.title}
							</NavigationMenuLink>
						</Link>
					))}
				</NavigationMenuItem>

				<NavigationMenuItem>
					<Auth className="block lg:hidden" title={title} />
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export const Navbar = ({ title }: NavbarProps) => {
	const { theme, setTheme } = useTheme();
	const [ThemeIcon, setThemeIcon] = useState<LucideIcon>(Sun);
	const [menuOpen, setMenuOpen] = useState(false);

	const MenuIcon = menuOpen ? X : Menu;

	useEffect(() => {
		setThemeIcon(theme === "dark" ? Sun : MoonStar);
	}, [theme]);

	return (
		<Content as="nav" border="border-b" className="flex flex-col ">
			<div className="flex justify-between">
				<div className="flex flex-row gap-x-8">
					<Link
						className="flex flex-row py-4 text-2xl font-bold transition-all group gap-x-4 hover:tracking-wider hover:gap-x-5"
						noUnderline
						href="/"
					>
						<Compass className="w-8 h-8 group-hover:animate-spin" />
						<span
							className="bg-primary bg-clip-text group-hover:bg-gradient-to-r from-primary to-red-400"
							style={{
								WebkitTextFillColor: "transparent",
							}}
						>
							Compass USA
						</span>
					</Link>

					<NavMenu
						className="hidden my-auto lg:block"
						title={title}
					/>
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

					<Auth className="hidden lg:block" title={title} />

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

			<div className="block mb-4 -mt-1 md:hidden">
				<Search />
			</div>

			{menuOpen && (
				<NavMenu
					className="block w-full py-2 mb-4 -mt-2 border rounded-md lg:hidden md:-mt-1"
					title={title}
				/>
			)}
		</Content>
	);
};
