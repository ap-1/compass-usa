import { cn } from "@/lib/utils";

interface ContentProps {
	border?: "border-b" | "border-t";
}

export const Content = (
	props: React.HTMLProps<HTMLDivElement> & ContentProps
) => {
	const {
		className,
		children,
		border,
		as: Component = "div" as React.ElementType,
		...rest
	} = props;

	return (
		<Component className={border ?? ""} {...rest}>
			<div className={cn("mx-auto max-w-6xl px-8", className)}>
				{children}
			</div>
		</Component>
	);
};
