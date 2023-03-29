import Nav from "@/components/Nav";
import { INav } from "@/typings/home";
import { Inter } from "next/font/google";
import { navData } from "../../data.json";

const inter = Inter({ subsets: ["latin"] });

interface IHome {
	navData: INav[];
}

const Home = ({ navData }: IHome) => {
	return (
		<div className="overflow-hidden max-w-[1600px] mx-auto bg-page">
			<Nav navData={navData} />
		</div>
	);
};

// get data.json
export const getStaticProps = async () => {
	// code

	return {
		props: {
			navData,
		},
	};
};

export default Home;
