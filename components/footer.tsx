import { Link } from "@/components/link";
import { Content } from "@/components/content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

interface UserCardProps {
	name: string;
	username: string;
	description: string;
}

const UserCard = ({ name, username, description }: UserCardProps) => {
	const url = `https://github.com/${username}`;
	const avatarUrl = `${url}.png`;

	const initials = name
		.split(" ")
		.map((n) => n[0].toUpperCase())
		.join("");

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Link href={url} newWindow>
					{name}
				</Link>
			</HoverCardTrigger>

			<HoverCardContent className="w-50">
				<div className="flex flex-row gap-x-4">
					<Avatar>
						<AvatarImage src={avatarUrl} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>

					<div className="space-y-1">
						<h4 className="text-sm font-semibold">@{username}</h4>
						<p className="text-sm">{description}</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export const Footer = () => {
	return (
		<Content as="footer" border="border-t" className="py-4">
			<div className="text-muted-foreground">
				Developed by{" "}
				<UserCard
					name="Anish Pallati"
					username="ap-1"
					description="hi"
				/>{" "}
				and{" "}
				<UserCard
					name="Kevin Liu"
					username="Kevin-Liu-01"
					description="🗿 what"
				/>{" "}
				for{" "}
				<Link href="https://pantherhack-2023.devpost.com/" newWindow>
					PantherHack 2023
				</Link>
				.
			</div>
		</Content>
	);
};
