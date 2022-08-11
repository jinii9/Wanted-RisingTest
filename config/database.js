const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'db-wanted.cqe8er09ly3n.us-east-1.rds.amazonaws.com',
    user: 'admin',
    port: '3306',
    password: 'yseraphic8!',
    database: 'db_wanted'
});

module.exports = {
    pool: pool
};