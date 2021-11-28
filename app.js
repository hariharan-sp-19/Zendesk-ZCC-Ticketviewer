var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var request = require('request');
var app = express();
var url = {
  "fetchTicketById" : "/api/v2/tickets/{ticketId}",
  "fetchTicketByPage" :  "/api/v2/tickets?page={pageCount}",
  "fetchTicketComments" : "/api/v2/tickets/{ticketId}/comments",
  "fetchAllUsers" : "/api/v2/users/show_many?ids={userIds}",

};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());
app.options('*', cors());  // enable pre-flight
app.use(express.static(process.cwd()+"/ticketviewerUI/dist/ticketviewerUI/"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app.listen(8000, () => console.log(`Listening on port ${8000}...`));

app.get("/",function(req,res){
  res.sendFile(process.cwd()+"/ticketviewerUI/dist/ticketviewerUI/index.html")
});

app.post("/fetch", function(req,res){
  var domain = req.body.domain;
  var username = req.body.username;
  var password = req.body.password;
  var urlPref = url[req.body.fetch];
  var isDomainValid = /^((https:\/\/){1})[a-zA-Z0-9\-\.]{3,}\.((zendesk){1})\.((com){1})?$/.test(domain);;
  if(username == null || password == null){
    res.send({"statusCode" : "200" , "body" : {"error" : "Please provide valid credentials"}});
    res.end();  
    return;
  }
  if(!isDomainValid){
    res.send({"statusCode" : "200" , "body" : {"error" : "Please enter a proper zendesk domain, a proper domain pattern looks something like this https://{subdomain}.zendesk.com"}});
    res.end();  
    return;
  }
  if(!url.hasOwnProperty(req.body.fetch)){
    res.send({"statusCode" : "200" , "body" : {"error" : "Please provide a valid fetch cmd"}});
    res.end();  
    return;
  }
  if(req.body.fetchId != null){
    urlPref = urlPref.replace("{ticketId}",req.body.fetchId);
  }
  if(req.body.pageCount != null){
    urlPref = urlPref.replace("{pageCount}",req.body.pageCount);
  }
  if(req.body.fetchId != null){
    urlPref = urlPref.replace("{userIds}",req.body.fetchId);
  }
  var options = {
    url: domain+urlPref,
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      'Authorization' : 'Basic '+ Buffer.from(username+":"+password).toString('base64')
    }
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send({"statusCode" : response.statusCode , "body" : JSON.parse(body)});
      res.end();
    } else {
      console.log("ERROR :"+error);
      console.log("request options :"+options);
      res.send({"statusCode" : response.statusCode , "body" : JSON.parse(body)});
      res.end();
    }
  });
});






