# Quiz Show

A full-stack quiz application with 8 technology topics, multiple difficulty levels, real-time scoring, and analytics. Built as a monorepo with Angular, Express.js, and PostgreSQL.

## Tech Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Frontend | Angular 21, Tailwind CSS 4, TypeScript           |
| Backend  | Express.js, Prisma ORM, Zod validation          |
| Database | PostgreSQL 16                                    |
| Auth     | JWT (httpOnly cookies), bcrypt password hashing  |
| DevOps   | Docker Compose, npm workspaces monorepo          |

## Project Structure

```
packages/
  shared/     # Shared TypeScript types and interfaces
  backend/    # Express.js API server
  frontend/   # Angular SPA
```

## Features

- **8 Quiz Topics** -- React, Angular, TypeScript, System Design, JavaScript, Python, C#, .NET
- **3 Difficulty Levels** -- Easy, Medium, Hard
- **Timed Questions** -- Per-question timer with configurable duration
- **Guest Mode** -- Take quizzes without an account (stats stored in localStorage)
- **User Accounts** -- Register/login to persist quiz history and analytics
- **Analytics Dashboard** -- Track performance by topic and difficulty
- **Leaderboard** -- Global and per-topic rankings
- **1000+ Seeded Questions** -- Comprehensive coverage across all topics

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for PostgreSQL)

### Setup

```bash
# Clone the repository
git clone https://github.com/Vinay-rwt/Quiz-Show.git
cd Quiz-Show

# Install dependencies
npm install

# Start PostgreSQL
docker compose up -d postgres

# Copy environment config
cp .env.example .env

# Run database migrations and seed data
npm run db:migrate
npm run db:seed
```

### Development

```bash
# Start backend (localhost:3001)
npm run dev:backend

# Start frontend (localhost:4200)
npm run dev:frontend
```

### Other Commands

```bash
npm run build        # Build all packages
npm run db:studio    # Open Prisma Studio (localhost:5555)
```

## Environment Variables

See `.env.example` for the full list:

| Variable       | Description                  | Default                  |
| -------------- | ---------------------------- | ------------------------ |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://quizapp:quizapp@localhost:5432/quizapp` |
| `JWT_SECRET`   | Secret for signing JWTs      | *(change in production)* |
| `PORT`         | Backend server port          | `3001`                   |
| `FRONTEND_URL` | Allowed CORS origin          | `http://localhost:4200`  |
| `NODE_ENV`     | Environment mode             | `development`            |

## API Endpoints

| Method | Endpoint               | Description                    | Auth     |
| ------ | ---------------------- | ------------------------------ | -------- |
| POST   | `/api/auth/register`   | Create account                 | No       |
| POST   | `/api/auth/login`      | Login                          | No       |
| POST   | `/api/auth/logout`     | Logout                         | No       |
| GET    | `/api/auth/me`         | Current user                   | Optional |
| GET    | `/api/topics`          | List all topics                | No       |
| GET    | `/api/questions`       | Get questions by topic/difficulty | No    |
| POST   | `/api/quiz/submit`     | Submit quiz answers            | Optional |
| GET    | `/api/analytics/me`    | User statistics                | Yes      |
| GET    | `/api/analytics/history` | Quiz attempt history         | Yes      |
| GET    | `/api/leaderboard`     | Global/topic leaderboard       | No       |
| GET    | `/health`              | Health check                   | No       |

## Security

- Helmet for secure HTTP headers
- Rate limiting on auth and quiz submission endpoints
- Server-side answer validation (client cannot manipulate scores)
- bcrypt password hashing (salt rounds: 12)
- Zod schema validation on all inputs
- 16KB JSON payload limit
