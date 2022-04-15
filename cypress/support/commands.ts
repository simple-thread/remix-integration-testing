import { data, factoryTask, resetDB } from "./data";
import { login, user } from "./auth-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in with a random user. Yields the user and adds an alias to the user called authUser
       *
       * @returns {typeof login}
       * @memberof Chainable
       * @example
       *    cy.login()
       * @example
       *    cy.login({ email: 'whatever@example.com' })
       */
      login: typeof login;
      /**
       * Returns the logged in user.
       *
       * @returns {typeof user}
       * @memberof Chainable
       * @example
       *    cy.user()
       */
      user: typeof user;
      /**
       * Creates objects using Prisma factories
       *
       * @returns {typeof factoryTask}
       * @memberof Chainable
       * @example
       *    cy.factory({ name: 'project1', type: 'Project', attrs: {} })
       */
      factory: typeof factoryTask;
      /**
       * Gets objects created from Prisma factories
       *
       * @returns {typeof data}
       * @memberof Chainable
       * @example
       *    cy.data("project1")
       */
      data: typeof data;
      /**
       * Gets objects created from Prisma factories
       *
       * @returns {typeof resetDB}
       * @memberof Chainable
       * @example
       *    cy.resetDB()
       */
      resetDB: typeof resetDB;
    }
  }
}

Cypress.Commands.add("login", login);
Cypress.Commands.add("user", user);
Cypress.Commands.add("factory", factoryTask);
Cypress.Commands.add("data", data);
Cypress.Commands.add("resetDB", resetDB);
/*
eslint
  @typescript-eslint/no-namespace: "off",
*/
