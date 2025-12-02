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

![An educational diagram illustrating a "One-to-Many" (1:N) database relationship. The graphic is split into two visual metaphors. The top section shows a "Soccer Match" entity on the left connected to multiple "Goal" entities on the right. The bottom section shows a single "Event" entity on the left connected to multiple "Meal" entities on the right. In the center, a standard database connector line is drawn: it has a single vertical hash mark on the left (indicating "One") and a branching crow's foot symbol on the right (indicating "Many").](/assets/sql-join/One-to-Many-Relationship.png)

In our Potluck app:
* An **Event** (like "Thanksgiving") has many **Meals**.
* A **Meal** (like "Turkey") belongs to one **Event**.

To visualize this, think of a **Folder** on your computer containing **Files**.
* The **Folder** (Event) is the container.
* The **Files** (Meals) are inside it.
* One Folder holds many Files.
* One File belongs to only one Folder.

In database terms, the 'Child' (Meal) holds a reference pointing back to its 'Parent' (Event).
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

![A diagram illustrating the relationship between two database tables. The top table, labeled "game" (Parent), highlights the 'id' column as the Primary Key (PK) with the value 1001. A connector line draws a path from this ID down to the bottom table, labeled "goal" (Child). The line connects to the 'matchid' column, labeled as the Foreign Key (FK), showing that the value 1001 appears in multiple rows to link the goals back to the specific game.](/assets/sql-join/primary-vs-foreign-keys-database-glue.png)
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

Imagine you have two separate spreadsheets printed out on paper.
* **Sheet A (Game):** Lists every match with an ID.
* **Sheet B (Goal):** Lists every goal with a reference to a match ID.

To combine them, you would place Sheet B next to Sheet A, lining up every Goal row next to the specific Game row it belongs to. That alignment process is exactly what a \`JOIN\` does. It stitches the rows together wherever the IDs match.

![A diagram illustrating the SQL JOIN operation. On the left, two tables labeled "Sheet A (Game)" and "Sheet B (Goal)" are shown. Lines connect the id column in the Game table to the matchid column in the Goal table, demonstrating how the data aligns based on matching IDs. On the right, a "JOINED Result" table displays the final output, combining rows to show matchid, player, and stadium columns together in a single view.](/assets/sql-join/sql-join-game-goal-diagram.png)

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

### Diving Deeper: Understanding Many-to-Many Relationships

In the previous "Game and Goal" example, we had a simple **One-to-Many** relationship: One game can have many goals, but one specific goal can only belong to one game.

The **Movie** database introduces a complexity called a **Many-to-Many** relationship.

### The Problem

Imagine trying to track movies and actors with only two tables:

1.  **If you put actors in the Movie table:** You would need a column for every single actor (Actor1, Actor2, Actor3...), which is messy and limited.

2.  **If you put movies in the Actor table:** You would have to duplicate the actor's personal info for every movie they've ever done.

### The Solution: The Join Table

To solve this, database designers use a third table, often called a **Join Table** (or Associative Table/Bridge Table). In SQL Zoo, this is the \`casting\` table.

The \`casting\` table doesn't hold much information about the movie or the actor itself. Instead, it holds **Foreign Keys**:

  * \`movieid\`: Points to the Movie table.

  * \`actorid\`: Points to the Actor table.

Each row in \`casting\` represents a single "ticket" or connection: *"Actor X played a role in Movie Y."*

![A diagram illustrating how to resolve a Many-to-Many relationship in SQL. It displays three tables: "Movie" on the left and "Actor" on the right, which are strictly separated. In the center is the "Casting" table, labeled as the "Join Table." Connector lines visualize the "Three-Table Hop": one line links the Movie ID to the Casting table, and another links the Actor ID to the Casting table, showing how the middle table acts as a bridge to connect movies to their actors.](/assets/sql-join/sql-many-to-many-movie-casting-actor.png)

### The "Three-Table Hop"

Because the data is separated into three tables, you cannot simply join \`movie\` directly to \`actor\`. You must "hop" through the middle table using two \`JOIN\` statements.

**The Pattern:**

1.  **Start** at Table A (\`movie\`).

2.  **Join** to the Middle Table (\`casting\`) to get the list of actor IDs for that movie.

3.  **Join** to Table B (\`actor\`) to translate those IDs into names.

### Summary Table

| Relationship Type | Example | How they link |
| :--- | :--- | :--- |
| **One-to-Many** | Game -\> Goals | The "Many" side (Goal) has a column holding the ID of the "One" side (Game). |
| **Many-to-Many** | Movie \<-\> Actor | They **cannot** link directly. They require a **Join Table** (\`casting\`) in the middle to hold pairs of IDs. |
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

![A database schema diagram illustrating the 3-way JOIN required to list the cast of the film 'Alien'. Three tables are displayed: 'Movie' (left), 'Casting' (center), and 'Actor' (right). Connector lines visualize the relationship: the movie.id joins to casting.movieid, and casting.actorid joins to actor.id. This visualizes how the 'Casting' table acts as a bridge to resolve the many-to-many relationship between movies and actors.:Show Me: The 3-Way JOIN Schema](/assets/sql-join/sql-movie-casting-actor-join-schema.png)

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

![A database schema diagram showing the One-to-Many relationship between two tables: potluck_events and potluck_meals. The potluck_events table is shown as the parent table with a primary key id. The potluck_meals table is shown as the child table with a new column highlighted as event_id. A line connects potluck_meals.event_id to potluck_events.id, visually representing the Foreign Key link that assigns specific meals to specific events.](/assets/sql-join/supabase-potluck-foreign-key-schema.png)

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

![A conceptual SQL diagram illustrating a query filtering by name. On the left, the potluck_events table shows a row with id: 1 and name: 'Summer BBQ'. On the right, the potluck_meals table shows rows with event_id: 1. A directional flow indicates the logic: the query finds 'Summer BBQ' in the first table, grabs the ID (1), and uses that connection to retrieve the matching meals from the second table.](/assets/sql-join/sql-join-filtering-by-event-name.png)

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

![A database relationship diagram illustrating how Supabase Authentication links to the application data. On the left, a block represents the auth.users table. Two arrows originate from this user table: one points strictly to the user_id column in the potluck_events table (identifying the Host), and the second points strictly to the user_id column in the potluck_meals table (identifying the Cook).](/assets/sql-join/supabase-auth-users-linked-to-events-and-meals.png)

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
    id: "sql-joins-relationships-user-query-hosting-dashboard-challenge",
    title: "User Query: Hosting Dashboard (Challenge)",
    description: "Master Foreign Keys and JOINs by building a complete event management schema.",
    type: "challenge",
    content: `
**Goal:** Write the Complex Join.

**User Story:** As User A (The Host), I want to see **every meal** coming to **any of my parties**.

### Challenge

Write a query that shows all meals for events hosted by a specific user.

**Hints:**
* I am NOT the cook (so I can't check \`potluck_meals.user_id\`).
* I am the HOST (so I must check \`potluck_events.user_id\`).
* I need the food info (so I must SELECT from \`potluck_meals\`).
* This requires a JOIN.

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
