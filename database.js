const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

let dbPool = null;

async function dropCreatePopulateDb() {
  await dbPool.execute("DROP TABLE IF EXISTS quotes");
  await dbPool.execute(
    "CREATE TABLE quotes (id INT AUTO_INCREMENT PRIMARY KEY, movie VARCHAR(60), quote VARCHAR(255))"
  );
  await dbPool.execute(`INSERT INTO quotes (movie, quote)
    VALUES 
    ("The Godfather", "I'm gonna make him an offer he can't refuse."),
    ("Casablanca", "Here's looking at you, kid."),
    ("Star Wars", "May the Force be with you."),
    ("Gone with the Wind", "Frankly, my dear, I don't give a damn."),
    ("The Wizard of Oz", "There's no place like home."),
    ("Titanic", "I'm the king of the world!"),
    ("The Shawshank Redemption", "Get busy living or get busy dying."),
    ("The Dark Knight", "Why so serious?"),
    ("Forrest Gump", "Life is like a box of chocolates, you never know what you're gonna get."),
    ("Pulp Fiction", "Say what again, I dare you, I double dare you."),
    ("Gladiator", "What we do in life echoes in eternity."),
    ("The Matrix", "There is no spoon."),
    ("Braveheart", "They may take our lives, but they'll never take our freedom!"),
    ("A Few Good Men", "You can't handle the truth!"),
    ("Terminator 2: Judgment Day", "Hasta la vista, baby."),
    ("The Silence of the Lambs", "A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti."),
    ("Fight Club", "The first rule of Fight Club is: You do not talk about Fight Club."),
    ("The Lord of the Rings: The Fellowship of the Ring", "One ring to rule them all, one ring to find them, one ring to bring them all and in the darkness bind them."),
    ("The Shawshank Redemption", "Hope is a good thing, maybe the best of things, and no good thing ever dies."),
    ("Gladiator", "Are you not entertained?")
    `);
}

function initConnection() {
  try {
    dbPool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "testuser",
      password: process.env.DB_PASSWORD || "testuser",
      database: process.env.DB_NAME || "awap23-movie-quote-db",
      connectionLimit: 10,
    });
  } catch (err) {
    console.log(err);
  }
}

/*
  Example: 
    connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?", ['Morty", 14])
*/
async function executeQuery(query, params) {
  try {
    // MySQL2 provides execute helper which will prepare and query the statement.
    // Why are prepared statements good?
    // https://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks
    const [rows] = await dbPool.execute(query, params);
    return rows;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  dropCreatePopulateDb,
  initConnection,
  executeQuery,
};
