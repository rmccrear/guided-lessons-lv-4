import { Lesson } from '../types';

export const SQL_JOINS_RELATIONSHIPS_LESSONS: Lesson[] = [
  {
    id: "sql-joins-relationships-concept-the-relationship-model",
    title: "Concept: The Relationship Model",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Understand how data connects.

Think about a **Soccer Match**.
1.  **One** match has **Many** goals.
2.  A goal belongs to **One** specific match.
3.  A match involves two teams.

This is a **1:N (One-to-Many)** relationship.

In our Potluck app:
* An **Event** (like "Thanksgiving") has many **Meals**.
* A **Meal** (like "Turkey") belongs to one **Event**.



[Image of SQL one to many relationship diagram]
`
  },
  {
    id: "sql-joins-relationships-concept-primary-vs-foreign-keys",
    title: "Concept: Primary vs. Foreign Keys",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Understand the "Glue" that holds tables together.

How do we link tables in a database? We use IDs.

Look at this data from **SQL Zoo**:

**Table: \`game\`** (The Parent)
| id (PK) | mdate | stadium | team1 | team2 |
| :--- | :--- | :--- | :--- | :--- |
| **1001** | 8 June 2012 | Warsaw | POL | GRE |
| **1002** | 8 June 2012 | Wroclaw | RUS | CZE |

**Table: \`goal\`** (The Child)
| matchid (FK) | teamid | player | gtime |
| :--- | :--- | :--- | :--- |
| **1001** | POL | Lewandowski | 17 |
| **1001** | GRE | Salpingidis | 51 |

**Key Takeaways:**
* **Primary Key (PK):** The \`id\` in the \`game\` table. It identifies the game uniquely.
* **Foreign Key (FK):** The \`matchid\` in the \`goal\` table. It points back to the game.
`
  },
  {
    id: "sql-joins-relationships-sql-zoo-the-join-operation",
    title: "SQL Zoo: The JOIN Operation",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Practice connecting tables using standard SQL.

**User Story:** As a data analyst, I want to combine data from two tables so that I can see player names and stadium names in the same result.



[Image of SQL join venn diagram]


### Instructions
1.  Open the [SQL Zoo JOIN Operation](https://sqlzoo.net/wiki/The_JOIN_operation) tutorial.
2.  Read the introduction about \`JOIN\` and \`ON\`.
3.  Complete exercises 1 through 6.
`
  },
  {
    id: "sql-joins-relationships-reviewing-the-join",
    title: "Reviewing the Join",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Verify your understanding of the syntax.

The standard syntax to join the tables we looked at above is:

\`\`\`sql
SELECT player, stadium
  FROM game JOIN goal
    ON (game.id = goal.matchid)
\`\`\`

The \`ON\` statement is the most important part. It tells SQL: "Match the **Primary Key** of the game to the **Foreign Key** of the goal."
`
  },
  {
    id: "sql-joins-relationships-sql-zoo-more-joins-movies",
    title: "SQL Zoo: More JOINs (Movies)",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Practice more complex relationships.

Now we look at Movies, Actors, and Casting. This is slightly harder because an Actor can be in many movies, and a Movie has many actors (Many-to-Many).

### Instructions
1.  Go to [SQL Zoo More JOIN Operations](https://sqlzoo.net/wiki/More_JOIN_operations).
2.  Try exercises 1 through 7.
`
  },
  {
    id: "sql-joins-relationships-reviewing-movie-joins",
    title: "Reviewing Movie JOINs",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Check your solutions for the movie database.

Did you struggle with Question 7? "List the casting list for the film 'Alien'".

To get this, we had to join three tables: \`movie\` -> \`casting\` -> \`actor\`.

### 💡 Code Hints

\`\`\`sql:Show Me: Answer for #7
SELECT name
  FROM movie JOIN casting ON (movie.id = casting.movieid)
             JOIN actor   ON (casting.actorid = actor.id)
  WHERE title = 'Alien'
\`\`\`
`
    ,codeSnippets: [
      {
        language: "sql",
        summary: "Show Me: Answer for #7",
        code: `
SELECT name
  FROM movie JOIN casting ON (movie.id = casting.movieid)
             JOIN actor   ON (casting.actorid = actor.id)
  WHERE title = 'Alien'
`,
        description: "Snippet for: Show Me: Answer for #7"
      }
    ]
  },
  {
    id: "sql-joins-relationships-designing-the-potluck-schema",
    title: "Designing the Potluck Schema",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Apply this theory to our Potluck app.

**User Story:** As a user, I want to create specific Events (like "Thanksgiving 2023") so that I can assign meals to a specific party.

### 🧠 Critical Thinking
We have \`potluck_meals\`. We are about to create \`potluck_events\`.

**Question:** What is the relationship between them?
1.  Does one event have many meals?
2.  Does one meal have many events?

\`\`\`text:Show Me: The Answer
It is a One-to-Many relationship.
ONE Event has MANY Meals.
ONE Meal belongs to ONE Event.
\`\`\`
`
    ,codeSnippets: [
      {
        language: "text",
        summary: "Show Me: The Answer",
        code: `
It is a One-to-Many relationship.
ONE Event has MANY Meals.
ONE Meal belongs to ONE Event.
`,
        description: "Snippet for: Show Me: The Answer"
      }
    ]
  },
  {
    id: "sql-joins-relationships-creating-the-events-table",
    title: "Creating the Events Table",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Create the table in Supabase.

### Instructions
1.  Go to your **Supabase Dashboard** -> **Table Editor**.
2.  Create a new table called \`potluck_events\`.
3.  Add these columns:
    * \`id\` (int8, Primary Key)
    * \`name\` (text) - e.g., "Office Party"
    * \`date\` (date)
    * \`location\` (text)
4.  **Action:** Insert 2 or 3 rows into this table manually via the dashboard.
`
  },
  {
    id: "sql-joins-relationships-linking-meals-to-events",
    title: "Linking Meals to Events",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Create the Foreign Key column.

We need to tell the **Meals** which **Event** they belong to. Since a Meal belongs to an Event, the Meal table holds the key (the "Foreign Key").

### Instructions
1.  Edit the \`potluck_meals\` table.
2.  Add a new column.
    * **Name:** \`event_id\`
    * **Type:** \`int8\`
    * **Foreign Key:** Click the chain/link icon. Select \`potluck_events\` and the \`id\` column.
3.  **Action:** Manually edit your existing meals and assign them an \`event_id\` (e.g., 1, 2, or 3).
`
  },
  {
    id: "sql-joins-relationships-querying-by-id-no-join",
    title: "Querying by ID (No JOIN)",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Select meals for a specific event using the ID.

**User Story:** As a developer, I want to fetch all meals for Event #1 quickly.

Since the \`event_id\` is already inside the \`potluck_meals\` table, we do **not** need a JOIN for this specific question.

\`\`\`sql:Show Me: The Query
SELECT * FROM potluck_meals 
WHERE event_id = 1;
\`\`\`
`
    ,codeSnippets: [
      {
        language: "sql",
        summary: "Show Me: The Query",
        code: `
SELECT * FROM potluck_meals 
WHERE event_id = 1;
`,
        description: "Snippet for: Show Me: The Query"
      }
    ]
  },
  {
    id: "sql-joins-relationships-querying-by-name-join-required",
    title: "Querying by Name (JOIN Required)",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Select meals based on the Event's name or date.

**User Story:** As a developer, I want to find all meals for "Summer BBQ", but the Meal table doesn't know the name "Summer BBQ", it only knows ID \`1\`.

We must JOIN to ask questions about the Event's **name** or **date**.

### Challenge
Write a query to find all meals for the event named 'Summer BBQ'.

\`\`\`sql:Show Me: The Solution
SELECT potluck_meals.* FROM potluck_meals 
JOIN potluck_events ON potluck_meals.event_id = potluck_events.id
WHERE potluck_events.name = 'Summer BBQ';
\`\`\`
`
    ,codeSnippets: [
      {
        language: "sql",
        summary: "Show Me: The Solution",
        code: `
SELECT potluck_meals.* FROM potluck_meals 
JOIN potluck_events ON potluck_meals.event_id = potluck_events.id
WHERE potluck_events.name = 'Summer BBQ';
`,
        description: "Snippet for: Show Me: The Solution"
      }
    ]
  },
  {
    id: "sql-joins-relationships-adding-users",
    title: "Adding Users",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Enable Authentication data.

**User Story:** We need to track **who** is doing what.

### Instructions
1.  Go to the **Authentication** tab in the Supabase sidebar.
2.  Add 2 distinct users (e.g., \`user_a@test.com\` and \`user_b@test.com\`).
3.  Copy their **User UIDs** (the long strings of characters) and save them in a notepad for the next step.
`
  },
  {
    id: "sql-joins-relationships-designing-user-relationships",
    title: "Designing User Relationships",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Plan the User links.

We have two relationships to model:
1.  **The Host:** A User "owns" an Event.
2.  **The Cook:** A User "brings" a Meal.

**Question:** Which tables need a \`user_id\` column?

\`\`\`text:Show Me: The Answer
Both of them!
1. potluck_events needs a user_id (The Host)
2. potluck_meals needs a user_id (The Cook)
\`\`\`
`
    ,codeSnippets: [
      {
        language: "text",
        summary: "Show Me: The Answer",
        code: `
Both of them!
1. potluck_events needs a user_id (The Host)
2. potluck_meals needs a user_id (The Cook)
`,
        description: "Snippet for: Show Me: The Answer"
      }
    ]
  },
  {
    id: "sql-joins-relationships-establishing-user-links",
    title: "Establishing User Links",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Add the columns in Supabase.

### Instructions
1.  **Update \`potluck_events\`:**
    * Add column \`user_id\`.
    * Type: \`uuid\` (Standard for Supabase Auth).
    * Foreign Key: Link to \`auth.users\` -> \`id\`.
2.  **Update \`potluck_meals\`:**
    * Add column \`user_id\`.
    * Type: \`uuid\`.
    * Foreign Key: Link to \`auth.users\` -> \`id\`.
3.  **Action:** Manually assign User UIDs to your existing rows in both tables.
`
  },
  {
    id: "sql-joins-relationships-user-query-owned-events",
    title: "User Query: Owned Events",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** Select events belonging to a user.

**User Story:** As a user, I want to see a list of the parties I am hosting.

Do we need a JOIN? No. The \`user_id\` is right there on the event table.

\`\`\`sql:Show Me: The Query
-- Replace the ID with one from your Auth tab
SELECT * FROM potluck_events 
WHERE user_id = 'c02111-YOUR-UUID-GOES-HERE';
\`\`\`
`
    ,codeSnippets: [
      {
        language: "sql",
        summary: "Show Me: The Query",
        code: `
-- Replace the ID with one from your Auth tab
SELECT * FROM potluck_events 
WHERE user_id = 'c02111-YOUR-UUID-GOES-HERE';
`,
        description: "Snippet for: Show Me: The Query"
      }
    ]
  },
  {
    id: "sql-joins-relationships-user-query-hosting-dashboard",
    title: "User Query: Hosting Dashboard",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "exercise",
    content: `
**Goal:** The Complex Join.

**User Story:** As User A (The Host), I want to see **every meal** coming to **any of my parties**.

* I am NOT the cook (so I can't check \`potluck_meals.user_id\`).
* I am the HOST (so I must check \`potluck_events.user_id\`).
* I need the food info (so I must SELECT from \`potluck_meals\`).

This requires a JOIN.

\`\`\`sql:Show Me: The Host Query
SELECT potluck_meals.meal_name, potluck_meals.guest_name
FROM potluck_meals
JOIN potluck_events ON potluck_meals.event_id = potluck_events.id
WHERE potluck_events.user_id = 'c02111-HOST-UUID-HERE';
\`\`\`
`
    ,codeSnippets: [
      {
        language: "sql",
        summary: "Show Me: The Host Query",
        code: `
SELECT potluck_meals.meal_name, potluck_meals.guest_name
FROM potluck_meals
JOIN potluck_events ON potluck_meals.event_id = potluck_events.id
WHERE potluck_events.user_id = 'c02111-HOST-UUID-HERE';
`,
        description: "Snippet for: Show Me: The Host Query"
      }
    ]
  }
];
