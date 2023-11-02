const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

app.use(cors());

const quotes = [
  {
    movieName: "The Shawshank Redemption",
    quote: "Get busy living or get busy dying",
  },
  {
    movieName: "The Godfather",
    quote: "I'm going to make him an offer he can't refuse.",
  },
  {
    movieName: "The Dark Knight",
    quote: "Why so serious?",
  },
  {
    movieName: "The Godfather: Part II",
    quote: "Keep your friends close, but your enemies closer.",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/quotes/:count", (req, res) => {
  const count = req.params.count;

  let randomQuotes = [];
  for (let i = 0; i < count; i++) {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    randomQuotes.push(quotes[randomIndex]);
  }

  res.json(randomQuotes);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
