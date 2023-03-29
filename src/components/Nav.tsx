import Link from "next/link";
import { INav } from "../typings/home";

const Nav = ({ navData }: { navData: INav[] }) => {
	return (
		<nav className="flex items-center justify-center">
			<ul className="flex gap-[96px] p-4">
				{navData.map((item, idx) => {
					const { name, href } = item;
					return (
						<li key={idx}>
							<Link href={href} legacyBehavior>
								<a className="text-primary cursor-pointer">{name}</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Nav;
