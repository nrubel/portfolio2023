/** @format */

import { Links, LiveReload, ScrollRestoration, Scripts, Meta } from "@remix-run/react";
import type { FC, PropsWithChildren } from "react";

export const Document: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className={`flex min-h-screen mw-100vw`}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
