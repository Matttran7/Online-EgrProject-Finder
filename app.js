const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(__dirname+"/view"));

app.get('/',function(req,res) {
    res.sendFile(__dirname+'/'+'index.html');
  });
/*app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
});
app.get('/script.js', function(req, res) {
    res.sendFile(__dirname + "/JS/" + "script.js");
});
app.get('/US_States.js', function(req, res) {
    res.sendFile(__dirname + "/JS/" + "US_States.js");
});*/

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');