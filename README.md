# Share

Prototype for a sharing plattform.

## Tech Stack

- JS Framework https://svelte.dev/
- UI Library https://www.shadcn-svelte.com/
- DB https://www.postgresql.org/
- ORM https://orm.drizzle.team/
- Auth https://lucia-auth.com/ & https://arcticjs.dev/ (support OAuth & KeyCloak)
- Search engine https://typesense.org/ (WIP)
- File storage https://min.io/ (WIP)
- Deployment https://coolify.io/

## Developing

Install pnpm and docker

Install node dependencies:

```bash
pnpm install
```

Start the database:

```bash
docker compose up -d
```

Start a development server:

```bash
pnpm dev
```

Open the app via: http://localhost:5173/

## Database changes

Apply schema changes to database:

```bash
pnpm db:push
```

Explore database with [drizzle studio](https://orm.drizzle.team/drizzle-studio/overview):

```bash
pnpm db:studio
```

Open the studio via: https://local.drizzle.studio

## Building

To create a production version of your app:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```
