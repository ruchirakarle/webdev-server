import "dotenv/config";
import mongoose from "mongoose";
import courses from "./Kambaz/Database/courses.json";
import modules from "./Kambaz/Database/modules.json";
import assignments from "./Kambaz/Database/assignments.json";
import users from "./Kambaz/Database/users.json";
import enrollments from "./Kambaz/Database/enrollments.json";

const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
await mongoose.connect(CONNECTION_STRING);
const db = mongoose.connection.db;

const data = { courses, modules, assignments, users, enrollments };
for (const [name, docs] of Object.entries(data)) {
  await db.collection(name).deleteMany({});
  await db.collection(name).insertMany(docs as any[]);
  console.log(`${name}: inserted ${(docs as any[]).length} documents`);
}
await mongoose.disconnect();
console.log("Done! Database:", CONNECTION_STRING);