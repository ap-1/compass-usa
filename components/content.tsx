import { cn } from "@/lib/utils";

export const Content = (props: React.HTMLProps<HTMLDivElement>) => {
	const { className, children, ...rest } = props;

	return (
		<div className="border-b" {...rest}>
			<div className={cn("mx-auto max-w-6xl px-8", className)}>
				{children}
			</div>
		</div>
	);
};
