/** @format */

import type { RootLoader } from "~/models/root";

export const basicData: RootLoader = {
  title: `Nasir Uddin - Frontend-focused MERN Developer`,
  description: `Javascript/Typescript-based React developer. Remix is my favorite frontend framework also love to work with NextJS. MongoDB & PostgreSQL with Prisma ORM fan. I am a front-end-focused full-stack developer. I am skilled in Flutter, React, Firebase, WordPress, MongoDB, PostgreSQL, Remix, NextJS, also many other stacks.`,
  keywords: `JS, javascript, typescript, TS, js, ts, remix.run, nextjs, remix, wordpress, firebase, flutter, dart, Nasir Uddin, Nasir, Uddin, Mohammad, nasir, postgres, postgresql, mongodb, mongo, db, supabase, frontend, html, css, html5, css3, jquery, prisma, sequelize, typeorm, orm, framework, mysql, indexdb, sqlite, google, remofig, remote config, database, messaging, message, socket, socket.io, chat, github, nrubel, linkedin, kishor001, nasiruddin`,
  skills: `JavaScript, TypeScript, React, Remix, NextJS, Flutter, Express, NestJS, MongoDB, PostgreSQL, Firebase, REST API, GraphQL, Microservice,  Dart, socket.io, Prisma, TypeORM`,
  url: `https://nasiruddin.dev`,
  image: `/images/nasir-uddin.jpg`,
  navs: [
    { title: "My experiences", to: `/experiences` },
    { title: `My Resume`, href: `/Nasir_Resume.pdf` },
  ],
  featured: [
    {
      key: `flyhub-hrms`,
      title: `Flyhub HRMS`,
      desc: `The is a web based admin panel for human resource management system for Flyhub. The system was build with ReactJS+Typescript+ViteJS+Redux for frontend and ExpressJS+MongoDB+Mongoose for Rest API. Both frontend and backend was made by me and its still growing with new features.`,
      link: `https://app.hrms.flyhub.com`,
    },
    {
      key: `flyhub-faces`,
      title: `Faces of Flyhub`,
      desc: `Faces of Flyhub is a platform containing some employee profiles. I build its front with ReactJS+Vite and backend with express and MongoDB. Here is a profile of my team member.`,
      link: `https://faces.flyhub.com/46482d42442d41303435`,
    },
    {
      key: `flyhub-app-showcase`,
      title: `Flyhub Apps Showcase`,
      desc: `I build the website with ReactJS to showcase flyhub's apps. Also, make an express-based backend system to update data.`,
      link: `https://apps.flyhub.com`,
    },
    {
      key: `flyhub-b2b-app-uae`,
      title: `Flyhub Agents UAE`,
      desc: `A UAE-based agent mobile application of Flyhub that has been developed by me and the team.`,
      link: `https://apps.flyhub.com/b2b`,
    },
  ],
  socialLinks: [
    { title: `<>gh://nrubel</>`, link: `https://github.com/nrubel` },
    { title: `<>fb://kishor001</>`, link: `https://fb.me/kishor001` },
    { title: `<>tw://nrubel</>`, link: `https://twitter.com/nrubel` },
    { title: `<>ln://nasir-uddin</>`, link: `https://linkedin.com/nasir-uddin` },
  ],
};
