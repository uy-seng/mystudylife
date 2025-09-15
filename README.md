# Awesome Project Build with TypeORM

mystudylife (clone)

This repository is a personal re-implementation and study of a student productivity app called "mystudylife". The goal of this project is to recreate the application from scratch to learn its architecture, data model, and integration between server and client.

## Demo

Interactive demos of the app (hosted from this repository's `static/` folder):

Login flow demonstration

<video width="720" controls>
	<source src="https://raw.githubusercontent.com/uy-seng/mystudylife/main/static/login.mov" type="video/quicktime">
	Your browser does not support the video tag. Download the login demo: [login.mov](https://raw.githubusercontent.com/uy-seng/mystudylife/main/static/login.mov)
</video>

Main app / calendar demo

<video width="960" controls>
	<source src="https://raw.githubusercontent.com/uy-seng/mystudylife/main/static/demo.mov" type="video/quicktime">
	Your browser does not support the video tag. Download the demo: [demo.mov](https://raw.githubusercontent.com/uy-seng/mystudylife/main/static/demo.mov)
</video>

If the embedded player does not work in your browser, click the links above to download and watch the .mov files.

## Why I cloned this app

- I wanted to study the underlying architecture of a full-stack productivity app tailored for students.
- Recreating the app from scratch is a learning exercise to practice TypeScript, TypeORM, GraphQL, and modern frontend patterns.
- Along the way I fixed or improved several behaviours I found buggy in the original, such as authentication flows and the calendar view.

## Key improvements

- Authentication: improved reliability and clearer session/token handling.
- Calendar view: reworked UI and behaviour inspired by Google Calendar for better day/week navigation and event positioning.

## Architecture overview

- Backend: TypeScript + Express + Apollo Server (GraphQL) with TypeORM for database access.
- Frontend: React (see the `web/` folder) — uses code generation and GraphQL client code in `web/generated`.
- Data model: entities are defined under `src/entity/` (AcademicYear, Class, Subject, Task, Schedule types, etc.).
- Tests: lightweight integration/test helpers are under `test/`.

## Tech stack

- Node.js, TypeScript
- TypeORM (Postgres recommended)
- Apollo Server + GraphQL
- Express
- React (separate `web/` app)

## Quickstart (local development)

1. Install dependencies

```fish
npm install
cd web && npm install # installs frontend deps
```

2. Configure the database

- Edit `ormconfig.json` with your Postgres credentials. A typical `ormconfig.json` is already present — update `username`, `password`, `database`, and any connection options required for your environment.

3. Environment variables

- Create a `.env` file in the project root (the server reads env vars via `dotenv`). Common variables used in the project include:

- PORT — server port (default 4000)
- DATABASE_URL or Postgres host/user/password (as configured in `ormconfig.json`)
- JWT_SECRET — secret used for signing authentication tokens

4. Run the app (dev)

```fish
# starts backend server and frontend concurrently
npm run dev
```

Other useful scripts from `package.json`:

- `npm run server` — runs the backend with nodemon/ts-node
- `npm run web` — runs the frontend dev server (`web/`)
- `npm test` — runs tests

## Database & Migrations

- This project uses TypeORM. There is an `ormconfig.json` file at the repo root. Configure it to point to your Postgres instance.
- If you use TypeORM migrations in your workflow, run the TypeORM CLI or adapt the setup to create the schema before running the server.

## Development notes

- The server entrypoint is `src/index.ts`.
- Entities and domain models are under `src/entity/` grouped by domain (Class, Subject, Task, AcademicYear, Holiday, Exam, User).
- GraphQL schema is defined using `type-graphql` decorators inside the `src/graphql` folder. Resolvers and mutations are organized by domain.
- The frontend is a separate React app in the `web/` folder and is started via `npm run web`.

## Tests

- Jest is configured for backend tests. See `test/` for helpers used to spin up a test DB and run GraphQL queries.
- Run the test suite with:

```fish
npm test
```

## How to contribute / my learning goals

- This repo primarily documents my learning progress. If you want to follow along or reuse parts of the code for your own learning, fork the repo and run it locally.
- If you find issues or want to suggest improvements, open an issue or PR. I may accept changes that improve correctness, tests, or developer experience.

## License

This repository is provided for educational purposes. Check the repository root for any license file or contact the owner for details.

---

Notes: This README was updated to include demo videos from the `static/` folder and to summarize the project's purpose, architecture, and development workflow.
