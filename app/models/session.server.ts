import type { User, Session } from "@prisma/client";

import { db } from "~/db.server";

export type { Session } from "@prisma/client";

export function getSession({
  id,
  userId,
}: Pick<Session, "id"> & {
  userId?: User["id"];
}) {
  return db.session.findFirst({
    where: { id, userId },
    include: {
      timers: true,
    },
  });
}

export function getSessionListItems({ userId }: { userId: User["id"] }) {
  return db.session.findMany({
    where: { userId },
    select: { id: true, name: true },
  });
}

export function createSession({
  name,
  userId,
}: Pick<Session, "name"> & {
  userId?: User["id"];
}) {
  const attachUserId = userId
    ? {
        user: {
          connect: {
            id: userId,
          },
        },
      }
    : {};
  return db.session.create({
    data: {
      name,
      ...attachUserId,
    },
  });
}

export function deleteSession({
  id,
  userId,
}: Pick<Session, "id"> & { userId: User["id"] }) {
  return db.session.deleteMany({
    where: { id, userId },
  });
}
