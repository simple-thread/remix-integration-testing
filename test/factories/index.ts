import { FileFactory } from "./file";
import { ProjectFactory } from "./project";
import { UserFactory } from "./user";

export const Factories: Record<string, any> = {
  Project: ProjectFactory,
  File: FileFactory,
  User: UserFactory,
};

export type FactoryNames = "Project" | "File" | "User";
