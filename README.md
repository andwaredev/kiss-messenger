# kiss-messenger

Keep It Simple, Stupid Messenger

## Getting Started

First things first, we'll get started by installing all necessary dependencies.

You can do this running the following command from the root directory of this project:

```bash
yarn install
```

Or simply:

```bash
yarn
```

**New to [yarn](https://yarnpkg.com/)? Check out their [getting started guide](https://yarnpkg.com/getting-started).**

#### Using NPM

Though this project was built with [yarn](https://yarnpkg.com/), you are more than welcome to use [npm](https://www.npmjs.com/), if you'd prefer!.

For the sake of consistency, this documentation will continue to use yarn commands, but generally, you can substitue `yarn X` with `npm run X`. Your mileage may vary!

### Running the API

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

### Environment Variables

You'll find an `.env.example` file in the root directory, containing a template for setting app environment variables.

You can copy this file into a new file named `.env`, then assign values to the properties you'd like to customize.

For example, set `PORT=8000`, then restart the API server. You should see the server running on your newly assigned port!

_For the purpose of keeping this project lightweight and easy-to-run, all of these properties will have defaults hardcoded as well, so you don't need to touch this file unless you'd like to!_

## Additional Reading

Below, you'll find a collection of resources for digging deeper into different areas of this project and the tools it leverages.

### Tech

This project was built using [Node.js](https://nodejs.org/en/) and [Typescript](https://www.typescriptlang.org/), amongst other things. This list aims to capture major tools used in this project, and provide some resource(s) for learning more.

- [Express](https://expressjs.com/)
  - Node.js minimalist web framework
  - Makes creating APIs with node a breeze and is one of the industry leaders for its robust community and catalog of middleware plugins.
  - Express middleware:
    - [CORS](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
