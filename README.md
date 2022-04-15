# Swolmodoro

Stay focused. Keep movin'.

## Development

- Install OS Dependencies:

  ```sh
  brew install docker
  brew install tmux
  brew install overmind
  ```

- Install Project dependencies:

  ```sh
  nvm i # install .nvmrc specified version of Node
  npm i
  ```

- Initial setup

  ```sh
  npm run setup # Run Remix postinstall scripts
  npm run db:up # Setup the database
  npm run db:migrate # Migrate the dev and test databases
  npm run db:seed # (Optional) Seed the database with a default user
  ```

- Validate the app has been set up properly (optional):

  ```sh
  npm run validate
  ```

- Start the `Procfile`:

  ```sh
  overmind start
  ```

- [Visit the app locally](http://localhost:3000), [open Storybook](http://localhost:6006), and the [Prisma Studio](http://localhost:7777)

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `drew@drew.com`
- Password: `password`

## Scripts

```sh
npm run db:down # Stop the docker container running the postgres db
```

```sh
npm run db:teardown # Stop the docker container and delete the local db files
```

```sh
npm run test # Run tests with vitest
```

## Deployment

This Remix Stack comes with two GitHub Actions that handle automatically deploying your app to production and staging environments.

Prior to your first deployment, you'll need to do a few things:

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

- Sign up and log in to Fly

  ```sh
  fly auth signup
  ```

- Create two apps on Fly, one for staging and one for production:

  ```sh
  fly create swolmodoro-1454
  fly create swolmodoro-1454-staging
  ```

- Create a new [GitHub Repository](https://repo.new)

- Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.

- Add a `SESSION_SECRET` to your fly app secrets, to do this you can run the following commands:

  ```sh
  fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app swolmodoro-1454
  fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app swolmodoro-1454-staging
  ```

  If you don't have openssl installed, you can also use [1password](https://1password.com/generate-password) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

- Create a database for both your staging and production environments. Run the following:

  ```sh
  fly postgres create --name swolmodoro-1454-db
  fly postgres attach --postgres-app swolmodoro-1454-db --app swolmodoro-1454

  fly postgres create --name swolmodoro-1454-staging-db
  fly postgres attach --postgres-app swolmodoro-1454-staging-db --app swolmodoro-1454-staging
  ```

  Fly will take care of setting the DATABASE_URL secret for you.

Now that every is set up you can commit and push your changes to your repo. Every commit to your `main` branch will trigger a deployment to your production environment, and every commit to your `dev` branch will trigger a deployment to your staging environment.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## Testing

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `test` directory. As you make changes, add to an existing file or create a new file in the `test/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

We have a utility for testing authenticated features without having to go through the login flow:

```ts
cy.login();
// you are now logged in as a new user
```

We also have a utility to auto-delete the user at the end of your test. Just make sure to add this in each test file:

```ts
afterEach(() => {
  cy.cleanupUser();
});
```

That way, we can keep your local db clean and keep your tests isolated from one another.

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
