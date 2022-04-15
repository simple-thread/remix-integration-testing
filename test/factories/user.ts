import faker from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export const UserFactory = {
  build: (attrs: Partial<Prisma.UserCreateInput> = {}) => {
    return {
      email: faker.internet.email(),
      ...attrs,
    } as Prisma.UserCreateInput;
  },
  create: async function (attrs: Partial<Prisma.UserCreateInput> = {}) {
    return await prisma.user.create({ data: UserFactory.build(attrs) });
  },
};
