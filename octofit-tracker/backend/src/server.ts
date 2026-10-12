import express from 'express';
import { connectDatabase } from './config/database.js';
import { activity } from './models/activity.js';
import { leaderboard } from './models/leaderboard.js';
import { team } from './models/team.js';
import { user } from './models/user.js';
import { workout } from './models/workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const allowedOrigins = new Set(['http://localhost:5173', 'http://127.0.0.1:5173']);

if (codespaceName) {
  allowedOrigins.add(`https://${codespaceName}-5173.app.github.dev`);
}

app.use((request, response, next) => {
  const origin = request.get('Origin');
  response.vary('Origin');

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.setHeader('Access-Control-Max-Age', '600');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(origin && !allowedOrigins.has(origin) ? 403 : 204);
    return;
  }

  next();
});
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await user.find().populate('team').lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await team.find().populate('members').lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await activity.find().populate('user').lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await leaderboard.find().sort({ rank: 1 }).populate('user team').lean());
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await workout.find().populate('recommendedFor').lean());
});

async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
}

void startServer().catch((error: unknown) => {
  console.error('Error starting OctoFit API:', error);
  process.exitCode = 1;
});
