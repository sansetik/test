const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const formidable = require("formidable");
const http = require('http');
const https = require('https');
const fs = require("fs");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');






let app = express();
let hbs =  handlebars.create({defaultLayout: 'main', extname: "hbs"});



app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/files'));
app.use(cookieParser("fdsf5ds4fe88e4e4e4e8e8"));


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
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "fdsf5ds4fe88e4e4e4e8e8",
   }))
let logged = false




app.get('/', function (req, res) {
    console.log(req.session.Name)
    res.render('home',{
        login: req.session.Name,
        IsHome: true,
        logged: logged,
        title: "ITBLOG - лучший айти портал ",
        players: [
            {name: "Alex", age: 23, nubmer: 001},
            {name: "Galya", age: 20, nubmer: 002}
        ]
    })
})
//===
app.get("/news", (req, res)=>{
    res.render("news", {
        title: "ITBLOG: Новости",
        IsNews: true
    })
})
app.get("/statii", (req, res)=>{
    res.render("statii", {
        title: "ITBLOG: Статьи",
        IsStatii: true
    })
})
app.get("/uslugi", (req, res)=>{
    res.render("uslugi", {
        title: "ITBLOG: Услуги",
        IsUslugi: true
    })
})
app.get("/utiliti", (req, res)=>{
    res.render("utiliti", {
        title: "ITBLOG: Утилиты",
        IsUtiliti: true
    })
})
//====
app.get("/vhod", (req, res)=>{
    req.session.Name = "Alex"
    logged = true
    res.redirect(302, "/")
})
app.get("/exit", (req, res)=>{
    if(req.session.Name){
        delete req.session.Name
        logged = false
    }
    res.redirect(302, '/')
})
app.get("/form", (req, res)=>{
    res.render("form", {});
});
console.log(logged);
let photourl1 = "String";
app.post("/process", (req, res)=>
{
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files)=>
    {
        await fs.rename(files.photo.path,  path.join(__dirname,"files","2",files.photo.name), ()=>{
            photourl1 = files.photo.name;
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

const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, () => {
    console.log('HTTP Server running on port 80');
});
/*
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});*/