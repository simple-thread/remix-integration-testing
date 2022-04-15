import type { User, Project } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Project } from "@prisma/client";

export function getProject({
  id,
  userId,
}: Pick<Project, "id"> & {
  userId?: User["id"];
}) {
  return prisma.project.findFirst({
    where: { id, userId },
  });
}

export function getProjectListItems({ userId }: { userId: User["id"] }) {
  return prisma.project.findMany({
    where: { userId },
    select: { id: true, name: true },
  });
}

export function createProject({
  name,
  userId,
}: Pick<Project, "name"> & {
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
  return prisma.project.create({
    data: {
      name,
      ...attachUserId,
    },
  });
}

export function deleteProject({
  id,
  userId,
}: Pick<Project, "id"> & { userId: User["id"] }) {
  return prisma.project.deleteMany({
    where: { id, userId },
  });
}
