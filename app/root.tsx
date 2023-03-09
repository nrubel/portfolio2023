/** @format */

import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { Document } from "./components/Document";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const loader: LoaderFunction = () => {
  return json({
    title: `Nasir Uddin - Frontend-focused MERN Developer`,
    description: `Javascript/Typescript-based React developer. Remix is my favorite frontend framework also love to work with NextJS. MongoDB & PostgreSQL with Prisma ORM fan. I am a front-end-focused full-stack developer. I am skilled in Flutter, React, Firebase, WordPress, MongoDB, PostgreSQL, Remix, NextJS, also many other stacks.`,
    keywords: `JS, javascript, typescript, TS, js, ts, remix.run, nextjs, remix, wordpress, firebase, flutter, dart, Nasir Uddin, Nasir, Uddin, Mohammad, nasir, postgres, postgresql, mongodb, mongo, db, supabase, frontend, html, css, html5, css3, jquery, prisma, sequelize, typeorm, orm, framework, mysql, indexdb, sqlite, google, remofig, remote config, database, messaging, message, socket, socket.io, chat, github, nrubel, linkedin, kishor001, nasiruddin`,
    url: `https://nasiruddin.dev`,
    image: `https://avatars.githubusercontent.com/u/6053535?v=4`,
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { title, description, keywords, url, image } = data;
  return {
    charset: "utf-8",
    title,
    viewport: "width=device-width,initial-scale=1",
    "google-site-verification": "o385U9_fOvD_p8aWQVset4NM3pp_VK5OkREvswyZXLc",
    description,
    keywords,
    "og:title": title,
    "og:site_name": title,
    "og:url": url,
    "og:image": image,
    "og:image:alt": title,
    "og:description": description,
    "og:type": `website`,
    "og:locale": `en_US`,
    "og:locale:alternate": [`bn_BD`, "en_BD"],
    "twitter:card": "summary",
    "twitter:title": title,
    "twitter:url": url,
    "twitter:site": "@nrubel",
    "twitter:description": description,
    "twitter:image": image,
  };
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <div className='error-container'>
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
