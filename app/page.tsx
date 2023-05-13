import { Navbar } from "@/components/navbar";
import { Content } from "@/components/content";
import { AskDialog } from "@/app/dialog";

export default function Home() {
	return (
		<>
			<Navbar title="Home" />
			<Content as="main" className="py-4">
				<AskDialog />
			</Content>
		</>
	);
}
