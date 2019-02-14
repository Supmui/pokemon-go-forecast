const { Client } = require("pg");
console.log("required");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect();

client.query("DROP TABLE IF EXISTS current_hour;", (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});

client.query("CREATE TABLE current_hour (hour INTEGER); ", (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});

client.query("INSERT INTO current_hour (-1); ", (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});

////////////////////////////////////////////////////////////////////////////////

client.query("DROP TABLE IF EXISTS key_counter;", (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});

client.query("CREATE TABLE key_counter (counter INTEGER); ", (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});

client.query("INSERT INTO key_counter (0); ", (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});

////////////////////////////////////////////////////////////////////////////////

client.query("DROP TABLE IF EXISTS current_data;", (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});

client.query("CREATE TABLE current_data (date_time VARCHAR(50), wind_speed REAL, icon_phrase VARCHAR(50)), loc_id INTEGER; ", (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});

client.end();