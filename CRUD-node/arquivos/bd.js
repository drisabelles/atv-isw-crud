const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "isabelle13",
    database: "afazer_bd",
    host: "localhost",
    port: 5432
});

module.exports = pool;