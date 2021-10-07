import { DB } from 'https://deno.land/x/sqlite@v2.5.0/mod.ts'

try {
  await Deno.remove('stories.db')
} catch {
  // nothing to remove
}

const db = new DB('./stories.db')
await db.query(
  `CREATE TABLE stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    SCORE INTEGER NOT NULL DEFAULT 0
  );` // add more columns
)
