import { FactoryNames } from "@/test/factories";

export function data(name: string): any {
  return cy.get(`@${name}`);
}

export function resetDB() {
  return cy.task("resetDB");
}

export function factoryTask({
  name,
  type,
  attrs,
}: {
  name: string;
  type: FactoryNames;
  attrs?: Record<string, any>;
}) {
  return cy
    .task<any>("factory", { name, type, attrs })
    .then((object) => object)
    .as(name);
}
