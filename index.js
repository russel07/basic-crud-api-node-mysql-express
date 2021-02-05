const express     = require("express");
const bodyParser  = require("body-parser");
const cors        = require("cors");
const app         = express();
const db = require("./app/models");

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Request-Method", "POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.options('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

db.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});


app.get("/", (req, res) => {
    res.json({message: "Weolcome to Smarty Soft"});
});

//Include route
require("./app/routes/book.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
