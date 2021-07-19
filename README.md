# 💋 kiss-messenger

Keep It Simple, Stupid Messenger

## Getting Started

#### Node.js

This project was built using [Node.js](https://nodejs.org/en/) (among other things). If you don't yet have Node.js installed on your machine, you can find and install the Latest LTS version [here](https://nodejs.org/en/download/).

Once you've installed Node.js, we'll get started by installing all necessary dependencies.

You can do this running the following command from the root directory of this project:

```bash
yarn install
```

Or simply:

```bash
yarn
```

**New to [yarn](https://classic.yarnpkg.com/lang/en/)? Check out their [getting started guide](https://classic.yarnpkg.com/en/docs/getting-started).**

#### Using NPM

Though this project was built with [yarn](https://classic.yarnpkg.com/lang/en/) (v1.x), you are more than welcome to use [npm](https://docs.npmjs.com/about-npm), if you'd prefer!.

For the sake of consistency, this documentation will continue to use yarn commands, but generally, you can substitute `yarn X` with `npm run X`. Your mileage may vary!

### Database Setup

For the sake of simplicity, this project uses a simple in-memory [SQLite](https://www.sqlite.org/index.html) database.

_The beauty of this database is that you don't need to install anything beyond the [sqlite3](https://www.npmjs.com/package/sqlite3) package which you should have already along with all dependencies._

You can create and seed this database with some dummy data by invoking the following:

```bash
yarn db:migrate
```

### Running the API

Now you're ready to actually run this thing!

To start up the API server locally, run the following:

```bash
yarn start
```

When the server is running, you should see a `console` message notifying with the open port number.

## API Documentation

This project uses the [OpenAPI Specification](https://swagger.io/specification/) and [Swagger UI](https://swagger.io/tools/swagger-ui/) to provide clear API documentation and allow for easily interacting with the API itself.

To view the documentation and use Swagger UI, you can visit `/swagger-ui` in a browser.

When running the API server locally, this will be available at http://localhost:8080/swagger-ui.

If you'd prefer to view the Swagger Doc itself, you can find that at `src/swagger.json`.

## Development

This project uses [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to enforce code style and format standards.

To run theses linters, simply run:

```bash
yarn lint
```

You can also invoke a specific linter with:

```bash
yarn lint:eslint
yarn lint:prettier
```

### Testing

#### Unit Tests

The source code has been unit tested using [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/).

You can run the unit tests with:

```bash
yarn test:unit
```

You can run the test suite in "watch" mode with:

```bash
yarn test:unit:watch
```

#### Integration Tests

High-level HTTP integration tests are written with [SuperTest](https://www.npmjs.com/package/supertest).

These tests live inside the `test/integration` directory.

You can invoke the integration tests alone with:

```bash
yarn test:integration
```

You can run the integration tests in "watch" mode with:

```bash
yarn test:integration:watch
```

Finally, you can run both the unit and integration tests with:

```bash
yarn test
```

### Database Migrations

This project uses [TypeORM](https://typeorm.io) and [SQLite](https://www.sqlite.org/index.html).

To add or modify existing data models, check out the `src/data/entities` directory. Here, you can modify an existing [Entity](https://typeorm.io/#/entities) or create a new one.

When you're done, you'll want to create a new migration file to capture your changes. You can do this with:

```bash
yarn db:migrate:gen -n "desired-name-of-new-migr-file"
```

From here, run `yarn db:migrate` to execute the migration, and you should be on your way.

#### Coverage Reports

Code coverage reporting is configured using [nyc](https://www.npmjs.com/package/nyc) from [Instanbul](https://istanbul.js.org/).

You can generate and view a coverage report with:

```bash
yarn test:coverage
```

### Environment Variables

You'll find an `.env.example` file in the root directory, containing a template for setting app environment variables.

You can copy this file into a new file named `.env`, then assign values to the properties you'd like to customize.

For example, set `PORT=8000`, then restart the API server. You should see the server running on your newly assigned port!

_For the purpose of keeping this project lightweight and easy-to-run, all of these properties will have defaults hardcoded as well, so you don't need to touch this file unless you'd like to!_

## Additional Reading

Below, you'll find a collection of resources for digging deeper into different areas of this project and the tools it leverages.

### Tech

This project was built using [Node.js](https://nodejs.org/en/) and [Typescript](https://www.typescriptlang.org/), among other things. This list aims to capture major tools used in this project, and provide some resource(s) for learning more.

- [Express](https://expressjs.com/)
  - Node.js minimalist web framework
  - Makes creating APIs with node a breeze and is one of the industry leaders for its robust community and catalog of middleware plugins.
  - Express middleware:
    - [CORS](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- Much more...

### Future Improvement

If only I had more time...

I've captured a few future enhancements and things I would have liked to get to in the [Issues](https://github.com/andwaredev/kiss-messenger/issues) of this GitHub repo.
