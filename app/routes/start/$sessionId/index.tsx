import { redirect, useCatch } from "remix";
import type { LoaderFunction } from "remix";
import { getSession } from "~/models/session.server";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.sessionId) throw new Response("No sessionId", { status: 404 });
  const session = await getSession({ id: params.sessionId });
  if (!session) throw new Response("No Session found", { status: 404 });
  const nextTimer = session.timers.find((x) => x.status === "ACTIVE");
  // Take user to next active timer
  return redirect(`/start/${session.id}/${nextTimer?.id}`);
};

export default function () {
  return <></>;
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
      </head>
      <body>
        <h1>Uh oh!</h1>
        <h2>
          {caught.status} {caught.statusText}
        </h2>
      </body>
    </html>
  );
}
