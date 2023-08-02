import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "hotel",//Database name
    password: "12345678", //Your password postgresql
    port: 5432 // default port on postgresql
});


