import faker from "@faker-js/faker";
import type { Prisma } from "@prisma/client";
import { db } from "~/db.server";

export const ProjectFactory = {
  build: (attrs: Partial<Prisma.SessionCreateInput> = {}) => {
    return {
      name: faker.commerce.product(),
      ...attrs,
    } as Prisma.SessionCreateInput;
  },
  create: async function (attrs: Partial<Prisma.SessionCreateInput> = {}) {
    return await db.session.create({ data: ProjectFactory.build(attrs) });
  },
};
