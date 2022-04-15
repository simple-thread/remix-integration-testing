import type { Session, Timer } from "@prisma/client";

import { db } from "~/db.server";

export type { Timer } from "@prisma/client";

export function getTimer({
  id,
  sessionId,
}: Pick<Timer, "id"> & {
  sessionId?: Session["id"];
}) {
  return db.timer.findFirst({
    where: { id, sessionId },
    include: {
      session: {
        include: {
          timers: true,
        },
      },
    },
  });
}

export function getTimerListItems({ sessionId }: { sessionId: Session["id"] }) {
  return db.timer.findMany({
    where: { sessionId },
    select: { id: true },
  });
}

export function createTimer({
  length,
  sessionId,
  type,
}: Pick<Timer, "length" | "type"> & {
  sessionId?: Session["id"];
}) {
  return db.timer.create({
    data: {
      length,
      type,
      session: {
        connect: {
          id: sessionId,
        },
      },
    },
  });
}

export function deleteTimer({
  id,
  sessionId,
}: Pick<Timer, "id"> & { sessionId: Session["id"] }) {
  return db.timer.deleteMany({
    where: { id, sessionId },
  });
}
