// postgreSQL connection pool set-up

const { Pool }=require('pg');
const { database } = require('pg/lib/defaults');

const pool = new Pool( {
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'DorisZ912',
    database:'recipe-app'
})

module.exports = pool;