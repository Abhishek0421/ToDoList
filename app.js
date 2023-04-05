const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine' , 'ejs');
app.use(express.static("public"));

let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];



app.get("/",function(req,res){

    let today = new Date();
    
    let options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    let day = today.toLocaleDateString("en-US",options);
    res.render("list" ,{listTitle:day , newToDoitem:items});
})

app.post("/",function(req,res){
    let item = req.body.newToDo;
    console.log(req.body.list);
    if(req.body.list === "Works"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
})

app.get("/work",function(req,res){

    res.render("list",{listTitle:"Works" , newToDoitem:workItems});
});

app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000 , function(){
    console.log("server is Live");
});


