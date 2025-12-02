---
id: express-server-setup
title: Setting Up Your Express Server
type: exercise
description: Initialize a Node project, configure automation scripts, and launch your first Express server.
---

# Setting Up Your Express Server

Over this week you will grow a simple Express project into a well-structured API. Each level maps to a daily assignment, building confidence as you layer on new responsibilities for your routes.

## Why Build an Express Server?

**User Story:** As a developer, I want to initialize my project environment so that I can manage dependencies and start building.

### Project Setup

Before diving into the concepts, let's set up your Express project:

1. **Initialize your project:**
   ```bash
   npm init -y
   ```

2. **Install Express and development dependencies:**
   ```bash
   npm install express
   npm install --save-dev nodemon
   ```

**📖 References:**

  - [Express.js Documentation](https://expressjs.com/)
  - [Express Hello World Example](https://expressjs.com/en/starter/hello-world.html)

## Configure Package.json

**User Story:** As a developer, I want to configure automation scripts so that I can run my server easily in both development and production modes.

### Instructions

3. **Add a dev script to `package.json`:**

Modify your `package.json` to include `"type": "module"` and the start scripts below.

```json:Show Me: npm scripts with nodemon and node
{
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

### Understanding the scripts

- **`npm start`**: Runs your server with Node.js. Use this for production or when you want to run the server once.
- **`npm run dev`**: Runs your server with `nodemon`, which automatically restarts the server whenever you save changes. This speeds up your development workflow.

**ES6 Modules (`"type": "module"`):**

- Setting `"type": "module"` enables ES6 module syntax (`import`/`export`) throughout your project.
- This replaces the older CommonJS `require()` and `module.exports` syntax.
- ES6 modules are the modern standard and provide better static analysis.

## Create Your First Express Server

**User Story:** As a developer, I want to create a basic server file so that I can verify that Express is working correctly.

### Instructions

4. **Create your project structure:**
   - Create a `src` directory.
   - Create `src/index.js` as your main server file.

```javascript:Show Me: Starter Express Server Code
// src/index.js
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

**See:** [Express Hello World Example](https://expressjs.com/en/starter/hello-world.html) for a minimal Express app example.

### Try It!

Now you're ready to start building! Test your server setup:

1. **Start the development server:**

   ```bash
   npm run dev
   ```

   - The server should display "Server listening on port 3000".
   - Open `http://localhost:3000` in your browser.
   - You should see "Hello World!".
   - **Test Hot Reloading:** Change the message in `src/index.js` and save. Notice `nodemon` restarts the server automatically.

2. **Stop the server:** Press `Ctrl+C` in your terminal.

3. **Start the production server:**

   ```bash
   npm start
   ```

   - The server starts the same way, but without auto-restart.
   - Stop the server again (`Ctrl+C`).

> **💡 Tip:** Use `npm run dev` during development for the auto-restart feature, and `npm start` when you want to test the production behavior.

## Understanding HTTP Fundamentals

At the core sits the web server: a program that listens for incoming HTTP requests, processes them, and sends back responses. Requests are structured messages that include a verb (like `GET` or `POST`), a path, headers, and optionally a body.

### Key Concepts

  * **Status Codes:** Communicate the outcome of a request.
      * `200`: OK
      * `201`: Created
      * `400`: Invalid Input
      * `500`: Server Error
      * *Reference:* [http.cat](https://http.cat/)
  * **MIME Types:** Labels response payloads so clients know how to parse them.
      * `text/html`: Full web pages.
      * `application/json`: Structured data.

## Kickoff — Start the Server

**User Story:** As a developer, I want to understand the difference between production and development runtimes so I can work efficiently.

### Node vs Nodemon

  * **`node`**: The runtime itself. Runs once. You must manually restart (Ctrl+C) after changes.
  * **`nodemon`**: A development tool. Watches files and restarts the server automatically on save.

### npm Scripts

In your `package.json`, you have defined two ways to run the server:

1.  **`npm start`**: Uses `node`. Stable, for production.
2.  **`npm run dev`**: Uses `nodemon`. Fast iteration, for development.

### Quick Start

1.  **Start your server:** `npm run dev`
2.  **Verify:** Check terminal for "Server running...".
3.  **Test:** Visit `http://localhost:3000`.
4.  **Auto-restart:** Change a message in your code, save, and watch the terminal to see `nodemon` restart the app.

## Serve HTML First

**User Story:** As a developer, I want to send visual content to the browser to verify my server controls the response body.

### Instructions

Update your root route to use `res.send()` with an HTML snippet.

```javascript:show Me: Serving HTML
// src/index.js
app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1><p>Your server is working!</p>');
});
```

### Digging Deeper: Template Literals

For multi-line HTML, use backticks (`` ` ``) instead of quotes. This allows you to span multiple lines and inject variables using `${variableName}`.

```javascript
// Template literal example
const name = 'Express';
res.send(`
  <h1>Hello ${name}!</h1>
  <p>Your server is working!</p>
`);
```

## Set Up Postman for Testing

**User Story:** As a developer, I want a specialized tool to test API endpoints that browsers cannot easily access.

### Instructions

1.  **Install Postman:** Download the [Postman Desktop App](https://www.postman.com/downloads/).
2.  **Verify Access:** Open Postman and create a new request to `http://localhost:3000`.
3.  **Send Request:** Click "Send" and ensure you see the same response as your browser.

## Serve Static Assets

**User Story:** As a developer, I want to host files like images and CSS so my API can serve a basic frontend.

### Instructions

Use the built-in middleware `express.static` to expose a directory of files.

1.  Create a `public` folder in your project root.
2.  Add a file (e.g., `styles.css`) inside it.
3.  Configure the middleware in `src/index.js`.

<!-- end list -->

```javascript:show Me: Static Assets Middleware
import express from 'express';
const app = express();

// Files in public/ will be accessible at the root URL
app.use(express.static('public'));

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

**Testing:**
Visit `http://localhost:3000/styles.css` in your browser.

## Inspect MIME Types

**Goal:** Observe how Express handles content negotiation automatically.

### Instructions

1.  Use Postman or Browser DevTools to request your static assets.
2.  Inspect the **Headers** of the response.
3.  Find the `Content-Type` header.
      * HTML files should be `text/html`.
      * JSON files should be `application/json`.
      * CSS files should be `text/css`.

## Take Notes

**Goal:** Document your observations for future reference.

### Instructions

1.  Capture screenshots of the `Content-Type` headers in Postman.
2.  Create a short README section or note explaining that Express automatically sets headers based on file extensions.

## Create a JSON Route

**User Story:** As a developer, I want to send structured data to the client so that it can be easily parsed and used by frontend applications.

### Instructions

Create a `GET /happy-birthday` route that returns a JSON object using `res.json()`.

1.  Define the route path.
2.  Construct an object with `name`, `age`, and `greeting`.
3.  Send it back with `res.json`.

<!-- end list -->

```javascript:show Me: Happy Birthday JSON Route
app.get('/happy-birthday', (req, res) => {
  res.json({
    name: 'Alice',
    age: 25,
    greeting: 'Happy Birthday! 🎉'
  });
});
```

**Verify:** Check in Postman that the `Content-Type` header is `application/json`.

## Return Your Favorite JSON

**User Story:** As a developer, I want to model complex data structures so that my API can represent real-world objects with nested properties.

### Instructions

1.  Create a new route (e.g., `GET /favorite`).
2.  Return a JSON object that includes at least one **array** or **nested object**.
3.  Example: A Pokemon with a list of attacks, or a User with an address object.

<!-- end list -->

```javascript:show Me: Nested JSON Example
app.get('/favorite', (req, res) => {
  res.json({
    pokemon: "Bulbasaur",
    stats: {
      height: 0.7,
      weight: 6.9
    },
    attacks: ["Vine Whip", "Seed Bomb"]
  });
});
```

## Mirror a Public API

**User Story:** As a learner, I want to study and replicate existing professional APIs so that I can understand industry standards for data shaping.

### Instructions

1.  Browse the [Public APIs collection](https://github.com/public-apis/public-apis).
2.  Pick an endpoint that interests you.
3.  Add two `GET` routes to your server that mirror the shape of that API's response.
4.  It doesn't need to be exact, but try to capture the structure (field names, nesting, data types).

## Challenge: Echo Workflow ⚡

**User Story:** As a developer, I want to handle incoming data payloads so that my server can accept user input.

### The Task

1.  Add a `POST` endpoint.
2.  Configure your server to accept JSON bodies using `express.json()`.
3.  In the route handler, return (echo) the `req.body` back to the client.

**Success Criteria:**

  * You can send JSON in Postman.
  * You receive the exact same JSON back in the response.

### 💡 Hints

```javascript:show Me: The Echo Route
// Don't forget middleware!
app.use(express.json());

app.post('/echo', (req, res) => {
  console.log('Received:', req.body);
  res.json(req.body);
});
```

## Challenge: Developer Feedback Loop ⚡

**User Story:** As a developer, I want to internalize the server setup process so that I can spin up new projects without relying on tutorials.

### The Task

**Time yourself.**

1.  Delete your current server file (or create a fresh folder).
2.  Rebuild the entire server from scratch:
      * `npm init`
      * Install Express
      * Setup `type: module`
      * Create `app.listen`
      * Create one route
3.  Aim to do this in under 5 minutes.

## Manage Data: Create and Persist

**User Story:** As a developer, I want to understand how data flows through an API before introducing the complexity of a database.

The next series of levels introduces **CRUD** (Create, Read, Update, Delete) using simple **In-Memory Arrays**.

### Why In-Memory?

  * **Focus on Logic:** Master route structure without fighting SQL syntax.
  * **Speed:** No database migrations or connection strings needed.
  * **Training Ground:** The patterns you learn here (validation, finding by ID) are exactly the same when you add a database later.

### Module-Level Globals

We will use a variable declared at the top level of your file to store data. This data persists as long as the server is running but resets when the server restarts.

```javascript:show Me: Module-Level Global Example
import express from 'express';
const app = express();

// 1. Define storage outside the routes
const items = [];

app.post('/items', (req, res) => {
  // 2. Modify storage inside the routes
  items.push(req.body);
  res.status(201).json(req.body);
});
```
## Sketch Your Data Shape

**User Story:** As an architect, I want to define the structure of my data so that I have a clear blueprint to follow while coding my API routes.

### Instructions

1.  **Choose a Resource:** Decide what you are modeling (e.g., `courses`, `books`, `users`).
2.  **Define Fields:** List the properties each record needs (strings, numbers, arrays).
3.  **Draft a Sample:** Write a sample object in JavaScript to use as a reference.
4.  **Constraint:** Do **NOT** use generic names like `items`. Use your specific domain name.

### 💡 Code Hints

```javascript:show Me: Sample Data Structure
const sampleProduct = {
  id: 1,
  title: 'Notebook',
  price: 4.99,
  tags: ['stationery', 'paper'],
  inStock: true
};
```

## Seed In-Memory Data

**User Story:** As a developer, I want to have some initial data loaded so that I can immediately test my API's read operations.

### Instructions

1.  Create an in-memory array to hold a few starter records.
2.  Keep it in the same module as your Express routes for now (module-level global).
3.  Log the data at launch so you can verify the initial state.
4.  **Constraint:** Use your own resource type (e.g., `books`, `courses`, `pets`). Do not use the generic `items`.

<!-- end list -->

```javascript:show Me: Seed Data Array
const booksStorage = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: '1984', author: 'George Orwell' }
];

console.log('Seeded items:', booksStorage);
```

## Build GET Resource

**User Story:** As a client, I want to request a list of all resources so that I can display them to the user.

### Instructions

1.  Add a route that returns the full list with status `200`.
2.  **Note:** Replace `/items` in examples with your chosen resource path (e.g., `/books`).

## Build POST Resource

**User Story:** As a client, I want to add new data to the server so that it is stored for later retrieval.

### Instructions

1.  Create a `POST` route.
2.  Accept a JSON payload from `req.body`.
3.  Append it to your in-memory list.
4.  Return the newly created record with status `201`.

<!-- end list -->

```javascript:show Me: POST Route
// Ensure app.use(express.json()) is active!

app.post('/books', (req, res) => {
  const newBook = req.body;
  
  // Add to storage
  booksStorage.push(newBook);
  
  // Return created item with 201 Created status
  res.status(201).json(newBook);
});
```

### Diving Deeper: Middleware

Without `app.use(express.json())`, `req.body` will be `undefined`. This middleware is required to parse the incoming JSON string into a usable JavaScript object.

**Try it:** Comment out the middleware line, send a POST request via Postman, and log `req.body`. You will see it fails. Uncomment it to fix.

## Enforce Basic Validation

**User Story:** As a developer, I want to validate incoming data so that my application doesn't store incomplete or corrupt records.

### Instructions

1.  Check if required fields are present in `req.body`.
2.  If data is missing, short-circuit the function and return status `400` (Bad Request).

<!-- end list -->

```javascript:show Me: Validation Check
if (!req.body?.title) {
  return res.status(400).json({ error: 'Title is required' });
}
```

**Note:** The `?.` (optional chaining) operator safely checks for `title` even if `req.body` itself is null or undefined.

## Generate Identifiers

**User Story:** As a system, I need to assign unique IDs to every record so that I can reference them individually later.

### Instructions

1.  Import `randomUUID` from `node:crypto`.
2.  When creating a new record in your POST route, generate a new ID.
3.  Add the ID to the object *before* pushing it to the array.

<!-- end list -->

```javascript:show Me: Generate Unique ID
import { randomUUID } from 'node:crypto';

// Inside your POST route
const newBook = { 
  ...req.body, 
  id: randomUUID() 
};

booksStorage.push(newBook);
res.status(201).json(newBook);
```

## Implement GET by ID

**User Story:** As a client, I want to fetch a specific record by its ID so that I can view its details.

### Instructions

1.  Define a route with a parameter: `/resource/:id`.
2.  Use `.find()` to locate the record in your array.
3.  If found, return `200` and the object.
4.  If not found, return `404` with an error message.

<!-- end list -->

```javascript:show Me: Find Item by ID
app.get('/books/:id', (req, res) => {
  const book = booksStorage.find((entry) => entry.id === req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json(book);
});
```

## Implement DELETE by ID

**User Story:** As a client, I want to delete a specific record so that I can remove outdated information.

### Instructions

1.  Define a `DELETE` route: `/resource/:id`.
2.  Check if the item exists (return `404` if not).
3.  Use the **Filter Pattern** to create a new array that excludes the target item.
4.  Replace the global array variable with the new filtered array.

<!-- end list -->

```javascript:show Me: Delete with Filter Pattern
app.delete('/books/:id', (req, res) => {
  const book = booksStorage.find((entry) => entry.id === req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Filter out the item where the ID matches
  booksStorage = booksStorage.filter((entry) => entry.id !== req.params.id);
  
  res.status(200).json({ message: 'Book deleted successfully' });
});
```

## Add Request Logging

**User Story:** As a developer, I want to log every incoming request so that I can monitor server activity and debug issues.

### Instructions

Add a `console.log` statement to the top of your routes to print the method and body.

```javascript:show Me: Request Logging
console.log(`POST /books`, req.body);
```

## Challenge: Persist to Disk ⚡

**User Story:** As a developer, I want my data to be saved to a file so that it persists even if the server crashes or restarts.

### Instructions

1.  **Read on Start:** Use `readFileSync` to load data from a JSON file (e.g., `books.json`) into your array when the server launches.
2.  **Write on Change:** Create a helper function `saveData()` that writes the current array to the disk using `writeFileSync`. Call this function after every `POST` or `DELETE`.

### 💡 Hints

```javascript:show Me: Read Data on Startup
import { readFileSync } from 'node:fs';

const DATA_PATH = './books.json';
let booksStorage = [];

try {
  // Try to read the file if it exists
  const fileData = readFileSync(DATA_PATH, 'utf-8');
  booksStorage = JSON.parse(fileData);
} catch (error) {
  // If file doesn't exist, start with empty array
  booksStorage = [];
}
```

```javascript:show Me: Write Data Helper
import { writeFileSync } from 'node:fs';

function saveBooks() {
  writeFileSync(DATA_PATH, JSON.stringify(booksStorage, null, 2));
}

// Example usage in route
app.post('/books', (req, res) => {
  booksStorage.push(req.body);
  saveBooks(); // <--- Save to disk immediately
  res.status(201).json(req.body);
});
```

## Challenge: Manage Multiple Resources ⚡

**User Story:** As a developer, I want to expand my API to handle different types of data (e.g., Books *and* Authors) to build a more complete application.

### Instructions

1.  **Pick a Second Resource:** If you have `books`, add `authors` or `reviews`.
2.  **Duplicate Logic:** Create a new storage array and new routes (`GET`, `POST`) for this resource.
3.  **Persist It:** Decide if you want a separate JSON file (e.g., `authors.json`) or a single file holding both.

## Challenge: Refine Error Responses ⚡

**User Story:** As a frontend developer consuming this API, I need consistent error messages so I can display meaningful alerts to the user.

### Instructions

1.  **Standardize:** Ensure every error returns the same JSON structure.
2.  **Structure:** Use `{ "error": "Your message here" }`.
3.  **Refactor:** Go back to your validation logic and 404 handlers and update them.

<!-- end list -->

```javascript:show Me: Consistent Error Object
// Bad ❌
res.status(404).send("Not found");

// Good ✅
res.status(404).json({ error: "Book with that ID was not found." });
```

## Checkpoint — Confirm Core Behavior

**Objective:** Verify your API satisfies basic REST expectations before moving to advanced topics.

### Requirements checklist

1.  **GET /resource:** Returns a list (Status `200`).
2.  **POST /resource:** Creates a record and returns it (Status `201`).
3.  **Validation:** Returns `400` if data is missing.
4.  **Not Found:** Returns `404` for invalid IDs.

## Harden — Validate and Handle Errors

**User Story:** As a developer, I want to implement defensive coding practices so that my application doesn't crash or store invalid data when users send bad requests.

### Instructions

1.  **Validate Input:** In your POST routes, check types and required fields. Return `400` immediately if checks fail.
2.  **Centralize Errors:** Create a helper function to send error responses. This keeps your code DRY (Don't Repeat Yourself).
3.  **Optional:** Add middleware to log how long requests take.

<!-- end list -->

```javascript:show Me: Comprehensive Validation
app.post('/items', (req, res) => {
  // 1. Check existence
  if (!req.body?.title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  // 2. Check types
  if (typeof req.body.price !== 'number' || req.body.price < 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }
  
  // 3. Success logic
  const newItem = { ...req.body, id: randomUUID() };
  itemsStorage.push(newItem);
  res.status(201).json(newItem);
});
```

```javascript:show Me: Centralized Error Helper
function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

// Usage:
// return sendError(res, 400, 'Title is required');
```

## Refactor — Export App and Separate Server

**User Story:** As a developer, I want to decouple my application logic from the network listener so that I can run tests without occupying a network port.

### Instructions

1.  **Create `src/app.js`:** Move all middleware and routes here. Export the `app` instance. **Do not** call `app.listen`.
2.  **Update `src/index.js`:** Import `app` and call `app.listen` here.

<!-- end list -->

```javascript:show Me: Exporting App (app.js)
// src/app.js
import express from 'express';
const app = express();

app.use(express.json());
// ... routes ...

export default app;
```

```javascript:show Me: Server Entry Point (index.js)
// src/index.js
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

## Test the Hello Express Route

**User Story:** As a developer, I want to write automated tests so that I can verify my server works without manually checking the browser.

### Instructions

1.  Install dependencies: `npm install -D vitest supertest @vitest/coverage-v8`.
2.  Create `tests/routes/app.test.js`.
3.  Write a test for the root path.

<!-- end list -->

```javascript:show Me: Basic Test Setup
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js'; // Import the app, not index.js

describe('Server Routes', () => {
  it('serves HTML from root route', async () => {
    // Supertest accepts the app object directly
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Hello');
  });
});
```

## Test the Happy Birthday Route

**User Story:** As a developer, I want to verify that my endpoints return the correct JSON structure.

### Instructions

Add a test case for your `/happy-birthday` route.

```javascript:show Me: JSON Route Test
it('returns JSON from Happy Birthday route', async () => {
  const res = await request(app).get('/happy-birthday');
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('greeting');
  expect(res.headers['content-type']).toMatch(/json/);
});
```

## Test a GET JSON Route

**User Story:** As a developer, I want to ensure my resource list endpoint returns an array.

### Instructions

Test your main resource route (e.g., `/books`).

```javascript:show Me: GET Array Test
it('returns seeded items array', async () => {
  const res = await request(app).get('/books');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
```

## Test a POST Route

**User Story:** As a developer, I want to verify that I can create new records via the API.

### Instructions

Test the creation flow. Send data and verify the response contains the new ID.

```javascript:show Me: POST Test
it('creates a new item', async () => {
  const response = await request(app)
    .post('/books')
    .send({ title: 'Test Book', author: 'QA Team' });
    
  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();
});
```

## Set Up Code Coverage

**User Story:** As a lead developer, I want to measure how much of my codebase is covered by tests so that I can identify risky, untested logic.

### Instructions

Add a coverage script to your `package.json`.

```json:show Me: Coverage Script
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Achieve 50% Code Coverage

**User Story:** As a developer, I want to reach a baseline of quality assurance.

### Instructions

1.  Run `npm run test:coverage`.
2.  Review the output.
3.  Write additional tests for any red (uncovered) lines until you pass 50%.

## Deepen Coverage

**User Story:** As a developer, I want to test edge cases to prevent future bugs.

### Instructions

Write three new tests:

1.  **Validation Error:** Send a POST with missing data and expect a `400`.
2.  **Not Found:** Send a GET with a fake ID and expect a `404`.
3.  **Delete:** Delete an item and verify it is gone.

## Challenge: Bulletproof the Suite ⚡

**User Story:** As a developer, I want a robust test suite that cleans up after itself.

### The Task

1.  **Reset Data:** Ensure your in-memory array resets between tests (use `beforeEach` in Vitest).
2.  **Filter Logic:** Test that your DELETE route correctly removes only the target item.
3.  **Persist:** If you implemented file persistence, mock the file system so tests don't write to your actual disk.

## Challenge: Deploy with Render ⚡

**User Story:** As a developer, I want to publish my API to the public internet.

### The Task

1.  Push code to GitHub.
2.  Connect to [Render.com](https://render.com).
3.  **Critical:** Ensure your `src/index.js` listens on `process.env.PORT`.

<!-- end list -->

```javascript:show Me: Render Port Config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```