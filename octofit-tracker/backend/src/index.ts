import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';
import { getApiBaseUrl } from './utils/baseUrl.js';

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    baseUrl: getApiBaseUrl(PORT),
  });
});

app.use('/api', apiRouter);

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`OctoFit Tracker API listening on port ${PORT}`);
    console.log(`API base URL: ${getApiBaseUrl(PORT)}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
