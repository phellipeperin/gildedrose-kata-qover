# Gilded Rose Kata Challenge

This repository contains my TypeScript take on the classic Gilded Rose refactoring kata, prepared as part of a Qover challenge.

The goal is not just to "make the tests pass", but to work through a legacy code exercise with a clear approach:

- understand the existing behavior before changing it
- protect that behavior with tests and approvals
- refactor the update logic into something easier to reason about
- implement the missing `Conjured` behavior without breaking the existing rules
- document decisions, assumptions, and tradeoffs along the way

## The Challenge

The starting point is the standard Gilded Rose scenario: an inventory system updates item `sellIn` and `quality` values daily, with a few special item categories that behave differently.

Important constraints from the kata:

- normal items decrease in `quality` over time
- `Aged Brie` increases in `quality`
- `Backstage passes` increase as the concert approaches, then drop to `0`
- `Sulfuras` never changes
- `Conjured` items should degrade twice as fast as normal items
- `quality` is never negative
- `quality` never exceeds `50`, except `Sulfuras`, which stays at `80`
- the `Item` class must not be changed

The original kata requirements are captured in [`documentation/GildedRoseRequirements.md`](./documenation/GildedRoseRequirements.md).

## Approach

I am using this kata as a small but explicit engineering exercise:

- preserve behavior first with approval-style coverage
- add targeted unit tests for requirements and edge cases
- refactor only once behavior is better protected
- keep a written record of assumptions and decisions

Supporting notes for that process live in [`documentation/ProjectNotes.md`](./documenation/ProjectNotes.md).

## Project Structure

```text
.
|-- app/
|   `-- gilded-rose.ts              # Legacy implementation under refactor
|-- documentation/
|   |-- GildedRoseRequirements.md   # Kata rules and constraints
|   `-- ProjectNotes.md             # Plan, assumptions, and decisions
|-- test/
|   |-- golden-master-text-test.ts  # Text output fixture / golden master runner
|   |-- texttests/                  # TextTest assets kept from the kata template
|   `-- vitest/
|       |-- approvals.spec.ts       # Snapshot / approval-style verification
|       `-- gilded-rose.spec.ts     # Rule-focused unit tests
|-- package.json
|-- tsconfig.json
`-- vitest.config.ts
```

## Tooling

This repository is centered around:

- TypeScript for the implementation
- Vitest for automated tests and coverage
- a text-based golden master fixture to compare legacy behavior over multiple days

Some template files for Jest and older kata fixtures are still present, but the active workflow in this repo is based on Vitest.

## Getting Started

Install dependencies:

```sh
npm install
```

Run the automated test suite:

```sh
npm run test
```

Run the golden master text fixture:

```sh
npx ts-node test/golden-master-text-test.ts
```

Run the golden master for a custom number of days:

```sh
npx ts-node test/golden-master-text-test.ts 10
```
