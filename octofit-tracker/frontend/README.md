# OctoFit Tracker frontend

The React presentation tier uses React Router to navigate between activities,
leaderboard, teams, users, and workout suggestions. It reads collection data
from the Express API on port 8000 and supports both plain arrays and common
paginated response shapes (`results`, `items`, or `data`).

## API configuration

When developing in GitHub Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local` with the name of the Codespace:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite uses this value to request
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. Restart the Vite dev server
after changing `.env.local`. The variable is required to address the API through
the Codespaces URL; if it is unset (for example, during local development), the
frontend safely falls back to `http://localhost:8000`.
