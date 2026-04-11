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
- [Using the Application](#using-the-application)

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

## Using the Application

Despite the slightly complex backend setup involving CORS and rate limiting, the user interface is straightforward. To get started, open the URL above and you'll land on the hero section.

This project uses page sections instead of separate URL-based routes, which keeps the setup simpler and requires less configuration.

In the hero section, you'll find a date picker and a button. Select any date up to today (future dates are not allowed) and press the button with the rocket icon.

When you press that button, the frontend first checks whether that query has been made before. If it has, the cached result is returned from local storage (the 10 most recent requests are stored there). Otherwise, the frontend sends a request to the backend to fetch the "feed". The feed is a single response that bundles everything the backend currently retrieves from the NASA API. This design makes it straightforward to add new API integrations in the future.

While the request is in progress, a small notification appears in the bottom-right corner of the screen. Once the API responds with either data or an error, the notification updates and then fades away.

Once the data is fetched, it is added to the cache if not already present, and the page populates with results. The view then automatically scrolls down to the first content section.

The application currently integrates two NASA APIs:

- **APOD (Astronomy Picture of the Day):** Displays a photo or video along with a description. This API has strict rate limits and can occasionally time out. If that happens, the section is simply not rendered.

- **NEO (Near Earth Objects):** Shows key metrics about near-Earth objects for the selected date, followed by two charts. One compares the top 5 fastest objects and the other plots the velocity versus miss distance for all returned objects. A full data table is displayed at the bottom of this section.

You can also switch the application's theme at any time. The default is light mode, with dark and system (which follows your OS preference) available as alternatives.
