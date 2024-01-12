# Furpic

## Prerequisites

- docker and docker-compose (You can install docker desktop for windows or mac)
- nodejs 18
- yarn

## Installation & Setup

Install dependencies

```bash
$ yarn
```

Create and start a postgres container.

```bash
$ make db
```

Connect to the running postgres container and run the following command.

```bash
$ make access-db
```

```sql
CREATE USER 'backend' WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE furpic TO backend;
GRANT CREATE, CONNECT ON DATABASE furpic TO backend;
\q
```

Pull environment variables from vercel and rename .env.local to .env

Migrate DB

```bash
$ npx prisma migrate deploy
```

## Running the app

```bash
# run DB
$ make db

# development
$ yarn dev
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

### Access DB directly

```bash
$ make db-access
```
