/** @format */

import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { FC, PropsWithChildren } from "react";
import { useShouldHydrate } from "remix-utils";

export const Document: FC<PropsWithChildren> = ({ children }) => {
  let shouldHydrate = useShouldHydrate();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <script
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          dangerouslySetInnerHTML={{
            __html: `(function () {
    var script = document.createElement("script");
    script.async = 1;
    script.src = 'https://tp-em.com/NDAxMjM5.js?t=401239';
    document.head.appendChild(script);
  })();`,
          }}
        />
      </head>
      <body className={`flex min-h-screen mw-100vw flex-col`}>
        {children}
        <ScrollRestoration />
        {shouldHydrate && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
};
