import type { FC } from "react";

export const Heading: FC<{ text: string }> = ({ text }) => {
	return <h2 className="font-bold text-2xl mb-5">{text}</h2>;
};

export const Title: FC<{ text: string }> = ({ text }) => {
	return <h2 className="font-bold text-xl mb-2 leading-3">{text}</h2>;
};
