# Hexlet Chat (Frontend Project 12)

[![Hexlet check](https://github.com/andreikhanau/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/andreikhanau/frontend-project-12/actions/workflows/hexlet-check.yml)

A small Slack-like chat app built with React, TanStack Query, Zustand, React Hook Form, and Bootstrap.

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
- TanStack Query
- Zustand
- React Hook Form
- Bootstrap + React Bootstrap
- Vite
- `@hexlet/chat-server` (API + static server for deployment)

## Project Structure

```text
src/
  assets/          # Images
  components/      # Reusable UI blocks and forms
  pages/           # Route-level pages
  api/             # API request functions and TanStack Query hooks
  stores/          # Zustand stores for auth and UI state
  sockets/         # Socket.IO connection and cache synchronization
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

Open the development app at:

`http://localhost:5002/`

Note: in local dev, Vite proxies `/api` and `/socket.io` to backend `http://localhost:5001` (see `vite.config.js`).  
If backend is not running, auth/messages requests will fail.

## Local Production-Like Run

Build and start the chat server:

```bash
make run
```

Open the production-like app at:

`http://localhost:5001/`

Equivalent commands:

```bash
npm run build
node server.js
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
- Zustand stores auth and UI state.
- TanStack Query caches channels and messages.
- Chat server data is in-memory by default; server restart clears channels/messages
