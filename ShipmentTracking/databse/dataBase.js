const { Pool } = require("pg");

// koristim postgres bazu lokalno na racunalu u kojem su pohranjeni podaci
// sql naredbe za kreiranje tablica i umetanje podataka dosputni su unutar projekta pa se moze isprobati lokalno na svom racunalu nakon sto se instalira postgres baza
// napravio sam na ovaj nacin posto je trenutno za pokazivanje razumijevanja ove tehnike najjednostavnije...

// ovdje sam koristio postgres usera kao default superusera ali naravno moze se modificirat sve lokalno
const pool = new Pool({
  user: "postgres",
  database: "shipmenttracking",
  host: "localhost",
  password: "bayepodataka",
  port: "5434",
});

module.exports = {
  query: async (sql, params) => {
    try {
      const start = Date.now();
      let res = await pool.query(sql, params);
      const duration = Date.now() - start;
      console.log("Executed query", {
        sql,
        params,
        duration,
        rows: res.rowCount,
      });
      return res.rows;
    } catch (err) {
      console.log(err);
    }
  },
};
