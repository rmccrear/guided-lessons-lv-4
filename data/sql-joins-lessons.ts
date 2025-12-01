import { Lesson } from '../types';

export const SQL_JOINS_RELATIONSHIPS_LESSONS: Lesson[] = [
  {
    id: "sql-joins-relationships-concepts-one-to-many",
    title: "Concepts: One-to-Many",
    description: "Learn how to connect tables using Foreign Keys and JOINs in SQL Zoo and Supabase.",
    type: "exercise",
    content: `
Before we code, we need to understand **Relationships** and **Keys**.

### The "One-to-Many" Relationship
Think about a Soccer Match.
1.  **One** match has **Many** goals.
2.  A goal belongs to **One** specific match.

This is a **1:N (One-to-Many)** relationship.



[Image of SQL one to many relationship diagram]


### Primary Keys (PK) vs. Foreign Keys (FK)
How do we link them in a database? We use IDs.

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
| **1002** | RUS | Dzagoev | 15 |

**Key Takeaways:**
* **Primary Key (PK):** The \`id\` in the \`game\` table. It identifies the game uniquely.
* **Foreign Key (FK):** The \`matchid\` in the \`goal\` table. It points back to the game.

### Check Your Understanding
If I want to find the stadium where "Lewandowski" scored, I have to look at his \`matchid\` (1001), find row 1001 in the \`game\` table, and read the stadium column.
`
  },
  {
    id: "sql-joins-relationships-sql-zoo-the-join-operation",
    title: "SQL Zoo: The JOIN Operation",
    description: "Learn how to connect tables using Foreign Keys and JOINs in SQL Zoo and Supabase.",
    type: "exercise",
    content: `
**Goal:** Practice connecting tables using standard SQL.

**User Story:** As a data analyst, I want to combine data from two tables so that I can see player names and stadium names in the same result.



[Image of SQL join venn diagram]


### Instructions
1.  Open the [SQL Zoo JOIN Operation](https://sqlzoo.net/wiki/The_JOIN_operation) tutorial.
2.  Read the introduction about \`JOIN\` and \`ON\`.
3.  Complete exercises 1 through 6.

### 💡 Syntax Hint
The standard syntax to join the tables we looked at above is:

\`\`\`sql
SELECT player, stadium
  FROM game JOIN goal
    ON (game.id = goal.matchid)
\`\`\`

**Need help with Question 6?**
"List the dates of the matches and the name of the player who scored for 'GER'."

\`\`\`sql:show Me: Answer for #6
SELECT mdate, player
  FROM game JOIN goal ON (game.id = goal.matchid)
  WHERE teamid = 'GER'
\`\`\`
`
    ,codeSnippets: [
      {
        language: "sql",
        summary: "show Me: Answer for #6",
        code: `
SELECT mdate, player
  FROM game JOIN goal ON (game.id = goal.matchid)
  WHERE teamid = 'GER'
`,
        description: "Snippet for: show Me: Answer for #6"
      }
    ]
  },
  {
    id: "sql-joins-relationships-sql-zoo-more-joins-movies",
    title: "SQL Zoo: More JOINs (Movies)",
    description: "Learn how to connect tables using Foreign Keys and JOINs in SQL Zoo and Supabase.",
    type: "exercise",
    content: `
**Goal:** Practice more complex relationships.

Now we look at Movies, Actors, and Casting. This is slightly harder because an Actor can be in many movies, and a Movie has many actors (Many-to-Many), but we solve it using \`JOIN\`s all the same.

### Instructions

1.  Go to [SQL Zoo More JOIN Operations](https://sqlzoo.net/wiki/More_JOIN_operations).
2.  Try exercises 1 through 7.

### 💡 Code Hints

**Hint for Question 7:**
"List the casting list for the film 'Alien'"

\`\`\`sql:show Me: Answer for #7
SELECT name
  FROM movie JOIN casting ON (movie.id = casting.movieid)
             JOIN actor   ON (casting.actorid = actor.id)
  WHERE title = 'Alien'
\`\`\`
`
    ,codeSnippets: [
      {
        language: "sql",
        summary: "show Me: Answer for #7",
        code: `
SELECT name
  FROM movie JOIN casting ON (movie.id = casting.movieid)
             JOIN actor   ON (casting.actorid = actor.id)
  WHERE title = 'Alien'
`,
        description: "Snippet for: show Me: Answer for #7"
      }
    ]
  },
  {
    id: "sql-joins-relationships-designing-the-potluck-events",
    title: "Designing the Potluck Events",
    description: "Learn how to connect tables using Foreign Keys and JOINs in SQL Zoo and Supabase.",
    type: "exercise",
    content: `
**Goal:** Create a \`potluck_events\` table in Supabase and link it to meals.

**User Story:** As a user, I want to create specific Events (like "Thanksgiving 2023") so that I can assign meals to a specific party, not just a general list.

### 1\. The Relationship

We currently have \`potluck_meals\`. We need \`potluck_events\`.

  * An Event has many Meals.
  * A Meal belongs to one Event.

### 2\. Create the Table

1.  Go to your **Supabase Dashboard** -\> **Table Editor**.
2.  Create a new table called \`potluck_events\`.
3.  Add these columns:
      * \`id\` (int8, Primary Key)
      * \`name\` (text)
      * \`date\` (date)
      * \`location\` (text)
4.  Insert 2 or 3 rows into this table (e.g., "Office Party", "Summer BBQ").

### 3\. Create the Connection

We need to tell the **Meals** which **Event** they belong to.

**Thinking Step:** Which table gets the Foreign Key?

  * Does the Event store a list of meal IDs? (No, that's messy).
  * Does the Meal store the ID of the event it belongs to? (Yes).

**Instructions:**

1.  Edit the \`potluck_meals\` table.
2.  Add a new column.
      * **Name:** \`event_id\`
      * **Type:** \`int8\`
      * **Foreign Key:** Click the link icon. Select \`potluck_events\` and the \`id\` column.
3.  Manually edit your existing meals and assign them an \`event_id\` (e.g., 1, 2, or 3).
`
  },
  {
    id: "sql-joins-relationships-querying-events-and-meals",
    title: "Querying Events and Meals",
    description: "Learn how to connect tables using Foreign Keys and JOINs in SQL Zoo and Supabase.",
    type: "exercise",
    content: `
**Goal:** Write SQL queries to find meals based on their event.

### Instructions

Run these queries in the **Supabase SQL Editor**.

### Task 1: No JOIN Needed

Find all meals that belong to the event with ID 1.

\`\`\`sql:show Me: The Query
SELECT * FROM potluck_meals 
WHERE event_id = 1;
\`\`\`

### Task 2: JOIN Required

Find all meals brought to any potluck happening on a specific date (e.g., '2023-12-25'), OR find all meals for the event named "Summer BBQ".

Because the *date* and *name* live on the Event table, but we want the *Meals*, we must JOIN.

\`\`\`sql:show Me: The JOIN Query
SELECT potluck_meals.* FROM potluck_meals 
JOIN potluck_events ON potluck_meals.event_id = potluck_events.id
WHERE potluck_events.name = 'Summer BBQ';
\`\`\`
`
    ,codeSnippets: [
      {
        language: "sql",
        summary: "show Me: The Query",
        code: `
SELECT * FROM potluck_meals 
WHERE event_id = 1;
`,
        description: "Snippet for: show Me: The Query"
      },
      {
        language: "sql",
        summary: "show Me: The JOIN Query",
        code: `
SELECT potluck_meals.* FROM potluck_meals 
JOIN potluck_events ON potluck_meals.event_id = potluck_events.id
WHERE potluck_events.name = 'Summer BBQ';
`,
        description: "Snippet for: show Me: The JOIN Query"
      }
    ]
  },
  {
    id: "sql-joins-relationships-adding-users-owners",
    title: "Adding Users (Owners)",
    description: "Learn how to connect tables using Foreign Keys and JOINs in SQL Zoo and Supabase.",
    type: "exercise",
    content: `
**Goal:** Link data to specific Users.

**User Story:** As an app developer, I want to know **who** created the event and **who** is bringing the meal.

In Supabase, users are managed in a special system table (\`auth.users\`), but we can still link to them using Foreign Keys.

### Instructions

1.  **Create Users:** Go to **Authentication** in the sidebar and add 2 distinct users (User A and User B).
2.  **Update \`potluck_events\`:**
      * Add a column \`user_id\`.
      * Type: \`uuid\` (Standard for Supabase Auth).
      * Foreign Key: Link to \`auth.users\` -\> \`id\`.
      * *Concept:* This defines who **Hosts/Owns** the Event.
3.  **Update \`potluck_meals\`:**
      * Add a column \`user_id\`.
      * Type: \`uuid\`.
      * Foreign Key: Link to \`auth.users\` -\> \`id\`.
      * *Concept:* This defines who is **Bringing** the meal.

### 💡 Visualizing the Data

  * **User A** might host the "Summer BBQ".
  * **User B** might bring "Potato Salad" to the "Summer BBQ".
`
  },
  {
    id: "sql-joins-relationships-advanced-user-queries",
    title: "Advanced User Queries",
    description: "Learn how to connect tables using Foreign Keys and JOINs in SQL Zoo and Supabase.",
    type: "exercise",
    content: `
**Goal:** Select data based on User ownership.

### Task 1: The Host's Events (No JOIN)

Select all Events that are owned/hosted by a specific User UUID.

\`\`\`sql:show Me: The Query
-- Replace UUID with one from your Auth tab
SELECT * FROM potluck_events 
WHERE user_id = 'c02111-YOUR-UUID-GOES-HERE';
\`\`\`

### Task 2: The User's Contributions (No JOIN)

Select all meals that a specific User is bringing. (Note: We don't need to know *where* they are going yet, just what they are cooking).

\`\`\`sql:show Me: The Query
SELECT * FROM potluck_meals 
WHERE user_id = 'c02111-YOUR-UUID-GOES-HERE';
\`\`\`

### Task 3: The Complex Question (JOIN Required)

**Scenario:** User A is hosting a party. They want to see a list of **all meals** being brought to their party, regardless of who is bringing them.

  * We need \`potluck_meals\` (the food).
  * We need \`potluck_events\` (to check if User A owns the event).

\`\`\`sql:show Me: The Host's Menu Query
SELECT potluck_meals.meal_name, potluck_meals.guest_name
FROM potluck_meals
JOIN potluck_events ON potluck_meals.event_id = potluck_events.id
WHERE potluck_events.user_id = 'c02111-HOST-UUID-HERE';
\`\`\`
`
    ,codeSnippets: [
      {
        language: "sql",
        summary: "show Me: The Query",
        code: `
-- Replace UUID with one from your Auth tab
SELECT * FROM potluck_events 
WHERE user_id = 'c02111-YOUR-UUID-GOES-HERE';
`,
        description: "Snippet for: show Me: The Query"
      },
      {
        language: "sql",
        summary: "show Me: The Query",
        code: `
SELECT * FROM potluck_meals 
WHERE user_id = 'c02111-YOUR-UUID-GOES-HERE';
`,
        description: "Snippet for: show Me: The Query"
      },
      {
        language: "sql",
        summary: "show Me: The Host's Menu Query",
        code: `
SELECT potluck_meals.meal_name, potluck_meals.guest_name
FROM potluck_meals
JOIN potluck_events ON potluck_meals.event_id = potluck_events.id
WHERE potluck_events.user_id = 'c02111-HOST-UUID-HERE';
`,
        description: "Snippet for: show Me: The Host's Menu Query"
      }
    ]
  },
  {
    id: "sql-joins-relationships--check",
    title: "✅ Check",
    description: "Learn how to connect tables using Foreign Keys and JOINs in SQL Zoo and Supabase.",
    type: "exercise",
    content: `
1.  You have completed the SQL Zoo JOIN tutorials.
2.  Your Dashboard has a \`potluck_events\` table.
3.  \`potluck_meals\` has an \`event_id\` column (FK) and \`user_id\` column (FK).
4.  You can run a query to see all food arriving at a specific user's party.
`
  }
];
