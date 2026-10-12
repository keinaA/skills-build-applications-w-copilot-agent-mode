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
