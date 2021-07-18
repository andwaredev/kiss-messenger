import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { startServer } from './app';

dotenv.config();

createConnection().then(async () => {
  startServer();
});
