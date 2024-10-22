import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  client: 'sqlite3',
  connection: {
    filename: join(__dirname, 'db.sqlite3')
  },
  useNullAsDefault: true,
  migrations: {
    directory: join(__dirname, 'migrations')
  }
}