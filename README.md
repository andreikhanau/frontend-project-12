# Hexlet Chat (Frontend Project 12)

A small Slack-like chat app built with React, Redux Toolkit (RTK Query), Formik, and Bootstrap.

Live demo: https://frontend-project-12-bkd7.onrender.com/

## Features

- Authentication (`/login`, `/signup`)
- Protected main chat page
- Channels list with active channel selection
- Add new channel via modal
- Send messages to active channel
- Message list grouped by channel
- Auto-refresh for channels/messages (polling + refetch on focus/reconnect)

## Tech Stack

- React 19
- React Router
- Redux Toolkit + RTK Query
- React Redux
- Formik
- Bootstrap + React Bootstrap
- Vite
- `@hexlet/chat-server` (API + static server for deployment)

## Project Structure

```text
src/
  assets/          # Images
  components/      # Reusable UI blocks and forms
  pages/           # Route-level pages
  store/           # Redux store, auth slice, RTK Query API
  styles/          # Global styles
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run frontend in dev mode:

```bash
npm run dev
```

Frontend runs on `http://localhost:5002`.

Note: in local dev, Vite proxies `/api` and `/socket.io` to backend `http://localhost:5001` (see `vite.config.js`).  
If backend is not running, auth/messages requests will fail.

## Local Production-Like Run

Build and serve static app:

```bash
make run
```

Equivalent commands:

```bash
npm run build
npx start-server -s ./dist
```

## NPM Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - build production bundle into `dist/`
- `npm run preview` - preview built bundle
- `npm run lint` - run ESLint

## Deployment (Render)

This project is configured as a **Node Web Service** via `render.yaml`.

Current setup:

- Build command: `npm install --include=dev && npm run build`
- Start command: `npx start-server -s dist -a 0.0.0.0 -p $PORT`

Important:

- Service type must be `web` with `env: node`
- Do not use static site mode for this setup

## Auth/Data Notes

- Auth token and username are stored in `localStorage`
- Redux store keeps:
  - `auth` state (token, username, auth flag)
  - RTK Query API cache (channels/messages and request states)
- Chat server data is in-memory by default; server restart clears channels/messages
