import dotenv from 'dotenv';
import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { v4 as uuidV4 } from 'uuid';
import { createServer } from 'http';

dotenv.config({ path: path.resolve(__dirname, 'environments/.env') });

import { AppDataSource, initializeDataBase } from './data-source';
import { domainRouter } from './modules/domain/domain.router';
import { publisherRouter } from './modules/publisher/publisher.router';

const app: Express = express();
const http = createServer(app);
app.use(express.json());
app.use(cors({ origin: '*' }));

// Database Initialization
async function initializeDatabase() {
  try {
    await initializeDataBase();
    await AppDataSource.initialize();
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Routes
function setupRoutes() {
  app.use('/api/publisher', publisherRouter);
  app.use('/api/domain', domainRouter);
}

// Error Handling Middleware
function setupErrorHandling() {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ message: err.message });
  });
}

// Server Initialization
function startServer() {
  const port = process.env.PORT || 9000;
  http.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

// Main Execution
(async () => {
  try {
    await initializeDatabase();
    setupRoutes();
    setupErrorHandling();
    startServer();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
