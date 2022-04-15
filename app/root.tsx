import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";
import tailwindStylesheet from "./styles/tailwind.css";
import mainStylesheet from "./styles/fonts.css";
import { getUser } from "./auth.server";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: mainStylesheet },
    { rel: "stylesheet", href: tailwindStylesheet },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Uh oh!</h1>
        <h2>
          {caught.status} {caught.statusText}
        </h2>
        <Scripts />
      </body>
    </html>
  );
}
