import 'reflect-metadata';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { startServer } from './app';

dotenv.config();

createConnection().then(() => startServer());
