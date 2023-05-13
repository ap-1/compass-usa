import { ClerkProvider } from "@clerk/nextjs";
import { StyleProvider } from "./style";

import type { PropsWithChildren } from "react";

export const metadata = {
	title: "Compass USA",
	description: "Platform for immigrants in the US",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<ClerkProvider>
			<html lang="en">
				<StyleProvider>{children}</StyleProvider>
			</html>
		</ClerkProvider>
	);
}
