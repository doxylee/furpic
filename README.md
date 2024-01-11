# Furpic

## Getting Started

First, run the development server:

```bash
yarn dev
```

## DB related commands

### Update Prisma client to schema changes

```bash
$ npx prisma generate
```

### Create a new migration

```bash
$ npx prisma migrate dev
```

### Create seed rows in DB

```bash
$ npx prisma db seed
```

### Reset DB

```bash
$ npx prisma migrate reset
```
