"use client";

import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { Provider } from "jotai";
import { ThemeProvider } from "next-themes";

import type { PropsWithChildren } from "react";

import "./globals.css";

const satoshi = localFont({
	src: "../fonts/Satoshi-Variable.woff2",
	variable: "--font-satoshi",
});

export const StyleProvider = ({ children }: PropsWithChildren) => {
	return (
		<ThemeProvider
			attribute="class"
			enableColorScheme={false}
			defaultTheme="dark"
		>
			<style jsx global>
				{`
					:root {
						--font-satoshi: ${satoshi.variable};
					}
				`}
			</style>

			<body className={cn(satoshi.variable, "font-sans")}>
				<Provider>{children}</Provider>
			</body>
		</ThemeProvider>
	);
};
