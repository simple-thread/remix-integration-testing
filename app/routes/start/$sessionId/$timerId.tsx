import type { Session, Timer } from "@prisma/client";
import { useCallback, useState } from "react";
import { redirect } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import { Form, json, useLoaderData } from "remix";
import { useTimer } from "~/hooks/useTimer";
import { getSession } from "~/models/session.server";
import { getTimer } from "~/models/timer.server";
import { db } from "~/db.server";
import { useSound } from "~/hooks/useSound";
import ding from "@/public/ding.mp3";

type LoaderData = {
  session: Session;
  timer: Timer;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.sessionId || !params.timerId)
    throw new Response("sessionId or timerId not found", { status: 404 });

  const session = await getSession({ id: params.sessionId });
  const timer = await getTimer({ id: params.timerId });

  if (!timer || !session)
    throw new Response("session or timer not found", { status: 404 });

  return json<LoaderData>({ session, timer }, 200);
};

export default function () {
  const data = useLoaderData<LoaderData>();
  console.log("Rerender");
  const [showNext, setShowNext] = useState(true);
  const [play] = useSound(ding);
  const onEnd = useCallback(() => {
    setShowNext(true);
    play();
  }, [setShowNext, play]);

  const countdown = useTimer(data.timer.length, onEnd);

  return (
    <div>
      <div>{countdown}</div>
      {showNext && (
        <Form method="post">
          <button name="_action" value={1} type="submit">
            Take A Break
          </button>
          <button name="_action" value={0} type="submit">
            Stay Focused
          </button>
        </Form>
      )}
    </div>
  );
}

export const action: ActionFunction = async ({ request, params }) => {
  if (!params.sessionId || !params.timerId)
    throw new Response("sessionId or timerId not found", { status: 404 });

  const formData = await request.formData();
  const type = formData.get("_action");
  // Set last timer as finished and get the other timers for this sessino
  const lastTimer = await db.timer.update({
    where: {
      id: params.timerId,
    },
    data: {
      status: "FINISHED",
    },
    include: {
      session: {
        include: {
          timers: true,
        },
      },
    },
  });

  if (!lastTimer) throw new Response("Timer not found", { status: 404 });

  const oppositeType = lastTimer.type === "FOCUS" ? "EXERCISE" : "FOCUS";
  const timers = lastTimer.session.timers.filter(
    (x) => x.id !== lastTimer.id || x.status === "ACTIVE"
  );
  const oppositeTimers = timers.filter((x) => x.type === oppositeType);
  const sameTimers = timers.filter((x) => oppositeTimers.includes(x));

  switch (type) {
    case "1":
      console.log("Get opposite Timer type");
      return redirect(`/start/${params.sessionId}/${oppositeTimers[0].id}`);
    case "0":
      console.log("Get next same Timer type");
      return redirect(`/start/${params.sessionId}/${sameTimers[0].id}`);
    default:
  }

  return redirect(`/start/${params.sessionId}/${"hello"}`);
};
