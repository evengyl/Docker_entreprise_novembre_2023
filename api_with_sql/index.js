const express = require("express")
const app = express()
const mysql = require("mysql")

const connection = mysql.createPool({
    connectionLimit : 10,
    host : process.env.API_MYSQL_HOST,
    port : 3306,
    user : process.env.API_MYSQL_USER,
    password : process.env.API_MYSQL_PASSWORD,
    database : process.env.API_MYSQL_DATABASE
})

app.get("/", (req, res, next) => {
    connection.query("select * from student", (err, rows) => {
        if(err)
            res.json({ err })

        else
            res.json({ rows })
    })
})


app.get("/post", (req, res, next) => {
    connection.query("insert into student (student_name, student_age) values('random name', 30)", (err, rows) => {
        if(err)
            res.json({ err })

        else
            res.json({ rows })
    })
})


app.listen(3000, console.log(`server start on port : 3000`))