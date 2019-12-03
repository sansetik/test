let express = require("express");
let handlebars = require("express-handlebars");



let app = express();
app.disable("x-powered-by") //выключаем заголовок для распознавания того чтомы пишем сайт на Express
let hbs =  handlebars.create({defaultLayout: 'main', extname: "hbs"});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
 
app.get('/', function (req, res) {
    res.render('home',{
        title: "ITBLOG - лучший айти портал ",
        players: [
            {name: "Alex", age: 23, nubmer: 001},
            {name: "Galya", age: 20, nubmer: 002}
        ]
    });
});
app.get("/form", (req, res)=>{
    res.render("form", {});
});
app.post("/process", (req, res)=>{
    res.render("process", {});
});
app.get('/about', function (req, res) {
    res.render('about', {
        text: "Привет ты кто такой"
    });
});


app.listen(3000, () => {
    console.log('Сервер запущен');
});