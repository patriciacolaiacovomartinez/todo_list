//***********My SQL Connection******** */

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_list'
});

connection.connect();

module.exports = connection;