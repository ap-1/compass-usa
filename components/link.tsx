import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";
import {
	default as NextLink,
	type LinkProps as NextLinkProps,
} from "next/link";

type BaseLinkProps = Omit<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof NextLinkProps
> &
	NextLinkProps &
	React.RefAttributes<HTMLAnchorElement>;

interface LinkProps extends Omit<BaseLinkProps, "target"> {
	newWindow?: boolean;
	noUnderline?: boolean;
}

export const Link = (props: PropsWithChildren<LinkProps>) => {
	const { className, newWindow, noUnderline, ...rest } = props;
	const target = newWindow ? "_blank" : "_self";

	return (
		<NextLink
			className={cn(noUnderline || "underline", className)}
			target={target}
			{...rest}
		/>
	);
};
