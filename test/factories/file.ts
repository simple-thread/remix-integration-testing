import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";
import { ProjectFactory } from "./project";

export const FileFactory = {
  build: (attrs: Partial<Prisma.FileCreateInput> = {}) => {
    return {
      project: {
        create: ProjectFactory.build(),
      },
      ...attrs,
    } as Prisma.FileCreateInput;
  },
  create: async function (attrs: Partial<Prisma.FileCreateInput> = {}) {
    return await prisma.file.create({ data: FileFactory.build(attrs) });
  },
};
