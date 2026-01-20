# TP CI/CD

A Node.js application providing a simple greeting service with a REST API. It includes a server built with Express, greeting logic, and comprehensive test
## Overview

- Runtime: Node.js (engine >= 22.19.0)
- Frameworks/libraries: `express`, `axios`, `supertest`
## Architecture

- `src/greeting.js`: Pure function `getGreeting(name)` that returns the greeting string. Behavior:
  - When `name` is truthy (non-empty string), returns `Hello world! From <name>`.
  - For falsy values (undefined, null, `""`, `0`), it returns `Hello world!`.
- `src/server.js`: Express app exposing two routes and exported as `module.exports = app` so tests can mount it directly. When run as a process it listens on `process.env.PORT || 3000`.
- Tests:
  - Unit tests: `tests/unit` — exercise `getGreeting` behavior.
- Docker & CI: `Dockerfile`, `Dockerfile.test`, `docker-compose.yml` and `.github/workflows/ci.yml` build containers, run tests and lint in CI.

## Endpoints
All endpoints return a `200` status and a plain-text response body containing the greeting.

- `GET /hello`  
  - Response: `Hello world!`
- `GET /hello/:name`  
  - Path param: `name` (URL-decoded).  
  - Example: `GET /hello/Alice` => `Hello world! From Alice`  
- `POST /hello`  
  - Reads header `x-name`. If present and non-empty, returns `Hello world! From <value>`. Otherwise returns `Hello world!`.
  - Example header: `x-name: Bob` => `Hello world! From Bob`
Notes on error/edge handling:
- The current implementation treats falsy values (`null`, `undefined`, empty string, `0`) as "no name" except when a path parameter is provided — path parameters are strings derived from the URL and `"0"` is a valid name. Tests have been added to cover these cases.

## Running locally
## Testing & Linting

Run all tests:

```bash
Run subsets:

```bash
npm test -- tests/unit/
npm test -- tests/integration/
npm test -- tests/e2e/
```

Linting:
## Docker & CI

- CI: See `.github/workflows/ci.yml` — the workflow builds containers with `docker compose up --build`, runs tests and lint inside containers, and publishes test artifacts.
- Local compose usage: `docker compose up --build` will build and run the defined services (see `docker-compose.yml`).

## Project structure
- `src/` — application code (`greeting.js`, `server.js`)
- `tests/unit/`, `tests/integration/`, `tests/e2e/` — test suites
- `Dockerfile`, `Dockerfile.test`, `docker-compose.yml` — container setup
- `.github/workflows/ci.yml` — CI pipeline
- `package.json` — scripts and dependencies

## Contributing
1. Fork the repo
2. Create a feature branch
3. Run tests and linting
4. Submit a pull request

---
Updated: expanded architecture and endpoint documentation.
# TP CI/CD

A Node.js application providing a simple greeting service with a REST API. It includes a server built with Express, greeting logic, and comprehensive test
suites (unit, integration, and end-to-end).

## Features

- **Greeting Functionality**: Generates personalized greetings via `src/greeting.js`.
- **REST API Server**: Built with Express in `src/server.js`, supporting GET and POST endpoints for greetings.
- **Testing**: Full test coverage with Jest:
  - Unit tests in `tests/unit/greeting.test.js`.
  - Integration tests in `tests/integration/app.test.js`.
  - End-to-end tests in `tests/e2e/e2e.test.js`.
- **Linting**: Configured with ESLint (via `.eslintrc.js` and `.eslintignore`).
- **Node.js Version Management**: Uses `.nvmrc` to specify Node.js v22.19.0.

## Prerequisites

- Node.js ≥22.19.0 (use `.nvmrc` with nvm: `nvm use`).
- npm (included with Node.js).

## Installation

1. Fork the repository:
2. Install dependencies:

```
npm install
```

## Usage

Start the server:

```
npm start
```

The server runs on port 3000 (or `process.env.PORT`). Endpoints:

- `GET /hello/:name?`: Returns a greeting (e.g., "Hello world!" or "Hello world! From [name]").
- `POST /hello`: Expects `x-name` header for the name.

## Testing

Run tests with Jest:

- All tests: `npm test`
- Unit tests: `npm test -- tests/unit/`
- Integration tests: `npm test -- tests/integration/`
- E2E tests: `npm test -- tests/e2e/`

## Linting

Check code quality:

```
npm run lint
```

## Project Structure

- `src/greeting.js`: Core greeting logic.
- `src/server.js`: Express server setup.
- `tests/`: Test suites (unit, integration, e2e).
- `.eslintrc.js`: ESLint configuration.
- `.eslintignore`: Files/directories excluded from linting.
- `.nvmrc`: Node.js version specification.
- `package.json`: Project metadata, dependencies, and scripts.

## Dependencies

- **Runtime**: Express (web server), Axios (HTTP client), Supertest (testing utility).
- **Dev**: ESLint (linting), Jest (testing).

## Contributing

1. Fork the repo.
2. Create a feature branch.
3. Run tests and linting.
4. Submit a pull request.
