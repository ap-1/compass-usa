import { Link } from "@/components/link";
import { Content } from "@/components/content";

export const Footer = () => {
	return (
		<Content as="footer" border="border-t" className="py-4">
			<p className="text-muted-foreground">
				Developed by{" "}
				<Link href="https://github.com/ap-1" newWindow>
					Anish Pallati
				</Link>{" "}
				and{" "}
				<Link href="https://github.com/Kevin-Liu-01" newWindow>
					Kevin Liu
				</Link>{" "}
				for{" "}
				<Link href="https://pantherhack-2023.devpost.com/" newWindow>
					PantherHack 2023
				</Link>
				.
			</p>
		</Content>
	);
};
