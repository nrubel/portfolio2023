import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Footer, Intro, Skills, WorkExperiences } from "~/components";

export const loader: LoaderFunction = async () => {
	const res = await fetch("https://api.codersrank.io/v2/users/nrubel");
	const workRes = await fetch("https://api.codersrank.io/v2/users/nrubel/work_experiences");
	const personal = await res.json();
	const works = await workRes.json();
	return json({
		avatar_url: personal.avatar_url,
		name: personal.first_name + " " + personal.last_name,
		intro: personal.intro,
		title: "MERN Developer",
		social_links: {
			Github: personal.social_links.github,
			Linkedin: personal.social_links.linkedin,
			Twitter: personal.social_links.twitter,
			"Stack Overflow": "https://stackoverflow.com/users/4237038/nasir-uddin",
			CodersRank: "https://profile.codersrank.io/user/nrubel/",
		},
		skills: [
			"NodeJS",
			"ReactJS",
			"ReduxJS",
			"NextJS",
			"RemixJS",
			"NestJS",
			"ExpressJS",
			"Postgresql",
			"TailwindCSS",
			"Flutter",
			"REST API",
			"GraphQL",
		],
		email: "nasir.rubel99@gmail.com",
		...works,
	});
};

export default function Index() {
	return (
		<div className={`min-h-screen flex flex-col`}>
			<Intro />
			<Skills />
			<WorkExperiences />
			<Footer />
		</div>
	);
}
