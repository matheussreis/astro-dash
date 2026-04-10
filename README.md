# Astro Dashboard

<p align="center">
  <img
    src="./assets/logo.png"
    alt="Astro Dashboard Logo"
    width="500"
  />
</p>

This project is a simple tool that integrates NASA's APOD (Astronomy Picture of the Day) and NEO (Near Earth Objects) APIs into a fully responsive, modern user interface. It is built on a Node.js backend exposing an Express.js API, paired with a React frontend styled using shadcn and Tailwind CSS.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Project](#running-the-project)

## Prerequisites

- Node.js >= 22.0.0
- A [NASA API key](https://api.nasa.gov/) (free to obtain) or the demo key already included in the `.env.example` files

## Environment Variables

**Backend (`backend/.env`):**

| Variable             | Default                 | Description                                      |
| -------------------- | ----------------------- | ------------------------------------------------ |
| `CLIENT_URL`         | `http://localhost:5173` | URL of the frontend client                       |
| `PORT`               | `3001`                  | Port the backend server listens on               |
| `NASA_BASE_URL`      | `https://api.nasa.gov`  | NASA API base URL                                |
| `NASA_APOD_ENDPOINT` | `/planetary/apod`       | Endpoint for Astronomy Picture of the Day        |
| `NASA_NEO_ENDPOINT`  | `/neo/rest/v1/feed`     | Endpoint for Near Earth Objects feed             |
| `NASA_API_KEY`       | `DEMO_KEY`              | Your NASA API key                                |
| `LOG_LEVEL`          | `info`                  | Logging level (`error`, `warn`, `info`, `debug`) |
| `NODE_ENV`           | `production`            | Node environment (`development`, `production`)   |

**Frontend (`frontend/.env`):**

| Variable          | Default                 | Description               |
| ----------------- | ----------------------- | ------------------------- |
| `VITE_APP_LOCALE` | `en`                    | Application locale        |
| `VITE_SERVER_URL` | `http://localhost:3001` | URL of the backend server |

## Installation

1. Install backend dependencies and copy the env file:

   ```bash
   cd backend && npm install
   cp .env.example .env
   ```

2. Install frontend dependencies and copy the env file:

   ```bash
   cd frontend && npm install
   cp .env.example .env
   ```

## Running the Project

Open two terminal windows and run each service separately.

**Backend:**

```bash
cd backend && npm start
```

**Frontend:**

```bash
cd frontend && npm run dev
```

The frontend will be available at `http://localhost:5173` and will proxy API requests to the backend at the port defined in your `.env`.
