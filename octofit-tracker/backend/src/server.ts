import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const PORT = 8000;

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    baseUrl: getApiBaseUrl(),
  });
});

app.use('/api', apiRouter);

export async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`OctoFit Tracker API listening on port ${PORT}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
}

export default app;