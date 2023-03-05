/** @format */

import { Link, useLoaderData } from "@remix-run/react";
import type { FC } from "react";

export const Intro: FC = () => {
  const data = useLoaderData();

  return (
    <section className='bg-sky-50 py-20'>
      <div className='container mx-auto px-5'>
        <div className='flex lg:space-x-10 items-center flex-col lg:flex-row text-center lg:text-left'>
          <div className='basis-1 lg:basis-3/4 order-2 lg:order-1'>
            <h2 className='text-lg leading-4'>{data.title}</h2>
            <h1 className={`font-bold text-3xl mt-2 mb-3`}>{data.name}</h1>
            <p className='text-sm'>{data.intro}</p>
            <Link
              target={"blank"}
              to='./Nasir_Resume.pdf'
              className='py-2 px-4 mt-3 text-white rounded-md bg-sky-500 hover:bg-sky-800 transition-all duration-200 ease-linear inline-flex'>
              Download my resume
            </Link>
          </div>
          <div className='basis-1 lg:basis-1/4 order-1 lg:order-2 mb-10 lg:mb-0'>
            <figure>
              <img src={data.avatar_url} alt={data.name} className={`rounded border-4 border-sky-400`} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
