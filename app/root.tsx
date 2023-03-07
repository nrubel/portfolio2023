/** @format */

import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const meta: MetaFunction = () => {
  const title = `Nasir Uddin - Frontend-focused MERN Developer`,
    description = `Javascript/Typescript-based React developer. Remix is my favorite frontend framework also love to work with NextJS. MongoDB & PostgreSQL with Prisma ORM fan. I am a front-end-focused full-stack developer. I am skilled in Flutter, React, Firebase, WordPress, MongoDB, PostgreSQL, Remix, NextJS, also many other stacks.`,
    keywords = `JS, javascript, typescript, TS, js, ts, remix.run, nextjs, remix, wordpress, firebase, flutter, dart, Nasir Uddin, Nasir, Uddin, Mohammad, nasir, postgres, postgresql, mongodb, mongo, db, supabase, frontend, html, css, html5, css3, jquery, prisma, sequelize, typeorm, orm, framework, mysql, indexdb, sqlite, google, remofig, remote config, database, messaging, message, socket, socket.io, chat, github, nrubel, linkedin, kishor001, nasiruddin`,
    url = `https://nasiruddin.dev`,
    image = `https://avatars.githubusercontent.com/u/6053535?v=4`;

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
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
