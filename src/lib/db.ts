import mongoose, { Connection } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (MONGODB_URI === undefined || MONGODB_URI.length === 0) {
  throw new Error("No DATABASE_URL set.")
}

let conn: Connection | null = null

export async function ensureDB(): Promise<Connection> {
  if (conn !== null) return conn
  const cnx = await mongoose.connect(MONGODB_URI!, {
    authSource: "admin",
  })
  conn = cnx.connection

  return conn
}
