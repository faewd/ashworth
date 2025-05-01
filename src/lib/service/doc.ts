import mongoose from "mongoose"

export type Doc<T> = mongoose.Document<mongoose.Types.ObjectId, unknown, T> & T & {
  _id: mongoose.Types.ObjectId;
}
