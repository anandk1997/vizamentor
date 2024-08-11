import { env } from "@/lib/env/intex";
import mongoose from "mongoose";

const MONGODB_URI = env.MONGO_URI;

if (!MONGODB_URI) throw new Error("Mongo URI is required");

// @ts-ignore
let cached = global.mongoose;

// @ts-ignore
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
      console.log("You successfully Connected");

      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  console.log("connected to Mongoose");
  return cached.conn;
}
