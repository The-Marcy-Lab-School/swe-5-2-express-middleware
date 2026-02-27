# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use the exact terms and concepts from the lesson.

Your responses will each be evaluated out of 6 points. You can earn 3 points for writing quality and 3 points for the accuracy and precision of the technical content per question.

---

## Question 1: Express vs `node:http`

Express is described as a framework that "wraps" `node:http`. What does that mean? Compare how you would handle a `GET /api/users` request in `node:http` versus in Express. What does Express do for you automatically that you had to write manually before?

**Your answer here**:

---

## Question 2: Endpoints and Controllers

What is the difference between an **endpoint** and a **controller** in Express? In your answer, explain what each one is responsible for, and describe how **query strings** and **route parameters** are different tools for getting information from the client — including how you access each one inside a controller.

**Your answer here**:

---

## Question 3: Middleware

What is **middleware** in Express? How is it similar to a controller, and how is it different? Explain the role of `next()` and describe what would happen to an incoming request if a middleware function never called `next()` and never sent a response.

**Your answer here**:

---

## Question 4: Static Assets and Same-Origin Requests

What are **static assets**, and how does `express.static()` serve them? Then explain why, when the frontend is served by the same Express server as the API, fetch calls in `main.js` can use a relative path like `/api/quotes` instead of a full URL like `http://localhost:8080/api/quotes`.

**Your answer here**:
