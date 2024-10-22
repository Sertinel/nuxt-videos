import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  client: 'better-sqlite3',
  connection: {
    filename: join(__dirname, 'mydb.sqlite')
  },
  useNullAsDefault: true,
  migrations: {
    directory: join(__dirname, 'migrations')
  }
}