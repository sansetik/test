let express = require("express")
let handlebars = require("express-handlebars")



let app = express()

let hbs =  handlebars.create({defaultLayout: 'main', extname: "hbs"})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
 
app.get('/', function (req, res) {
    res.render('home')
})
app.get('/about', function (req, res) {
    res.render('about')
})

app.listen(3000, ()=>{
    console.log('Сервер запущен')
})