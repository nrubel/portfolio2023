/** @format */

import { useRouteLoaderData } from "@remix-run/react";
import type { FC } from "react";
import type { RootLoader } from "../models/root";

const NewHome: FC = () => {
  const data = useRouteLoaderData("root") as unknown as RootLoader;

  return (
    <div className={`bg-slate-900 min-h-screen mw-100vw`}>
      <div className={`flex justify-center`}>
        <div className={`rounded-3xl border-4 border-white inline-block w-60 p-1`}>
          <img src={data.image} alt={data.title} className={` rounded-3xl`} />
        </div>
      </div>
    </div>
  );
};

export default NewHome;
