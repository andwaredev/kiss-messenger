import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { auth as authMiddleware } from './middleware';
import routes from './routes';
import swaggerDoc from './swagger.json';
import { catchAll as generalErrHandler, notFound as notFoundErrHandler } from './util/error-handlers';

export const startServer = () => {
  let port = 8080;
  if (process.env.PORT) {
    port = parseInt(process.env.PORT, 10);
  }

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  // Middleware responsible for parsing user from request
  app.use(authMiddleware);

  // Bind all API routes
  app.use('/api', routes);

  // Init error handlers
  app.use(notFoundErrHandler);
  app.use(generalErrHandler);

  app.listen(port, () => {
    console.log(`Server started on port: ${port}.`);
  });
};
