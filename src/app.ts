import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { auth as authMiddleware } from './middleware';
import routes from './routes';
import swaggerDoc from './swagger.json';
import { catchAll as generalErrHandler, notFound as notFoundErrHandler } from './util/error-handlers';

export const createApp = () => {
  const app = express();

  // Allow all origins
  app.use(cors());

  // Support application/json parsing
  app.use(express.json());

  // Init Swagger UI and serve
  app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  // Middleware responsible for parsing user from request
  app.use(authMiddleware);

  // Bind all API routes
  app.use('/api', routes);

  // Init error handlers
  app.use(notFoundErrHandler);
  app.use(generalErrHandler);

  return app;
};

export const startServer = () => {
  let port = 8080;
  if (process.env.PORT) {
    port = parseInt(process.env.PORT, 10);
  }

  createApp().listen(port, () => {
    console.log(`Server started on port: ${port}.`);
  });
};
