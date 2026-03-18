# Konnect with Vue

![logo](public/logo.png)

An exercise in learning Vue.js by building a toy app and component library.

## Usage

It is recommended that you use [mise](https://mise.jdx.dev) but other runtime managers are supported.

### Setup/Install

```sh
mise trust
mise install
corepack enable
pnpm install
```

### Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

### Analysis/Testing

Typecheck and lint:

```sh
pnpm typecheck
pnpm lint:fix
pnpm stylelint:fix
```

Test (unit, component, e2e):

```sh
pnpm test
pnpm test:ct
pnpm test:e2e
```

## Design Decisions, Assumptions & Trade-offs

### Design

#### Mobile Design

- The mock did not show any mobile layouts, so I adapted these myself. This was mostly a lot of breakpoint work, but the most interesting idea was turning the modal into bottom sheets at mobile screen sizes.
- The mock showed 9 cards per page, but I switched to 12 cards per page to yield 1 column at mobile widths, 2 even columns at tablet widths, and 3 even columns at desktop+ widths. This enables a better responsive design but also pushes the pagination controls lower on the screen. I added a scroll-to-top on pagination to overcome this, but it does make it hard to quickly page through the list on anything but tall screens.

#### Other Fun Additions 

- The service detail view shows the service name as the header, differing from the mock. It is otherwise confusing what you're looking at when presented as a modal.
- The catalog cards are animated during enter/exit. They appear with a tiny stagger, and cards that persist across views slide to their new position.
- I used skeleton layouts as the loading UI, and added randomized widths to the text-placeholder bars to create a more natural feel.
- The mock only showed a design for the published service state, which I adapted to handle the other states instead of assuming they didn't get detail views at all.
- I gave the top-nav elements hover states, including the logo. 😀
- For the empty and error states I generated coordinated images for a bit of personality.

### Code

#### Pseudo Packages

I used subpath imports in package.json to mimic creating proper packages for a component library. This enforced boundaries between layers and intentional grouping of concerns, similar to a real monorepo.

#### Type-Safe Themes

- I chose to use CSS Custom Properties to manage propagating theme values throughout the component tree, but I wanted to see how that might work in a type-safe way in Vue. This was a little difficult given the extensive interfacing with CSS/SCSS, so it's definitely not perfect and I'd be curious to see other common patterns within the Vue ecosystem. 
- For the core reusable primitives like `<CoreBox>`, I experimented with filling out their props API to see how that fit into type-safety, and the external API worked quite well but resulted in lots of inline styles which wasn't necessarily ideal (repetition, specificity wars, etc). My default opinion for starting a components ecosystem for a project/entity would be to try to greatly limit the amount of CSS that consumers write alongside the components, but that feels a bit like fighting against Vue, especially given APIs like default passthrough attributes. Type-safety also gets hard as soon as you start to deal with responsive design and augmenting behavior at breakpoints.
- I would have preferred to remove SCSS entirely as modern CSS is sufficient for most functionality, but media queries forced me into using a few SCSS variables for media-query breakpoints (at least until `@custom-media` gets to baseline).
- The theme package introduced a theme object structure and provide/inject functionality to enable custom theming and runtime light/dark mode switching (not yet implemented). I tried to retrofit generalized names for the various tokens from the designs, but it would obviously be easier to start from the other direction. Some tokens were one-offs or had no obvious names and thus are hard-coded instead of being shoe-horned into the theme.

#### Server Extensions

I updated the server with a few new capabilities:
- I added degradation simulation to the server to artificially make it be slow or throw an error. This included adding a dev settings route to configure these behaviors from the UI (available via the coopted settings menu in the top nav).
- Instead of doing pagination in the client by slicing against the entire data blob in the client, I added pagination support to the GET endpoint for a more realistic production simulation. I didn't build any serious caching logic for the client to merge and manage the list, but options ranging from approaches like `swr` to a fully-normalized cache would easily fit into the data flow of the app. But for this project, I was more interested in building out the loading and error experiences via the degradation functionality.
- I added a GET/POST endpoint for individual services to power the service details view and the service creation workflow. This integrated with the mock data generation to hydrate new entries.
- I expanded the tsconfig to include the server code and created full types for the data, which are then shared with the client for end-to-end type-safety like a cheap imitation of tRPC.

#### Client State

- All navigation state is stored in the URL, allowing direct navigation to service details and search/pagination results. Having the service details be a modal over the catalog (via a nested route) creates an interesting interaction between preserving search position and detail navigation. I chose the simple path of preserving search/pagination behind the details to make the common case of browse+click+dismiss work as expected, but it gives rise to interesting edge cases that might be addressed for product reasons (e.g. can view a details over a grid that doesn't include the relevant service). But having the page state persist through navigation is good for both UX and development.
- The state in the client store is relatively simple, maintaining a discriminated union of loading/success/error states. The store handles fetching the catalog data, and has some minor fanciness in retaining the old data for 100ms to give an opportunity for the new data to return for an immediate swap before transitioning to a loading UI (similar to deferred Suspense transitions).

#### Testing

- The testing strategy in this project is top-down, preferring colocated Playwright end-to-end tests to exercise large vertical slices that correspond most closely to real behavior and avoid the extensive mocking present in `jsdom`-based tests. Below this are Playwright component tests for more focused tests while still in a browser (leveraged for the complex behavior of the `<BaseModal>` component). Unit tests cover the last layer for pure functions and simpler leaf components.
- All tests target user-facing selectors like text or a11y attributes. There are no selectors based on DOM attributes directly.
- As implied above, Cypress was removed in favor of Playwright.

#### Other Notes

- I used the modern `<script setup>` pattern with the TypeScript-y macros (e.g. `defineProps<{...}>()`), updating from the example `defineComponent()` pattern.
- Axios was removed in favor of native fetch + AbortController.
- I changed the path to `/services` partly to support the logo resetting navigation state through the `/` redirect.
- Node/pnpm versions were bumped, along with adding mise config. Other configs were also updated and/or streamlined.

## Follow-ups

Given more time, I would try these next:
- a dark theme and light/dark/system theme picker for users
- token-based search to enable targeting specific data fields, combined with the classic pill UI in the search bar
- improved caching of fetched data, experimenting with some kind of lazily-hydrated normalization layer
- deploy to live hosting with persistent storage
