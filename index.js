let express = require("express");
let handlebars = require("express-handlebars");
let bodyParser = require("body-parser");
let formidable = require("formidable");
let fs = require("fs");


let app = express();
let hbs =  handlebars.create({defaultLayout: 'main', extname: "hbs"});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


/*
// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/itblog.top/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/itblog.top/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/itblog.top/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
*/


app.use(bodyParser.urlencoded({ extended: true }));

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
app.post("/process", (req, res)=>
{
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>
    {
        console.log("Фиелдс: " + fields);
        console.log("this is: " + files);            
        colsole.log(files.photo);
    });
    
});
app.get('/about', function (req, res) {
    res.render('about', {
        text: "Привет ты кто такой"
    });
});


app.listen(3000, () => {
    console.log('Сервер запущен');
});