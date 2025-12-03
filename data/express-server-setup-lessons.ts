import { Lesson } from '../types';

export const EXPRESS_SERVER_SETUP_LESSONS: Lesson[] = [
  {
    id: "express-server-setup-why-build-an-express-server",
    title: "Why Build an Express Server?",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to initialize my project environment so that I can manage dependencies and start building.

### Project Setup

Before diving into the concepts, let's set up your Express project:

1. **Initialize your project:**
   \`\`\`bash
   npm init -y
   \`\`\`

2. **Install Express and development dependencies:**
   \`\`\`bash
   npm install express
   npm install --save-dev nodemon
   \`\`\`

**📖 References:**

  - [Express.js Documentation](https://expressjs.com/)
  - [Express Hello World Example](https://expressjs.com/en/starter/hello-world.html)
`
  },
  {
    id: "express-server-setup-configure-packagejson",
    title: "Configure Package.json",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to configure automation scripts so that I can run my server easily in both development and production modes.

### Instructions

3. **Add a dev script to \`package.json\`:**

Modify your \`package.json\` to include \`"type": "module"\` and the start scripts below.



### Understanding the scripts

- **\`npm start\`**: Runs your server with Node.js. Use this for production or when you want to run the server once.
- **\`npm run dev\`**: Runs your server with \`nodemon\`, which automatically restarts the server whenever you save changes. This speeds up your development workflow.

**ES6 Modules (\`"type": "module"\`):**

- Setting \`"type": "module"\` enables ES6 module syntax (\`import\`/\`export\`) throughout your project.
- This replaces the older CommonJS \`require()\` and \`module.exports\` syntax.
- ES6 modules are the modern standard and provide better static analysis.
`
    ,codeSnippets: [
      {
        language: "json",
        summary: "Show Me: npm scripts with nodemon and node",
        code: `
{
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
`,
        description: "Snippet for: Show Me: npm scripts with nodemon and node"
      }
    ]
  },
  {
    id: "express-server-setup-create-your-first-express-server",
    title: "Create Your First Express Server",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to create a basic server file so that I can verify that Express is working correctly.

### Instructions

4. **Create your project structure:**
   - Create a \`src\` directory.
   - Create \`src/index.js\` as your main server file.



**See:** [Express Hello World Example](https://expressjs.com/en/starter/hello-world.html) for a minimal Express app example.

### Try It!

Now you're ready to start building! Test your server setup:

1. **Start the development server:**

   \`\`\`bash
   npm run dev
   \`\`\`

   - The server should display "Server listening on port 3000".
   - Open \`http://localhost:3000\` in your browser.
   - You should see "Hello World!".
   - **Test Hot Reloading:** Change the message in \`src/index.js\` and save. Notice \`nodemon\` restarts the server automatically.

2. **Stop the server:** Press \`Ctrl+C\` in your terminal.

3. **Start the production server:**

   \`\`\`bash
   npm start
   \`\`\`

   - The server starts the same way, but without auto-restart.
   - Stop the server again (\`Ctrl+C\`).

> **💡 Tip:** Use \`npm run dev\` during development for the auto-restart feature, and \`npm start\` when you want to test the production behavior.
`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "Show Me: Starter Express Server Code",
        code: `
// src/index.js
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server listening on port \${port}\`);
});
`,
        description: "Snippet for: Show Me: Starter Express Server Code"
      }
    ]
  },
  {
    id: "express-server-setup-understanding-http-fundamentals",
    title: "Understanding HTTP Fundamentals",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "reading",
    content: `
At the core sits the web server: a program that listens for incoming HTTP requests, processes them, and sends back responses. Requests are structured messages that include a verb (like \`GET\` or \`POST\`), a path, headers, and optionally a body.

### Key Concepts

  * **Status Codes:** Communicate the outcome of a request.
      * \`200\`: OK
      * \`201\`: Created
      * \`400\`: Invalid Input
      * \`500\`: Server Error
      * *Reference:* [http.cat](https://http.cat/)
  * **MIME Types:** Labels response payloads so clients know how to parse them.
      * \`text/html\`: Full web pages.
      * \`application/json\`: Structured data.
`
  },
  {
    id: "express-server-setup-kickoff-start-the-server",
    title: "Kickoff — Start the Server",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to understand the difference between production and development runtimes so I can work efficiently.

### Node vs Nodemon

  * **\`node\`**: The runtime itself. Runs once. You must manually restart (Ctrl+C) after changes.
  * **\`nodemon\`**: A development tool. Watches files and restarts the server automatically on save.

### npm Scripts

In your \`package.json\`, you have defined two ways to run the server:

1.  **\`npm start\`**: Uses \`node\`. Stable, for production.
2.  **\`npm run dev\`**: Uses \`nodemon\`. Fast iteration, for development.

### Quick Start

1.  **Start your server:** \`npm run dev\`
2.  **Verify:** Check terminal for "Server running...".
3.  **Test:** Visit \`http://localhost:3000\`.
4.  **Auto-restart:** Change a message in your code, save, and watch the terminal to see \`nodemon\` restart the app.
`
  },
  {
    id: "express-server-setup-serve-html-first",
    title: "Serve HTML First",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to send visual content to the browser to verify my server controls the response body.

### Instructions

Update your root route to use \`res.send()\` with an HTML snippet.



### Digging Deeper: Template Literals

For multi-line HTML, use backticks (\`\` \` \`\`) instead of quotes. This allows you to span multiple lines and inject variables using \`\${variableName}\`.

\`\`\`javascript
// Template literal example
const name = 'Express';
res.send(\`
  <h1>Hello \${name}!</h1>
  <p>Your server is working!</p>
\`);
\`\`\`
`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Serving HTML",
        code: `
// src/index.js
app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1><p>Your server is working!</p>');
});
`,
        description: "Snippet for: show Me: Serving HTML"
      }
    ]
  },
  {
    id: "express-server-setup-set-up-postman-for-testing",
    title: "Set Up Postman for Testing",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want a specialized tool to test API endpoints that browsers cannot easily access.

### Instructions

1.  **Install Postman:** Download the [Postman Desktop App](https://www.postman.com/downloads/).
2.  **Verify Access:** Open Postman and create a new request to \`http://localhost:3000\`.
3.  **Send Request:** Click "Send" and ensure you see the same response as your browser.
`
  },
  {
    id: "express-server-setup-serve-static-assets",
    title: "Serve Static Assets",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to host files like images and CSS so my API can serve a basic frontend.

### Instructions

Use the built-in middleware \`express.static\` to expose a directory of files.

1.  Create a \`public\` folder in your project root.
2.  Add a file (e.g., \`styles.css\`) inside it.
3.  Configure the middleware in \`src/index.js\`.

<!-- end list -->



**Testing:**
Visit \`http://localhost:3000/styles.css\` in your browser.
`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Static Assets Middleware",
        code: `
import express from 'express';
const app = express();

// Files in public/ will be accessible at the root URL
app.use(express.static('public'));

const port = 3000;
app.listen(port, () => {
  console.log(\`Server listening on port \${port}\`);
});
`,
        description: "Snippet for: show Me: Static Assets Middleware"
      }
    ]
  },
  {
    id: "express-server-setup-inspect-mime-types",
    title: "Inspect MIME Types",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**Goal:** Observe how Express handles content negotiation automatically.

### Instructions

1.  Use Postman or Browser DevTools to request your static assets.
2.  Inspect the **Headers** of the response.
3.  Find the \`Content-Type\` header.
      * HTML files should be \`text/html\`.
      * JSON files should be \`application/json\`.
      * CSS files should be \`text/css\`.
`
  },
  {
    id: "express-server-setup-take-notes",
    title: "Take Notes",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**Goal:** Document your observations for future reference.

### Instructions

1.  Capture screenshots of the \`Content-Type\` headers in Postman.
2.  Create a short README section or note explaining that Express automatically sets headers based on file extensions.
`
  },
  {
    id: "express-server-setup-create-a-json-route",
    title: "Create a JSON Route",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to send structured data to the client so that it can be easily parsed and used by frontend applications.

### Instructions

Create a \`GET /happy-birthday\` route that returns a JSON object using \`res.json()\`.

1.  Define the route path.
2.  Construct an object with \`name\`, \`age\`, and \`greeting\`.
3.  Send it back with \`res.json\`.

<!-- end list -->



**Verify:** Check in Postman that the \`Content-Type\` header is \`application/json\`.
`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Happy Birthday JSON Route",
        code: `
app.get('/happy-birthday', (req, res) => {
  res.json({
    name: 'Alice',
    age: 25,
    greeting: 'Happy Birthday! 🎉'
  });
});
`,
        description: "Snippet for: show Me: Happy Birthday JSON Route"
      }
    ]
  },
  {
    id: "express-server-setup-return-your-favorite-json",
    title: "Return Your Favorite JSON",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to model complex data structures so that my API can represent real-world objects with nested properties.

### Instructions

1.  Create a new route (e.g., \`GET /favorite\`).
2.  Return a JSON object that includes at least one **array** or **nested object**.
3.  Example: A Pokemon with a list of attacks, or a User with an address object.

<!-- end list -->


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Nested JSON Example",
        code: `
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
`,
        description: "Snippet for: show Me: Nested JSON Example"
      }
    ]
  },
  {
    id: "express-server-setup-mirror-a-public-api",
    title: "Mirror a Public API",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a learner, I want to study and replicate existing professional APIs so that I can understand industry standards for data shaping.

### Instructions

1.  Browse the [Public APIs collection](https://github.com/public-apis/public-apis).
2.  Pick an endpoint that interests you.
3.  Add two \`GET\` routes to your server that mirror the shape of that API's response.
4.  It doesn't need to be exact, but try to capture the structure (field names, nesting, data types).
`
  },
  {
    id: "express-server-setup-challenge-echo-workflow-",
    title: "Challenge: Echo Workflow ⚡",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "challenge",
    content: `
**User Story:** As a developer, I want to handle incoming data payloads so that my server can accept user input.

### The Task

1.  Add a \`POST\` endpoint.
2.  Configure your server to accept JSON bodies using \`express.json()\`.
3.  In the route handler, return (echo) the \`req.body\` back to the client.

**Success Criteria:**

  * You can send JSON in Postman.
  * You receive the exact same JSON back in the response.

### 💡 Hints


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: The Echo Route",
        code: `
// Don't forget middleware!
app.use(express.json());

app.post('/echo', (req, res) => {
  console.log('Received:', req.body);
  res.json(req.body);
});
`,
        description: "Snippet for: show Me: The Echo Route"
      }
    ]
  },
  {
    id: "express-server-setup-challenge-developer-feedback-loop-",
    title: "Challenge: Developer Feedback Loop ⚡",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "challenge",
    content: `
**User Story:** As a developer, I want to internalize the server setup process so that I can spin up new projects without relying on tutorials.

### The Task

**Time yourself.**

1.  Delete your current server file (or create a fresh folder).
2.  Rebuild the entire server from scratch:
      * \`npm init\`
      * Install Express
      * Setup \`type: module\`
      * Create \`app.listen\`
      * Create one route
3.  Aim to do this in under 5 minutes.
`
  },
  {
    id: "express-server-setup-manage-data-create-and-persist",
    title: "Manage Data: Create and Persist",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to understand how data flows through an API before introducing the complexity of a database.

The next series of levels introduces **CRUD** (Create, Read, Update, Delete) using simple **In-Memory Arrays**.

### Why In-Memory?

  * **Focus on Logic:** Master route structure without fighting SQL syntax.
  * **Speed:** No database migrations or connection strings needed.
  * **Training Ground:** The patterns you learn here (validation, finding by ID) are exactly the same when you add a database later.

### Module-Level Globals

We will use a variable declared at the top level of your file to store data. This data persists as long as the server is running but resets when the server restarts.


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Module-Level Global Example",
        code: `
import express from 'express';
const app = express();

// 1. Define storage outside the routes
const items = [];

app.post('/items', (req, res) => {
  // 2. Modify storage inside the routes
  items.push(req.body);
  res.status(201).json(req.body);
});
`,
        description: "Snippet for: show Me: Module-Level Global Example"
      }
    ]
  },
  {
    id: "express-server-setup-sketch-your-data-shape",
    title: "Sketch Your Data Shape",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As an architect, I want to define the structure of my data so that I have a clear blueprint to follow while coding my API routes.

### Instructions

1.  **Choose a Resource:** Decide what you are modeling (e.g., \`courses\`, \`books\`, \`users\`).
2.  **Define Fields:** List the properties each record needs (strings, numbers, arrays).
3.  **Draft a Sample:** Write a sample object in JavaScript to use as a reference.
4.  **Constraint:** Do **NOT** use generic names like \`items\`. Use your specific domain name.

### 💡 Code Hints


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Sample Data Structure",
        code: `
const sampleProduct = {
  id: 1,
  title: 'Notebook',
  price: 4.99,
  tags: ['stationery', 'paper'],
  inStock: true
};
`,
        description: "Snippet for: show Me: Sample Data Structure"
      }
    ]
  },
  {
    id: "express-server-setup-seed-in-memory-data",
    title: "Seed In-Memory Data",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to have some initial data loaded so that I can immediately test my API's read operations.

### Instructions

1.  Create an in-memory array to hold a few starter records.
2.  Keep it in the same module as your Express routes for now (module-level global).
3.  Log the data at launch so you can verify the initial state.
4.  **Constraint:** Use your own resource type (e.g., \`books\`, \`courses\`, \`pets\`). Do not use the generic \`items\`.

<!-- end list -->


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Seed Data Array",
        code: `
const booksStorage = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: '1984', author: 'George Orwell' }
];

console.log('Seeded items:', booksStorage);
`,
        description: "Snippet for: show Me: Seed Data Array"
      }
    ]
  },
  {
    id: "express-server-setup-build-get-resource",
    title: "Build GET Resource",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a client, I want to request a list of all resources so that I can display them to the user.

### Instructions

1.  Add a route that returns the full list with status \`200\`.
2.  **Note:** Replace \`/items\` in examples with your chosen resource path (e.g., \`/books\`).
`
  },
  {
    id: "express-server-setup-build-post-resource",
    title: "Build POST Resource",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a client, I want to add new data to the server so that it is stored for later retrieval.

### Instructions

1.  Create a \`POST\` route.
2.  Accept a JSON payload from \`req.body\`.
3.  Append it to your in-memory list.
4.  Return the newly created record with status \`201\`.

<!-- end list -->



### Diving Deeper: Middleware

Without \`app.use(express.json())\`, \`req.body\` will be \`undefined\`. This middleware is required to parse the incoming JSON string into a usable JavaScript object.

**Try it:** Comment out the middleware line, send a POST request via Postman, and log \`req.body\`. You will see it fails. Uncomment it to fix.
`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: POST Route",
        code: `
// Ensure app.use(express.json()) is active!

app.post('/books', (req, res) => {
  const newBook = req.body;
  
  // Add to storage
  booksStorage.push(newBook);
  
  // Return created item with 201 Created status
  res.status(201).json(newBook);
});
`,
        description: "Snippet for: show Me: POST Route"
      }
    ]
  },
  {
    id: "express-server-setup-enforce-basic-validation",
    title: "Enforce Basic Validation",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to validate incoming data so that my application doesn't store incomplete or corrupt records.

### Instructions

1.  Check if required fields are present in \`req.body\`.
2.  If data is missing, short-circuit the function and return status \`400\` (Bad Request).

<!-- end list -->



**Note:** The \`?.\` (optional chaining) operator safely checks for \`title\` even if \`req.body\` itself is null or undefined.
`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Validation Check",
        code: `
if (!req.body?.title) {
  return res.status(400).json({ error: 'Title is required' });
}
`,
        description: "Snippet for: show Me: Validation Check"
      }
    ]
  },
  {
    id: "express-server-setup-generate-identifiers",
    title: "Generate Identifiers",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a system, I need to assign unique IDs to every record so that I can reference them individually later.

### Instructions

1.  Import \`randomUUID\` from \`node:crypto\`.
2.  When creating a new record in your POST route, generate a new ID.
3.  Add the ID to the object *before* pushing it to the array.

<!-- end list -->


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Generate Unique ID",
        code: `
import { randomUUID } from 'node:crypto';

// Inside your POST route
const newBook = { 
  ...req.body, 
  id: randomUUID() 
};

booksStorage.push(newBook);
res.status(201).json(newBook);
`,
        description: "Snippet for: show Me: Generate Unique ID"
      }
    ]
  },
  {
    id: "express-server-setup-implement-get-by-id",
    title: "Implement GET by ID",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a client, I want to fetch a specific record by its ID so that I can view its details.

### Instructions

1.  Define a route with a parameter: \`/resource/:id\`.
2.  Use \`.find()\` to locate the record in your array.
3.  If found, return \`200\` and the object.
4.  If not found, return \`404\` with an error message.

<!-- end list -->


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Find Item by ID",
        code: `
app.get('/books/:id', (req, res) => {
  const book = booksStorage.find((entry) => entry.id === req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json(book);
});
`,
        description: "Snippet for: show Me: Find Item by ID"
      }
    ]
  },
  {
    id: "express-server-setup-implement-delete-by-id",
    title: "Implement DELETE by ID",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a client, I want to delete a specific record so that I can remove outdated information.

### Instructions

1.  Define a \`DELETE\` route: \`/resource/:id\`.
2.  Check if the item exists (return \`404\` if not).
3.  Use the **Filter Pattern** to create a new array that excludes the target item.
4.  Replace the global array variable with the new filtered array.

<!-- end list -->


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Delete with Filter Pattern",
        code: `
app.delete('/books/:id', (req, res) => {
  const book = booksStorage.find((entry) => entry.id === req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Filter out the item where the ID matches
  booksStorage = booksStorage.filter((entry) => entry.id !== req.params.id);
  
  res.status(200).json({ message: 'Book deleted successfully' });
});
`,
        description: "Snippet for: show Me: Delete with Filter Pattern"
      }
    ]
  },
  {
    id: "express-server-setup-add-request-logging",
    title: "Add Request Logging",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to log every incoming request so that I can monitor server activity and debug issues.

### Instructions

Add a \`console.log\` statement to the top of your routes to print the method and body.


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Request Logging",
        code: `
console.log(\`POST /books\`, req.body);
`,
        description: "Snippet for: show Me: Request Logging"
      }
    ]
  },
  {
    id: "express-server-setup-challenge-persist-to-disk-",
    title: "Challenge: Persist to Disk ⚡",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "challenge",
    content: `
**User Story:** As a developer, I want my data to be saved to a file so that it persists even if the server crashes or restarts.

### Instructions

1.  **Read on Start:** Use \`readFileSync\` to load data from a JSON file (e.g., \`books.json\`) into your array when the server launches.
2.  **Write on Change:** Create a helper function \`saveData()\` that writes the current array to the disk using \`writeFileSync\`. Call this function after every \`POST\` or \`DELETE\`.

### 💡 Hints




`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Read Data on Startup",
        code: `
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
`,
        description: "Snippet for: show Me: Read Data on Startup"
      },
      {
        language: "javascript",
        summary: "show Me: Write Data Helper",
        code: `
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
`,
        description: "Snippet for: show Me: Write Data Helper"
      }
    ]
  },
  {
    id: "express-server-setup-challenge-manage-multiple-resources-",
    title: "Challenge: Manage Multiple Resources ⚡",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "challenge",
    content: `
**User Story:** As a developer, I want to expand my API to handle different types of data (e.g., Books *and* Authors) to build a more complete application.

### Instructions

1.  **Pick a Second Resource:** If you have \`books\`, add \`authors\` or \`reviews\`.
2.  **Duplicate Logic:** Create a new storage array and new routes (\`GET\`, \`POST\`) for this resource.
3.  **Persist It:** Decide if you want a separate JSON file (e.g., \`authors.json\`) or a single file holding both.
`
  },
  {
    id: "express-server-setup-challenge-refine-error-responses-",
    title: "Challenge: Refine Error Responses ⚡",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "challenge",
    content: `
**User Story:** As a frontend developer consuming this API, I need consistent error messages so I can display meaningful alerts to the user.

### Instructions

1.  **Standardize:** Ensure every error returns the same JSON structure.
2.  **Structure:** Use \`{ "error": "Your message here" }\`.
3.  **Refactor:** Go back to your validation logic and 404 handlers and update them.

<!-- end list -->


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Consistent Error Object",
        code: `
// Bad ❌
res.status(404).send("Not found");

// Good ✅
res.status(404).json({ error: "Book with that ID was not found." });
`,
        description: "Snippet for: show Me: Consistent Error Object"
      }
    ]
  },
  {
    id: "express-server-setup-checkpoint-confirm-core-behavior",
    title: "Checkpoint — Confirm Core Behavior",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**Objective:** Verify your API satisfies basic REST expectations before moving to advanced topics.

### Requirements checklist

1.  **GET /resource:** Returns a list (Status \`200\`).
2.  **POST /resource:** Creates a record and returns it (Status \`201\`).
3.  **Validation:** Returns \`400\` if data is missing.
4.  **Not Found:** Returns \`404\` for invalid IDs.
`
  },
  {
    id: "express-server-setup-harden-validate-and-handle-errors",
    title: "Harden — Validate and Handle Errors",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to implement defensive coding practices so that my application doesn't crash or store invalid data when users send bad requests.

### Instructions

1.  **Validate Input:** In your POST routes, check types and required fields. Return \`400\` immediately if checks fail.
2.  **Centralize Errors:** Create a helper function to send error responses. This keeps your code DRY (Don't Repeat Yourself).
3.  **Optional:** Add middleware to log how long requests take.

<!-- end list -->




`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Comprehensive Validation",
        code: `
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
`,
        description: "Snippet for: show Me: Comprehensive Validation"
      },
      {
        language: "javascript",
        summary: "show Me: Centralized Error Helper",
        code: `
function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

// Usage:
// return sendError(res, 400, 'Title is required');
`,
        description: "Snippet for: show Me: Centralized Error Helper"
      }
    ]
  },
  {
    id: "express-server-setup-refactor-export-app-and-separate-server",
    title: "Refactor — Export App and Separate Server",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to decouple my application logic from the network listener so that I can run tests without occupying a network port.

### Instructions

1.  **Create \`src/app.js\`:** Move all middleware and routes here. Export the \`app\` instance. **Do not** call \`app.listen\`.
2.  **Update \`src/index.js\`:** Import \`app\` and call \`app.listen\` here.

<!-- end list -->




`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Exporting App (app.js)",
        code: `
// src/app.js
import express from 'express';
const app = express();

app.use(express.json());
// ... routes ...

export default app;
`,
        description: "Snippet for: show Me: Exporting App (app.js)"
      },
      {
        language: "javascript",
        summary: "show Me: Server Entry Point (index.js)",
        code: `
// src/index.js
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});
`,
        description: "Snippet for: show Me: Server Entry Point (index.js)"
      }
    ]
  },
  {
    id: "express-server-setup-test-the-hello-express-route",
    title: "Test the Hello Express Route",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to write automated tests so that I can verify my server works without manually checking the browser.

### Instructions

1.  Install dependencies: \`npm install -D vitest supertest @vitest/coverage-v8\`.
2.  Create \`tests/routes/app.test.js\`.
3.  Write a test for the root path.

<!-- end list -->


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Basic Test Setup",
        code: `
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
`,
        description: "Snippet for: show Me: Basic Test Setup"
      }
    ]
  },
  {
    id: "express-server-setup-test-the-happy-birthday-route",
    title: "Test the Happy Birthday Route",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to verify that my endpoints return the correct JSON structure.

### Instructions

Add a test case for your \`/happy-birthday\` route.


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: JSON Route Test",
        code: `
it('returns JSON from Happy Birthday route', async () => {
  const res = await request(app).get('/happy-birthday');
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('greeting');
  expect(res.headers['content-type']).toMatch(/json/);
});
`,
        description: "Snippet for: show Me: JSON Route Test"
      }
    ]
  },
  {
    id: "express-server-setup-test-a-get-json-route",
    title: "Test a GET JSON Route",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to ensure my resource list endpoint returns an array.

### Instructions

Test your main resource route (e.g., \`/books\`).


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: GET Array Test",
        code: `
it('returns seeded items array', async () => {
  const res = await request(app).get('/books');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
`,
        description: "Snippet for: show Me: GET Array Test"
      }
    ]
  },
  {
    id: "express-server-setup-test-a-post-route",
    title: "Test a POST Route",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to verify that I can create new records via the API.

### Instructions

Test the creation flow. Send data and verify the response contains the new ID.


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: POST Test",
        code: `
it('creates a new item', async () => {
  const response = await request(app)
    .post('/books')
    .send({ title: 'Test Book', author: 'QA Team' });
    
  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();
});
`,
        description: "Snippet for: show Me: POST Test"
      }
    ]
  },
  {
    id: "express-server-setup-set-up-code-coverage",
    title: "Set Up Code Coverage",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a lead developer, I want to measure how much of my codebase is covered by tests so that I can identify risky, untested logic.

### Instructions

Add a coverage script to your \`package.json\`.


`
    ,codeSnippets: [
      {
        language: "json",
        summary: "show Me: Coverage Script",
        code: `
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
`,
        description: "Snippet for: show Me: Coverage Script"
      }
    ]
  },
  {
    id: "express-server-setup-achieve-50-code-coverage",
    title: "Achieve 50% Code Coverage",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to reach a baseline of quality assurance.

### Instructions

1.  Run \`npm run test:coverage\`.
2.  Review the output.
3.  Write additional tests for any red (uncovered) lines until you pass 50%.
`
  },
  {
    id: "express-server-setup-deepen-coverage",
    title: "Deepen Coverage",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "exercise",
    content: `
**User Story:** As a developer, I want to test edge cases to prevent future bugs.

### Instructions

Write three new tests:

1.  **Validation Error:** Send a POST with missing data and expect a \`400\`.
2.  **Not Found:** Send a GET with a fake ID and expect a \`404\`.
3.  **Delete:** Delete an item and verify it is gone.
`
  },
  {
    id: "express-server-setup-challenge-bulletproof-the-suite-",
    title: "Challenge: Bulletproof the Suite ⚡",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "challenge",
    content: `
**User Story:** As a developer, I want a robust test suite that cleans up after itself.

### The Task

1.  **Reset Data:** Ensure your in-memory array resets between tests (use \`beforeEach\` in Vitest).
2.  **Filter Logic:** Test that your DELETE route correctly removes only the target item.
3.  **Persist:** If you implemented file persistence, mock the file system so tests don't write to your actual disk.
`
  },
  {
    id: "express-server-setup-challenge-deploy-with-render-",
    title: "Challenge: Deploy with Render ⚡",
    description: "Initialize a Node project, configure automation scripts, and launch your first Express server.",
    type: "challenge",
    content: `
**User Story:** As a developer, I want to publish my API to the public internet.

### The Task

1.  Push code to GitHub.
2.  Connect to [Render.com](https://render.com).
3.  **Critical:** Ensure your \`src/index.js\` listens on \`process.env.PORT\`.

<!-- end list -->


`
    ,codeSnippets: [
      {
        language: "javascript",
        summary: "show Me: Render Port Config",
        code: `
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`,
        description: "Snippet for: show Me: Render Port Config"
      }
    ]
  }
];
