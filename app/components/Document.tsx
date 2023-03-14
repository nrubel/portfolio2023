/** @format */

import { Links, LiveReload, ScrollRestoration, Scripts, Meta } from "@remix-run/react";
import type { FC, PropsWithChildren } from "react";
import { useShouldHydrate } from "remix-utils";

export const Document: FC<PropsWithChildren> = ({ children }) => {
  let shouldHydrate = useShouldHydrate();

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
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
