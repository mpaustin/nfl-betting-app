# NFL Betting App

Create React App frontend for browsing NFL stats, viewing games, and placing bets against a local betting API service.

## Setup

```sh
npm install
cp .env.example .env
```

Fill in `.env` if you need live external sports data:

- `REACT_APP_MYSPORTSFEEDS_TOKEN`
- `REACT_APP_MYSPORTSFEEDS_PASSWORD`
- `REACT_APP_ODDS_API_KEY`

Values prefixed with `REACT_APP_` are embedded in browser builds. Do not use frontend environment variables for production secrets; proxy sensitive API calls through a backend service.

## Run

```sh
npm start
```

Open http://localhost:3000.

## Verify

```sh
npm run build
```

## Backend

Several betting/profile actions expect a local API at `http://localhost:8080`.
