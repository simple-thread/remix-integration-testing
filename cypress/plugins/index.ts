/// <reference types="cypress" />

// import 'cypress';
import type { FactoryNames } from "@/test/factories";
import { Factories } from "@/test/factories";
import { truncateDB } from "@/test/helpers/truncateDB";
import { setupUserSession } from "./authentication";

declare global {
  // eslint-disable-next-line
  namespace Cypress {
    interface Chainable<Subject = any> {
      task<T>(
        event: string,
        arg?: any,
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<T>;
    }
  }
}

/**
 * @type {Cypress.PluginConfig}
 */
export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  const isDev = config.watchForFileChanges;
  const port = process.env.PORT ?? (isDev ? "3000" : "8811");
  const configOverrides: Partial<Cypress.PluginConfigOptions> = {
    baseUrl: `http://localhost:${port}`,
    video: !process.env.CI,
    screenshotOnRunFailure: !process.env.CI,
  };
  Object.assign(config, configOverrides);

  // To use this:
  // cy.task('log', whateverYouWantInTheTerminal)
  on("task", {
    log(message) {
      console.log(message);
      return null;
    },
    async resetDB() {
      await truncateDB();
      return null;
    },
    async factory({
      name,
      type,
      attrs,
    }: {
      name: string;
      type: FactoryNames;
      attrs?: Record<string, any>;
    }) {
      const Factory = Factories[type];
      if (!Factory) throw new Error(`Factory ${type} not found.`);
      const object = await Factory.create(attrs);
      return object as any;
    },
    setupUserSession,
  });

  return config;
};
