import { User } from "@prisma/client";

export function login() {
  cy.factory({ name: "authUser", type: "User" }).then((user: User) => {
    cy.task<string>("setupUserSession", user).then((sessionToken) => {
      cy.setCookie("__session", sessionToken);
    });
  });
  return cy.get("@authUser");
}

export function user() {
  return cy.get<User>("@authUser");
}
