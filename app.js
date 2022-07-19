
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/newblogDB", {useNewUrlParser: true});

const studentSchema = {
    name: String,
    gender: String,
    email: String,
    birthDate: String,
    address: String,
    pincode: Number,
    subject: String,
    percentage: Number,
    message: String
  }

const Student = mongoose.model("student", studentSchema);


app.get("/",(req,res)=>{
    res.render("form");
})

app.get("/author",(req,res)=>{
    Student.find({},(err,students)=>{
      res.render("author",{students:students});
    })
  })



app.post("/",(req,res)=>{
const student = new Student({
    name: req.body.namer,
    gender: req.body.genderr,
    email: req.body.emailr,
    birthDate: req.body.birthdater,
    address: req.body.addressr,
    pincode: req.body.pincoder,
    subject: req.body.subjectr,
    percentage: req.body.percentager,
    message: req.body.messager
})
student.save();
res.redirect("/")
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});