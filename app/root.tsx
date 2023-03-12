/** @format */

import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { Document } from "./components/Document";
import { basicData } from "./data/basic";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const meta: MetaFunction = () => {
  const { title, description, keywords, url, image } = basicData;
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
