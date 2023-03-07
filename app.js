

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const nodemailer = require("nodemailer");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutUsContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {homecontent: homeStartingContent, newArticle: posts});

});

app.get("/about", function(req, res){
  res.render("about", {aboutcontent : aboutUsContent});
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/compose", function(req,res){
  res.render("compose");
} );

app.post("/compose", function(req,res){
  const title = req.body.title;
  const content = req.body.content;
  const post = {
    titleofPost: title,
    articleContent: content
  };
  posts.push(post);
 
  res.redirect("/");
  
} );

app.get("/posts/:post", function(req, res){
  let postsPost = lodash.lowerCase(req.params.post);
  let foundPost = false;
  for (let i = 0; i< posts.length; i++){
    const eachPost = lodash.lowerCase(posts[i]["titleofPost"]);
    if (eachPost === postsPost){
      foundPost = true;
      res.render("post", 
      {composedPost: posts[i].titleofPost,
      composedcontent: posts[i].articleContent});
  
    };
 
  };

});

app.get("/failure", function(req, res){
  res.render("failure");
})

app.post("/contact", function(req, res) {
 
    res.render("MailSuccess");
  });





app.listen(3000, function(){
  console.log("Server started on port 3000");
});

