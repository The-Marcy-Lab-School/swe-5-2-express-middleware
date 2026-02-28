# Express and Middleware: Quote Gallery

- [Setup](#setup)
- [Short Response Questions](#short-response-questions)
- [From Scratch](#from-scratch)
  - [What You're Building](#what-youre-building)
  - [Grading](#grading)
  - [Step 1 — Install Dependencies and Start the Server](#step-1--install-dependencies-and-start-the-server)
  - [Step 2 — Add API Endpoints](#step-2--add-api-endpoints)
    - [`GET /api/quotes`](#get-apiquotes)
    - [`GET /api/quotes/:id`](#get-apiquotesid)
    - [Catch-All Fallback](#catch-all-fallback)
  - [Step 3 — Test with `curl`](#step-3--test-with-curl)
  - [Step 4 — Add `logRoutes` Middleware](#step-4--add-logroutes-middleware)
  - [Step 5 — Serve the Frontend with `express.static()`](#step-5--serve-the-frontend-with-expressstatic)
  - [Step 6 — Deploy to Render](#step-6--deploy-to-render)

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy Lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/fullstack-curriculum/how-tos/working-with-assignments#how-to-work-on-assignments).

After cloning your repository, run:

```sh
git checkout -b draft
npm install # installs express dependencies
npm run dev
```

`npm run dev` starts your server with `nodemon`, which automatically restarts whenever you save a file. Your server will be reachable at `http://localhost:8080`.

## Short Response Questions

Short response questions can be found in the `short-response.md` file. Write your responses directly in that file. Do not forget to complete this part of the assignment. There are four questions covering the topics:

1. Express vs `node:http`
2. Endpoints, controllers, query strings, and route parameters
3. Middleware
4. Static assets and same-origin requests

## From Scratch

### What You're Building

You will build an Express server that:

1. **Serves a frontend application** — `index.html`, `main.js`, `fetch-helpers.js`, `dom-helpers.js`, and `style.css` from the `frontend/` folder are already complete. Your server makes them available in the browser.
2. **Exposes an API** with two endpoints that the frontend uses to fetch and display quotes.
3. **Logs every request** using custom middleware.

The frontend is fully implemented. If your server is correct, visiting `http://localhost:8080` will show a working Quote Gallery where you can filter quotes by topic and click any card to see its details.

> **Do not modify the `frontend/` files.** All of your work goes in `server/index.js`.

### Grading

Instead of automated tests, your grade on this assignment will be determined by the number of tasks you are able to complete. Tasks appear as a checkbox, like this:

- [ ] example of an incomplete task
- [x] example of a completed task

Feel free to mark these tasks as complete/incomplete as you go. Your instructor may modify your tasks as complete/incomplete when grading.

This assignment has 17 requirements:

**Server Setup (3 pts)**

- [ ] `express` is imported with `require('express')` and an app is created with `express()`
- [ ] The app listens on port `8080`
- [ ] The server runs without errors

**Middleware (5 pts)**

- [ ] A `logRoutes` middleware function logs the HTTP method, URL, and timestamp for every request
- [ ] `logRoutes` calls `next()` so the request continues to the next handler
- [ ] `logRoutes` is registered with `app.use()` before the route controllers
- [ ] `express.static()` is used to serve files from the `frontend/` directory using an absolute path
- [ ] Visiting `http://localhost:8080` loads the Quote Gallery in the browser

**Endpoints and Controllers (6 pts)**

- [ ] `GET /api/quotes` responds with all 10 quotes as a JSON array
- [ ] `GET /api/quotes?topic=science` (or any valid topic) returns only matching quotes
- [ ] `GET /api/quotes/:id` responds with the single quote whose `id` matches
- [ ] `GET /api/quotes/:id` responds with status `404` and a JSON error when the id has no match
- [ ] All controllers are defined as named arrow functions (not anonymous inline arrow functions)
- [ ] A catch-all fallback responds with status `404` and a JSON error for all unmatched routes

**Deployment (3 pts)**

- [ ] Server code is pushed to a GitHub repository
- [ ] App is deployed on Render as a Web Service
- [ ] The deployed app serves both the frontend and the API correctly at the Render URL

---

### Step 1 — Install Dependencies and Start the Server

> ✅ You will know that you've completed this step when you can run `npm run dev` and see `Server listening on http://localhost:8080` in your terminal.

Your `package.json` already lists `express` as a dependency. Run `npm install` to install it.

Open `server/index.js`. The file already imports `express` and `path`, creates the app, defines the `quotes` array, and calls `app.listen()`. Your job is to fill in the middleware, controllers, and endpoints between those two bookends.

At this point, if you run `npm run dev` and visit `http://localhost:8080`, the browser will hang — the server is running but has no instructions on how to respond. That changes in the next step.

---

### Step 2 — Add API Endpoints

> ✅ You will know that you've completed this step when `curl` commands against your API return the correct data.

Define a named controller function for each endpoint, then register it with the appropriate `app.get()` call.

#### `GET /api/quotes`

Returns the full `quotes` array. When a `?topic=` query string is provided, return only quotes whose `topic` field matches. Express parses query strings automatically — access them via `req.query`.

#### `GET /api/quotes/:id`

Returns the single quote whose `id` matches the route parameter. Access route parameters via `req.params`. Keep in mind that route parameter values are always **strings** — convert to a number before comparing against the numeric `id` field. If no match is found, respond with status `404`.

#### Catch-All Fallback

Add an `app.use()` handler **after** all other routes that responds with status `404` for any unmatched request.

---

### Step 3 — Test with `curl`

> ✅ You will know that you've completed this step when every command below returns the expected output.

With your server running, open a **second terminal tab** and run each command. Use the `-i` flag to see the full response including the status line and headers.

```sh
# All quotes
curl http://localhost:8080/api/quotes

# Filter by topic
curl "http://localhost:8080/api/quotes?topic=science"

# Single quote by id
curl http://localhost:8080/api/quotes/5

# Non-existent quote — should return 404
curl http://localhost:8080/api/quotes/99

# Non-existent route — should return 404
curl http://localhost:8080/api/doesnotexist

# View the full response (status line + headers + body)
curl -i http://localhost:8080/api/quotes/1
```

---

### Step 4 — Add `logRoutes` Middleware

> ✅ You will know that you've completed this step when every `curl` request you send prints a log line to your server terminal.

Define and register a `logRoutes` middleware function that logs the HTTP method, URL, and current timestamp for every incoming request, then calls `next()` to pass the request along to the controllers.

**Where should you register it?** Think about what order makes sense — should it run before or after your route controllers?

> **What happens if `logRoutes` never calls `next()`?** The request hangs indefinitely — the server receives it but never sends a response and never passes it to a controller that could. Every middleware must either call `next()` or send a response.

---

### Step 5 — Serve the Frontend with `express.static()`

> ✅ You will know that you've completed this step when visiting `http://localhost:8080` loads the fully working Quote Gallery in your browser.

The `frontend/` folder contains a complete Vanilla JavaScript application. Use `express.static()` to serve its files without writing a separate controller for each one. Pass it an absolute path to the `frontend/` folder using `path.join()` and `__dirname`, then register the result with `app.use()`.

> **Why an absolute path?** `__dirname` is a Node variable that holds the absolute path of the directory containing the current file. A bare relative path like `'../frontend'` is resolved from the process's working directory, which can vary depending on which directory you start the server from. Using `__dirname` with `path.join()` produces a path that works no matter where the server is started from.

After registering the static middleware, visit `http://localhost:8080`. Because the API endpoints are already in place, the full Quote Gallery should load — cards, topic filter, and detail view all working.

---

### Step 6 — Deploy to Render

> ✅ You will know that you've completed this step when you can share a live Render URL with your instructor and the Quote Gallery loads and works correctly.

**Push your code to GitHub first:**

```sh
git add -A
git commit -m "Complete express and middleware assignment"
git push
```

Then deploy on Render using [these instructions](https://marcylabschool.gitbook.io/marcy-lab-school-docs/mod-5-servers/5-middleware-static-assets#deploying-web-server-to-render). 

In a few minutes your server will be live. Visit the Render URL — you should see the full Quote Gallery just like on localhost.

Any time you commit and push a new change, Render will automatically redeploy your app. This is called **continuous deployment**.
