# Conceptual Framework for Lessons (Chapters) and Levels (Steps)

## 1. Lesson Structure Overview
A complete lesson acts as a container for multiple "levels" and should include the following introductory elements:

* **Lesson Meta Data:** Title and brief description.
* **Introduction:** Welcome message and context setting.
* **Learning Objectives:** A bulleted list of what the student will learn (the "What").
* **Operational Overview:** Explanation of how the lesson works, how levels build upon one another, and what to expect.
* **Navigation:** A clear mechanism (utility bar) for navigating between steps.

## 2. Standard Level Components
Each individual level within a lesson should follow this consistent flow:

* **Level Title:** Descriptive name of the specific step.
* **Goal:** A clear, concise, one-sentence statement of the technical objective.
* **User Story:** Contextualizes the task using the format: *"As a [persona], I want to [action] so that [benefit]."*
* **What You'll Do:** A brief summary paragraph describing the task before diving into details.
* **Instructions:**
    * Step-by-step guidance.
    * Actionable items (bullet points or numbered lists).
    * Specific commands or actions required to proceed.
* **Code Hints (Optional):**
    * Collapsible or hidden-by-default snippets to assist students who get stuck.
    * Examples of the code required to complete the specific step.
* **Diving Deeper (Optional):**
    * Explanations of the "Why" and "How" behind the concepts.
    * Links to external documentation or videos.
    * Conceptual breakdowns (e.g., "Why do we need security policies?").
* **Check (Verification):**
    * A numbered list of verifiable items to ensure the step was completed key.
    * "Definition of Done" for the level.

## 3. Special Level Types
Beyond standard instruction, the framework supports specific educational modes:

* **Planning Level:**
    * Focuses on architecture and design before coding.
    * Encourages reviewing requirements and success criteria.
    * Verify understanding of the scope.
* **Challenge Level:**
    * Bonus tasks for advanced learners.
    * Less hand-holding; focuses on extending functionality.
    * User stories focused on "advanced features."
* **Completion Level:**
    * Celebrates finishing the project.
    * Recaps skills developed and accomplishments.
    * Suggests next steps and future learning resources.

## 4. Writing & Style Guidelines

### Content Tone
* **Second Person:** Use "you" and "your."
* **Supportive:** Encourage problem-solving but provide safety nets (hints).
* **Action-Oriented:** Use imperative verbs.

### Structural Logic
* **Progressive Complexity:** Start simple and increase difficulty level by level.
* **One Goal Per Level:** Keep distinct steps focused on a single achievable outcome.
* **Hierarchy:** Use headings clearly to distinguish between the "What," the "How," and the "Why."

### User Story Format
Standardize the "Why" using the Agile format:
> **User Story:** As a [specific persona], I want to [specific action] so that [specific benefit/outcome].

### Sections Breakdown
* **Instructions:** Should be specific (commands, filenames) and strictly ordered if necessary.
* **Hints:** Should clearly label what topic the hint covers (e.g., "Show Me: Creating the table").
* **Diving Deeper:** Use this for theory. Keep the main instructions focused on practice.
* **Check:** Items should be binary (Done/Not Done) and verifiable.

## 5. Template for Requesting Content
When asking for new content generation based on this framework, provide:
* **Topic:** The specific subject matter.
* **Audience:** Beginner, Intermediate, or Advanced.
* **Scope:** Single level vs. full lesson.
* **Objectives:** Key takeaways.
* **Prerequisites:** Knowledge required beforehand.