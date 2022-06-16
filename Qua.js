import express from "express";
import db_conn from "./db_conn/conn";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();
const port = 3600;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.sendFile("landing.html", { root: __dirname }));

routes(app);

app.listen(port, async () => {
  await db_conn();

  console.log(`Quick User Api started running on :${port}`);
});
