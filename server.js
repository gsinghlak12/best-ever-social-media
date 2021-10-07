import { Application } from 'https://deno.land/x/abc/mod.ts'
import { DB } from 'https://deno.land/x/sqlite@v2.5.0/mod.ts'
import { cors } from 'https://deno.land/x/abc@v1.3.1/middleware/cors.ts'

const db = new DB('stories.db')
const app = new Application()
const headersWhitelist = [
  'Authorization',
  'Content-Type',
  'Accept',
  'Origin',
  'User-Agent'
]
const PORT = 8080

app
  .use(cors({ allowHeaders: headersWhitelist, allowCredentials: true }))
  .get('/stories', async (server) => {
    const stories = [
      ...db.query('SELECT * FROM stories ORDER BY SCORE desc').asObjects()
    ]
    await server.json(stories)
  })
  .post('/stories', async () => {})
  .post('/stories/:id/votes', async (server) => {
    const { id } = server.params
    const { direction } = await server.body
    if (direction === 'down') {
      db.query(`UPDATE stories SET score = score -1 WHERE id = ?`, [id])
    } else {
      db.query(`UPDATE stories SET score = score +1 WHERE id = ?`, [id])
    }
  })
  .post('/stories/new', async (server) => {
    const { title, URL, SCORE } = await server.body
    db.query(
      `INSERT INTO stories(title,URL,created_at,updated_at,SCORE) VALUES (?,?,datetime('now'),datetime('now'),?)`,
      [title, URL, SCORE]
    )
    const stories = [
      ...db.query('SELECT * FROM stories ORDER BY SCORE desc').asObjects()
    ]
    await server.json(stories)
  })
  .start({ port: PORT })
console.log(`Server running on http://localhost:${PORT}`)
