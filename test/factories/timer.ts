import type { Prisma } from "@prisma/client";
import { db } from "~/db.server";
import { ProjectFactory } from "./session";

export const TimerFactory = {
  build: (attrs: Partial<Prisma.TimerCreateInput> = {}) => {
    return {
      project: {
        create: ProjectFactory.build(),
      },
      ...attrs,
    } as Prisma.TimerCreateInput;
  },
  create: async function (attrs: Partial<Prisma.TimerCreateInput> = {}) {
    return await db.timer.create({ data: TimerFactory.build(attrs) });
  },
};
