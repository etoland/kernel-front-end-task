# Company Review Portal

A single-page React application for reviewing and editing company records.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Philosophy

This project is intentionally barebones. The goal was to write clean, readable
code with a structure that is easy to follow at a glance — no unnecessary
abstractions, no dependencies that don't earn their place. As a product engineer
I care about the experience on both sides: the end user gets a fast, no-friction
tool, and the next engineer to open the codebase can understand it immediately
without digging through layers of configuration or indirection.

## Tech decisions

**React + Vite, not Next.js**
This is a single-page client-only tool with no routing, no server, and no
data fetching. Next.js would add complexity with zero benefit. Vite gives
instant dev startup and a clean production build with no configuration needed.

**Plain JavaScript, not TypeScript**
The data shape is small and defined by a single JSON file. Adding TypeScript
would mean writing interfaces that largely duplicate what the JSON already
shows. For a project at this scope it adds overhead without improving
correctness in any meaningful way.

**No validation library (no Zod, no Yup)**
There are five business rules in the spec. They are written as plain functions
in `src/utils/validation.js` — one function per entity, returning an errors
object. This is readable, easy to test, and easy to extend. The structure is
compatible with Zod if the project grew and schema inference became valuable.

**No state management library (no Redux, no Zustand)**
All state lives in `App.jsx` and is passed down as props. The component tree
is shallow — three sections, one page. Lifting state to a global store would
be indirection for its own sake.

**No component library (no MUI, no shadcn)**
The UI requirements are simple enough that a single `index.css` file covers
everything. Pulling in a component library would mean fighting its opinions
on styling for no meaningful gain at this scope.

**Validation on export, live after first attempt**
Errors are shown only after the user first clicks Export — not on every
keystroke, which would be noisy on a fresh form. After that first attempt,
validation runs live as they type so they get immediate feedback while
correcting mistakes.

## Structure
src/
data/
mock-data.json        # source data, loaded at startup
utils/
validation.js         # all business rule validation
export.js             # JSON download helper
components/
CompanyProfile.jsx    # name, legal name, NAICS, public fields
Directors.jsx         # director list, add/remove
Locations.jsx         # location list, add/remove
App.jsx               # state owner, export handler
index.css             # all styles

## Business rules implemented

1. `vertical` must match a valid NAICS sector from the reference data
2. `subVertical` must belong to the selected vertical and resets when vertical changes
3. If `fundingStage` is `public`, ticker and stockExchange are shown and required
4. If `fundingStage` is not `public`, ticker and stockExchange are hidden and excluded from the export
5. At least one director and one location must be present at all times
6. Each location `countryCode` must be a valid ISO 3166-1 alpha-2 code