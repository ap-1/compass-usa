import { cn } from "@/lib/utils";

export const Content = (props: React.HTMLProps<HTMLDivElement>) => {
	const {
		className,
		children,
		as: Component = "div" as React.ElementType,
		...rest
	} = props;

	return (
		<Component className="border-b" {...rest}>
			<div className={cn("mx-auto max-w-6xl px-8", className)}>
				{children}
			</div>
		</Component>
	);
};
