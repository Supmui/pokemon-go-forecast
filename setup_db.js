const { Client } = require("pg");
console.log("required");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect();

client.query("DROP TABLE IF EXISTS previous_hour; CREATE TABLE previous_hour (hour INTEGER);", (err, res) => {
  if (err) throw err;
  console.log(res.rows);
  client.end();
});