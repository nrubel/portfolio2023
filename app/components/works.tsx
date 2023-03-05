import { useLoaderData } from "@remix-run/react";
import type { FC } from "react";
import { Heading } from "~/components";

export const WorkExperiences: FC = () => {
	const { work_experiences: works } = useLoaderData();
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const getMonth = (date: string): string => {
		return months[parseInt(date.split("-")[1]) - 1] + ` ` + date.split("-")[0];
	};

	return (
		<section className="bg-sky-50 py-20">
			<div className="container mx-auto">
				<Heading text="Work Experiences" />
				<div className="space-y-8">
					{works.map((work: any, i: number) => {
						return (
							<div key={`work-experience-${i}`} className={`flex space-x-10 pt-${i === 0 ? 0 : 4}`}>
								<div className="basis-1/12">
									{work.company_logo ? (
										<img src={work.company_logo} alt={work.company} width={80} className={`rounded`} />
									) : (
										<div
											className="rounded bg-sky-400 flex justify-center items-center text-5xl text-white"
											style={{ width: 80, height: 80 }}>
											{work.company[0]}
										</div>
									)}
								</div>
								<div className="basis-11/12">
									<div className="flex space-x-2 mb-2 items-center">
										<h2 className="font-bold text-xl leading-3">{work.company}</h2>
										<div className="bg-indigo-400 inline-flex px-2 py-0.5 text-xs leading-3 text-white rounded-full">
											{work.location}
										</div>
										{work.is_current && (
											<div className="bg-indigo-400 inline-flex px-2 py-0.5 text-xs leading-3 text-white rounded-full">
												Current
											</div>
										)}
										{work.is_remote && (
											<div className="bg-red-400 inline-flex px-2 py-0.5 text-xs leading-3 text-white rounded-full">
												Remote
											</div>
										)}
									</div>
									<h2 className="text-base mb-3">
										{getMonth(work.start_date)} to {work.end_date ? getMonth(work.end_date) : "present"}
									</h2>
									<h2 className="text-base font-bold mb-1 leading-4">{work.title}</h2>
									{work.description.split("\n").map((d: string, pi: number) => (
										<p className={`mb-1 text-sm`} key={`work-experience-description-${pi}`}>
											{d}
										</p>
									))}
									<div className={`mt-3 flex space-x-2`}>
										{work.highlighted_technologies.map((tech: string, i: number) => (
											<div
												key={`work_highlighted_technologies_${tech.split(" ").join("_")}_${i}`}
												className="bg-red-400 inline-flex px-2 py-0.5 text-xs leading-3 text-white rounded">
												{tech}
											</div>
										))}
										{work.other_technologies.map((tech: string, i: number) => (
											<div
												key={`work_other_technologies_${tech.split(" ").join("_")}_${i}`}
												className="bg-indigo-400 inline-flex px-2 py-0.5 text-xs leading-3 text-white rounded">
												{tech}
											</div>
										))}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
