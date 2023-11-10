const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
const db = require("./database");

app.use(cors());
db.initConnection();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/dropCreatePopulateDb", async (req, res) => {
  await db.dropCreatePopulateDb();
  res.send("Database dropped, created and populated");
});

app.get("/quotes/:count", async (req, res) => {
  const count = req.params.count;

  const randomQuotes = await db.executeQuery(
    "SELECT * FROM quotes ORDER BY RAND() LIMIT ?",
    [count]
  );

  res.json(randomQuotes);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
