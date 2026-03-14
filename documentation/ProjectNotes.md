# Project Notes

## Plan

In order to solve this kata, I've planned and structured it as follows:

1. Overview and Preparation

   1.1. Read exercise, documentation and understand domain

   1.2. Clone repo, create a clean one and copy only what's necessary

   1.3. Analyze code, tests and plan accordingly

   1.4. Write and document plans, decisions and assumptions

2. Prepare all unit tests for basic scenarios (TDD approach)

   2.1. Normal item (no specific rules)

   2.2. Specific 4 named items

   2.3. Other items with similar names to follow requirements (given assumptions)

3. Code Refactoring

   3.1. Normal items

   3.2. Each of the 4 specific named items (and fix Conjured logic)

   3.3. Code clean-up

4. Documentation

   4.1. Create Project readme

   4.2. Review and update already written documentation

5. Tackle edge-cases

    5.1. Define a more generic approach and create types to support it

    5.2. Deal with items with multiple naming rules

6. Review and Submit

> Adding more specific steps as I advance

## Time Progress Tracker

I didn't hard track everything, so this is an approximation. I still had toilet breaks and snack time :D

1. Overview and Preparation: **1 hour** (total time: **1 hour**)

2. Unit Tests: 15 minutes (total time: **1 hour and 15 minutes**)

3. Code Refactoring: 30 minutes (total time: **1 hour and 45 minutes**)

4. Documentation and Code Cleanup: ??? (total time: **?? minutes**)

5. Edge-cases: ??? (total time: **?? minutes**)

6. Review and Submit: ??? (total time: **?? minutes**)

## Project Decisions

Some of the decisions made for the structure and problem solving of this kata.

- Create new repo instead of forking for a cleaner commit history and evaluation of the exercise
- Use TypeScript variant (clone only the necessary folder)
- Use Vitest for tests (remove Mocha and Jest)

## Assumptions

Given the [requirements](./GildedRoseRequirements.md) and the code provided, there are some assumptions which had to be made.

### Item Class

Unable to edit the `Item` class (as Goblins can be very dangerous!) in order to add properties such as `conjured`, `category`, etc. This means I need to rely solely on the item name in order to make all the decisions regarding the

> I thought of creating a new class which would extend `Item` and add such properties, as it wouldn't really be changing the `Item` class, but this seems to go against the idea of the exercise. So I decided to not pursue it.

### Names

Requirements mention items such as `"Sulfuras"`, but code has `"Sulfuras, Hand of Ragnaros"` in its implementation and tests. This makes me assume it's possible to have more than one item named `"Sulfuras"`, which should share the same properties.
For that, we have 2 approaches:

1. Check if the name starts with `"Sulfuras"`
2. Check if the name contains `"Sulfuras"`

All these rules should apply for all specific items ("Sulfuras", "Aged Brie", "Backstage passes", "Conjured"). On option 1, the rules are set and it's simpler to deal, it seems to be the intended behaviour considering the tests and code provided.
However, on option 2, rules could mix between different sets for names like "Conjured Sulfuras, Ancient Aged Brie" and provide weird results. A solution would be to add a priority to each rule: "Sulfuras" rules take precedence over "Aged Brie" rules for example.

I will start with option 1 and improve to option 2 if time allows.

## AI Use

I expect to use AI mostly for the unit tests creation, documentation and code validation.

> Update as I advance in the project
