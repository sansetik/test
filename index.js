let express = require("express")
let handlebars = require("express-handlebars")

let app = express()

app.get("/", (req, res)=>{
    res.send("ПРИВЕТ СУЧКА")

app.listen(3000, ()=>{
    console.log('Сервер запущен')
});