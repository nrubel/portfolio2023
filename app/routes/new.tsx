/** @format */

import { Link, useRouteLoaderData } from "@remix-run/react";
import type { FC } from "react";
import type { Nav, RootLoader } from "../models/root";
import type { Featured } from "../models/root";

const NewHome: FC = () => {
  const { image, title, skills, featured, socialLinks, navs } = useRouteLoaderData("root") as unknown as RootLoader;

  return (
    <div className={`container mx-auto max-w-6xl px-4 py-10`}>
      <div className={`flex min-h-full -mx-4`}>
        <div className={`basis-1/3 flex flex-col px-4`}>
          <img src={image} alt={title} className={`rounded-full outline outline-4 outline-slate-900 outline-offset-1 w-40`} />
          <h1 className={`text-4xl text-slate-900 mt-4 mb-1`}>Nasir Uddin</h1>
          <h2 className={`text-slate-900 text-base mb-8 leading-3`}>Frontend focused fullStack developer</h2>
          <p className={`text-slate-900 text-sm`}>
            {skills.split(",").map((skill: string) => (
              <em className={`py-1 px-2 leading-3 mr-2 rounded border-slate-700 border inline-block mb-2`} key={`skill-item-${skill}`}>
                {skill.trim()}
              </em>
            ))}
          </p>
          <div className={`h-5 my-auto`} />
          <ul>
            {navs.map((nav: Nav, i: number) => (
              <li key={`nav-item-${i}`}>
                {!!nav.to && (
                  <Link
                    to={nav.to}
                    className={`text-indigo-900 hover:border-b border-blue-700 py-1 hover:text-blue-700 transition-all ease-in-out duration-200`}>
                    {nav.title}
                  </Link>
                )}
                {!!nav.href && (
                  <a
                    href={nav.href}
                    className={`text-indigo-900 hover:border-b border-blue-700 py-1 hover:text-blue-700 transition-all ease-in-out duration-200`}
                    target={"blank"}>
                    {nav.title}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className={`h-5 my-auto`} />
          <ul>
            {socialLinks.map((item) => (
              <li key={`social-link-${item.link}`}>
                <Link
                  to={item.link}
                  className={`text-indigo-900 hover:border-b border-blue-700 py-1 hover:text-blue-700 transition-all ease-in-out duration-200`}
                  target={"blank"}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`basis-2/3 px-4`}>
          <div className={`columns-2 gap-4`}>
            {featured.map((feat: Featured) => (
              <article className={`p-4 shadow-2xl bg-white rounded break-inside-avoid-column mb-5`} key={feat.key}>
                <img src={`/images/${feat.key}.jpeg`} alt={`${feat.title} - Cover`} className={`h-56 w-full object-cover rounded mb-5`} />
                <h2 className={`text-2xl text-slate-800`}>{feat.title}</h2>
                <p className={`text-sm my-2`}>{feat.desc}</p>
                <a href={feat.link}>View</a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHome;
