# Furpic

This is the frontend repository of the old furpic.net, which was built with Next.js. It is no longer in use as it has been replaced with Svelte.
Some features may not work due to API changes, but you can check it out at furpic.vercel.app.

## Directory Structure

- src
  - \_interfaces/backend
    - api: Functions that interact with the backend API are defined here.
    - entities: Defines the types of data received through the backend API.
  - app: Pages and components used only on those pages are defined here.
  - components: Reusable components are defined here.
  - utils: Reusable functions are defined here.

## Prerequisites

- nodejs 18
- yarn

## Installation & Setup

Install dependencies

```bash
$ yarn
```

## Running the app

Run backend together.

```bash
# development
$ yarn dev
```
