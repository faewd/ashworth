import mongoose, { Model } from "mongoose"
import { ensureDB } from "../db"

export interface IUser {
  id: string;
  name: string;
  picture: string;
}

export const userSchema = new mongoose.Schema<IUser>({
  id: String,
  name: String,
  picture: String,
})

const db = await ensureDB()
export const User: Model<IUser> = db.models.user ?? db.model('user', userSchema)
