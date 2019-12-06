let express = require("express");
let handlebars = require("express-handlebars");
let bodyParser = require("body-parser");
let formidable = require("formidable");
let fs = require("fs");
const path = require("path");



let app = express();
let hbs =  handlebars.create({defaultLayout: 'main', extname: "hbs"});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static('files/2'));

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
let photourl1 = "String";
app.post("/process", (req, res)=>
{
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files)=>
    {
        await fs.rename(files.photo.path,  path.join(__dirname,"files","2",files.photo.name), ()=>{
            photourl1 = path.join(__dirname,"files","2",files.photo.name);
        });
        
        res.redirect(303, "/photo");
    });
    
});
app.get("/photo", (req, res)=>{
    res.render("photo", {
        photourl: photourl1
    });
    console.log(photourl1);
});
app.get('/about', function (req, res) {
    res.render('about', {
        text: "Привет ты кто такой"
    });
});


app.listen(3000, () => {
    console.log('Сервер запущен');
});