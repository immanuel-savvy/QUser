import { USERS, ObjectId } from "./db_conn/conn";

const Ok_stat = {
  status: 200,
  message: "ok",
};

const users = async (req, res) => {
  let ftch_users = await USERS.find();
  let users = await ftch_users.toArray();

  res.json(users);
};

const post = async (req, res) => {
  let { email, firstname, lastname } = req.body;

  let user = {
    email,
    firstname,
    lastname,
    created: new Date().getTime(),
  };

  await USERS.insertOne(user);

  res.json({
    ...Ok_stat,
    created: user.created,
  });
};

const update = async (req, res) => {
  // Update user firstname and lastname only.

  let { user } = req.params;
  if (!user) res.json({ invalid: true });

  let { firstname, lastname } = req.body;

  let update_token = new Object();
  if (firstname) update_token.firstname = firstname;
  if (lastname) update_token.lastname = lastname;

  await USERS.updateOne({ _id: ObjectId(user) }, { $set: update_token });

  res.json(Ok_stat);
};

const delete_ = async (req, res) => {
  let { user } = req.params;
  if (!user) res.json({ invalid: true });

  await USERS.deleteOne({ _id: ObjectId(user) });

  res.json(Ok_stat);
};

const routes = (app) => {
  /* GET */
  app.get("/users", (req, res) => users(req, res));
  /* POST */
  app.post("/user", (req, res) => post(req, res));
  /* UPDATE */
  app.put("/user/:user", (req, res) => update(req, res));
  /* DELETE */
  app.delete("/user/:user", (req, res) => delete_(req, res));
};

export default routes;
