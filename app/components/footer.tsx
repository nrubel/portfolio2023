import { useLoaderData } from "@remix-run/react";
import type { FC } from "react";
import { Heading } from "~/components";

export const Footer: FC = () => {
	const data = useLoaderData();

	return (
		<footer className="py-20">
			<div className="container mx-auto">
				<div className="flex space-x-2 justify-between">
					<div className="basis-1/2">
						<Heading text="Important Links" />
						<div className={`flex space-x-4 justify-between mt-auto`}>
							<div className="flex space-y-1 flex-col">
								{Object.keys(data.social_links).map((item: string, i: number) => (
									<div key={`social-link-${item}`} className="flex space-x-2">
										<div>{item}</div>
										<a href={Object.values(data.social_links)[i] as string} className={`text-sky-500`}>
											{Object.values(data.social_links)[i] as string}
										</a>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="basis-1/3">
						<Heading text="Contact me" />
						<div className="flex space-x-2 w-full">
							<span>Email me at:</span> <a href={`mailto:${data.email}`}>{data.email}</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
