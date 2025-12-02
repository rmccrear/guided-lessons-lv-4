---
id: sql-joins-relationships
title: Relationships and JOINs
type: exercise
description: Master Foreign Keys and JOINs by building a complete event management schema.
---

# Relationships and JOINs

In Chapter 1, we learned how to `SELECT` data from a single table. But real-world data is rarely lonely; it lives in relationships. 

In this chapter, we will learn how to link data together. We will start with soccer scores in SQL Zoo and end by building a multi-table architecture for our Potluck App in Supabase.

## Concept: The Relationship Model

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

## Concept: Primary vs. Foreign Keys

**Goal:** Understand the "Glue" that holds tables together.

How do we link tables in a database? We use IDs.

Look at this data from **SQL Zoo**:

**Table: `game`** (The Parent)
| id (PK) | mdate | stadium | team1 | team2 |
| :--- | :--- | :--- | :--- | :--- |
| **1001** | 8 June 2012 | Warsaw | POL | GRE |
| **1002** | 8 June 2012 | Wroclaw | RUS | CZE |

**Table: `goal`** (The Child)
| matchid (FK) | teamid | player | gtime |
| :--- | :--- | :--- | :--- |
| **1001** | POL | Lewandowski | 17 |
| **1001** | GRE | Salpingidis | 51 |

**Key Takeaways:**
* **Primary Key (PK):** The `id` in the `game` table. It identifies the game uniquely.
* **Foreign Key (FK):** The `matchid` in the `goal` table. It points back to the game.

![A diagram illustrating the relationship between two database tables. The top table, labeled "game" (Parent), highlights the 'id' column as the Primary Key (PK) with the value 1001. A connector line draws a path from this ID down to the bottom table, labeled "goal" (Child). The line connects to the 'matchid' column, labeled as the Foreign Key (FK), showing that the value 1001 appears in multiple rows to link the goals back to the specific game.](/assets/sql-join/primary-vs-foreign-keys-database-glue.png)

## SQL Zoo: The JOIN Operation

**Goal:** Practice connecting tables using standard SQL.

**User Story:** As a data analyst, I want to combine data from two tables so that I can see player names and stadium names in the same result.

Imagine you have two separate spreadsheets printed out on paper.
* **Sheet A (Game):** Lists every match with an ID.
* **Sheet B (Goal):** Lists every goal with a reference to a match ID.

To combine them, you would place Sheet B next to Sheet A, lining up every Goal row next to the specific Game row it belongs to. That alignment process is exactly what a `JOIN` does. It stitches the rows together wherever the IDs match.

![A diagram illustrating the SQL JOIN operation. On the left, two tables labeled "Sheet A (Game)" and "Sheet B (Goal)" are shown. Lines connect the id column in the Game table to the matchid column in the Goal table, demonstrating how the data aligns based on matching IDs. On the right, a "JOINED Result" table displays the final output, combining rows to show matchid, player, and stadium columns together in a single view.](/assets/sql-join/sql-join-game-goal-diagram.png)

### Instructions
1.  Open the [SQL Zoo JOIN Operation](https://sqlzoo.net/wiki/The_JOIN_operation) tutorial.
2.  Read the introduction about `JOIN` and `ON`.
3.  Complete exercises 1 through 6.

## Reviewing the Join

**Goal:** Verify your understanding of the syntax.

The standard syntax to join the tables we looked at above is:

```sql
SELECT player, stadium
  FROM game JOIN goal
    ON (game.id = goal.matchid)
```

The `ON` statement is the most important part. It tells SQL: "Match the **Primary Key** of the game to the **Foreign Key** of the goal."

## SQL Zoo: More JOINs (Movies)

**Goal:** Practice more complex relationships.

Now we look at Movies, Actors, and Casting. This is slightly harder because an Actor can be in many movies, and a Movie has many actors (Many-to-Many).

### Instructions
1.  Go to [SQL Zoo More JOIN Operations](https://sqlzoo.net/wiki/More_JOIN_operations).
2.  Try exercises 1 through 7.

## Reviewing Movie JOINs

**Goal:** Check your solutions for the movie database.

Did you struggle with Question 7? "List the casting list for the film 'Alien'".

To get this, we had to join three tables: `movie` -> `casting` -> `actor`.

![A database schema diagram illustrating the 3-way JOIN required to list the cast of the film 'Alien'. Three tables are displayed: 'Movie' (left), 'Casting' (center), and 'Actor' (right). Connector lines visualize the relationship: the movie.id joins to casting.movieid, and casting.actorid joins to actor.id. This visualizes how the 'Casting' table acts as a bridge to resolve the many-to-many relationship between movies and actors.](/assets/sql-join/sql-movie-casting-actor-join-schema.png)

### 💡 Code Hints

```sql:Show Me: Answer for #7
SELECT name
  FROM movie JOIN casting ON (movie.id = casting.movieid)
             JOIN actor   ON (casting.actorid = actor.id)
  WHERE title = 'Alien'
```

## Designing the Potluck Schema

**Goal:** Apply this theory to our Potluck app.

**User Story:** As a user, I want to create specific Events (like "Thanksgiving 2023") so that I can assign meals to a specific party.

### 🧠 Critical Thinking
We have `potluck_meals`. We are about to create `potluck_events`.

**Question:** What is the relationship between them?
1.  Does one event have many meals?
2.  Does one meal have many events?

```text:Show Me: The Answer
It is a One-to-Many relationship.
ONE Event has MANY Meals.
ONE Meal belongs to ONE Event.
```

## Creating the Events Table

**Goal:** Create the table in Supabase.

### Instructions
1.  Go to your **Supabase Dashboard** -> **Table Editor**.
2.  Create a new table called `potluck_events`.
3.  Add these columns:
    * `id` (int8, Primary Key)
    * `name` (text) - e.g., "Office Party"
    * `date` (date)
    * `location` (text)
4.  **Action:** Insert 2 or 3 rows into this table manually via the dashboard.

## Linking Meals to Events

**Goal:** Create the Foreign Key column.

We need to tell the **Meals** which **Event** they belong to. Since a Meal belongs to an Event, the Meal table holds the key (the "Foreign Key").

### Instructions
1.  Edit the `potluck_meals` table.
2.  Add a new column.
    * **Name:** `event_id`
    * **Type:** `int8`
    * **Foreign Key:** Click the chain/link icon. Select `potluck_events` and the `id` column.
3.  **Action:** Manually edit your existing meals and assign them an `event_id` (e.g., 1, 2, or 3).

## Querying by ID (No JOIN)

**Goal:** Select meals for a specific event using the ID.

**User Story:** As a developer, I want to fetch all meals for Event #1 quickly.

Since the `event_id` is already inside the `potluck_meals` table, we do **not** need a JOIN for this specific question.

```sql:Show Me: The Query
SELECT * FROM potluck_meals 
WHERE event_id = 1;
```

## Querying by Name (JOIN Required)

**Goal:** Select meals based on the Event's name or date.

**User Story:** As a developer, I want to find all meals for "Summer BBQ", but the Meal table doesn't know the name "Summer BBQ", it only knows ID `1`.

We must JOIN to ask questions about the Event's **name** or **date**.

### Challenge
Write a query to find all meals for the event named 'Summer BBQ'.

```sql:Show Me: The Solution
SELECT potluck_meals.* FROM potluck_meals 
JOIN potluck_events ON potluck_meals.event_id = potluck_events.id
WHERE potluck_events.name = 'Summer BBQ';
```

## Adding Users

**Goal:** Enable Authentication data.

**User Story:** We need to track **who** is doing what.

### Instructions
1.  Go to the **Authentication** tab in the Supabase sidebar.
2.  Add 2 distinct users (e.g., `user_a@test.com` and `user_b@test.com`).
3.  Copy their **User UIDs** (the long strings of characters) and save them in a notepad for the next step.

## Designing User Relationships

**Goal:** Plan the User links.

We have two relationships to model:
1.  **The Host:** A User "owns" an Event.
2.  **The Cook:** A User "brings" a Meal.

**Question:** Which tables need a `user_id` column?

```text:Show Me: The Answer
Both of them!
1. potluck_events needs a user_id (The Host)
2. potluck_meals needs a user_id (The Cook)
```

## Establishing User Links

**Goal:** Add the columns in Supabase.

### Instructions
1.  **Update `potluck_events`:**
    * Add column `user_id`.
    * Type: `uuid` (Standard for Supabase Auth).
    * Foreign Key: Link to `auth.users` -> `id`.
2.  **Update `potluck_meals`:**
    * Add column `user_id`.
    * Type: `uuid`.
    * Foreign Key: Link to `auth.users` -> `id`.
3.  **Action:** Manually assign User UIDs to your existing rows in both tables.

## User Query: Owned Events

**Goal:** Select events belonging to a user.

**User Story:** As a user, I want to see a list of the parties I am hosting.

Do we need a JOIN? No. The `user_id` is right there on the event table.

```sql:Show Me: The Query
-- Replace the ID with one from your Auth tab
SELECT * FROM potluck_events 
WHERE user_id = 'c02111-YOUR-UUID-GOES-HERE';
```

## User Query: Hosting Dashboard

**Goal:** The Complex Join.

**User Story:** As User A (The Host), I want to see **every meal** coming to **any of my parties**.

* I am NOT the cook (so I can't check `potluck_meals.user_id`).
* I am the HOST (so I must check `potluck_events.user_id`).
* I need the food info (so I must SELECT from `potluck_meals`).

This requires a JOIN.

```sql:Show Me: The Host Query
SELECT potluck_meals.meal_name, potluck_meals.guest_name
FROM potluck_meals
JOIN potluck_events ON potluck_meals.event_id = potluck_events.id
WHERE potluck_events.user_id = 'c02111-HOST-UUID-HERE';
```