# Remix Integration Testing Example

This is a fork of a project I've been working on creating a pomodoro timer app.

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
