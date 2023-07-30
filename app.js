const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Task 1","Task 2","Task 3"];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("pubic"));

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    const day = date.getDate(); 
    res.render("list", { listTitle: day, newListItem: items });
});

app.post("/", function (req, res) {
    const item = req.body.newItem;
    if(item.length !== 0)
        items.push(item);
        res.redirect("/");
});

app.get("/about", function(rwq, res) {
    res.render("about");
});

app.post("/delete", function (req, res) {
    const value  = req.body.delete
    items = items.filter(function (letter) {
        return letter !== value;
    });
        res.redirect("/");
})

app.listen(3000, function () {
    console.log("server is running on port 3000");
})
