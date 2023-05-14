"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { pages, topicPages, links } from "@/components/navbar/pages";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Sun, MoonStar, Search as SearchIcon } from "lucide-react";

const themes = [
	{
		name: "Light",
		value: "light",
		Icon: Sun,
	},
	{
		name: "Dark",
		value: "dark",
		Icon: MoonStar,
	},
] as const;

export const Search = () => {
	const [open, setOpen] = useState(false);
	const { setTheme } = useTheme();
	const router = useRouter();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			} else if (["Esc", "Escape"].includes(e.key)) {
				setOpen(false);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const handler = (func: (arg0: string) => void) => {
		return (value: string) => {
			func(value);
			setOpen(false);
		};
	};

	return (
		<>
			<Button
				asChild
				variant="outline"
				onClick={() => setOpen(true)}
				className="w-full pl-4 pr-2 md:w-80"
			>
				<div className="flex flex-row justify-between h-10">
					<div className="flex flex-row gap-2">
						<SearchIcon className="w-4 h-4 my-auto" />
						Search Compass...
					</div>

					<kbd className="hidden sm:block rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold">
						⌘ K
					</kbd>
				</div>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					autoFocus
					placeholder="Type a command or search..."
				/>
				<CommandList className="pb-1">
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Pages">
						{pages.map((page) => (
							<CommandItem
								key={page.title}
								value={page.href}
								onSelect={handler(router.push)}
							>
								<page.Icon className="w-4 h-4 mr-2" />
								{page.title}
							</CommandItem>
						))}
					</CommandGroup>

					<CommandGroup heading="Topics">
						{topicPages.map((page) => (
							<CommandItem
								key={page.title}
								value={page.href}
								onSelect={handler(router.push)}
							>
								<page.Icon className="w-4 h-4 mr-2" />
								{page.title}
							</CommandItem>
						))}
					</CommandGroup>

					<CommandGroup heading="Theme">
						{themes.map((theme) => (
							<CommandItem
								key={theme.name}
								value={theme.value}
								onSelect={handler(setTheme)}
							>
								<theme.Icon className="w-4 h-4 mr-2" />
								{theme.name}
							</CommandItem>
						))}
					</CommandGroup>

					<CommandGroup heading="Links">
						{links.map((link) => (
							<CommandItem
								key={link.title}
								value={link.title}
								onSelect={handler((href) =>
									window.open(href, "_blank")
								)}
							>
								<link.Icon className="w-4 h-4 mr-2" />
								{link.title}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};
