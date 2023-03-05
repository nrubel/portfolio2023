/** @format */

import { useLoaderData, Link } from "@remix-run/react";
import type { FC } from "react";
import { Heading } from "~/components";

export const Footer: FC = () => {
  const data = useLoaderData();

  return (
    <footer className='py-10'>
      <div className='container mx-auto px-5'>
        <div className={`flex flex-wrap justify-center`}>
          {Object.keys(data.social_links).map((item: string, i: number) => (
            <Link
              key={`social-link-${item}`}
              to={Object.values(data.social_links)[i] as string}
              className={`px-4 py-2 my-2 ml-${
                i == 0 ? 0 : 2
              } font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm text-center`}>
              {item}
            </Link>
          ))}
        </div>
        <div className={`flex justify-center`}>
          <a
            href={`mailto:${data.email}`}
            className={`px-4 py-2 m-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm text-center inline-flex items-center`}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={`mr-2`}>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z'
                fill='currentColor'
              />
            </svg>
            E-mail me
          </a>
        </div>
      </div>
    </footer>
  );
};
