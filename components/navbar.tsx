const pages = [
	{
		title: 'Home',
		href: '/'
	}
]

interface NavbarProps {
	title: typeof pages[number]["title"];
}

export const Navbar = ({ title }: NavbarProps) => {
	return (
		<nav>
			Current page: {title}
		</nav>
	)
}
