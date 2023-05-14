import { UserPlus } from "lucide-react";
import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { pages, topicPages } from "@/components/navbar/pages";
import { type NavbarProps } from "@/components/navbar";

export const SignInButton = ({ title }: NavbarProps) => {
	const redirectUrl = [...pages, ...topicPages].find(
		(page) => page.title === title
	)?.href;

	return (
		<ClerkSignInButton mode="modal" redirectUrl={redirectUrl}>
			<Button className="flex flex-row gap-2">
				Sign in
				<UserPlus className="w-4 h-4" />
			</Button>
		</ClerkSignInButton>
	);
};
