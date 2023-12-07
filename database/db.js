const mysql = require('mysql');
const conexion = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

conexion.connect((error)=>{
    if (error) {
        throw error;
    } else {
        console.log(`Base de datos conectada`);
    }
})

module.exports = conexion