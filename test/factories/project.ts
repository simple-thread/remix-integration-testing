import faker from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export const ProjectFactory = {
  build: (attrs: Partial<Prisma.ProjectCreateInput> = {}) => {
    return {
      name: faker.commerce.product(),
      ...attrs,
    } as Prisma.ProjectCreateInput;
  },
  create: async function (attrs: Partial<Prisma.ProjectCreateInput> = {}) {
    return await prisma.project.create({ data: ProjectFactory.build(attrs) });
  },
};
