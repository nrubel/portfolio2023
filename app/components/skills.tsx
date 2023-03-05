import { useLoaderData } from "@remix-run/react";
import type { FC } from "react";
import { Heading } from "~/components";

export const Skills: FC = () => {
	const { skills } = useLoaderData();

	return (
		<section className="py-20">
			<div className="container mx-auto">
				<Heading text={"Top Skills"} />
				<div className="flex flex-wrap -ml-2">
					{skills.map((skill: string, index: number) => {
						return (
							<div className={`inline-flex px-4 py-1 ml-2 mt-2 rounded text-white bg-sky-500`} key={`skill-${skill}`}>
								{skill}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
