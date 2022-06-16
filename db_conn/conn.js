import { MongoClient, ObjectId } from "mongodb";

let url = "mongodb://localhost:27017",
  db_name = "quick_user_api";

let client = new MongoClient(url);

let USERS;

let db_conn = async () => {
  await client.connect();

  const db = client.db(db_name);

  USERS = db.collection("users");

  console.log("DB is ready.");

  return;
};

export default db_conn;
export { USERS, ObjectId };
