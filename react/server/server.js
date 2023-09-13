const express = require('express');
const bodyparser = require('body-parser')
var mongoDB = require('./mongo');
const app = express();
var mail = require('./mail');

app.use(bodyparser.json());

app.get('/api', (req,res) =>{
    res.json({"users": ["userOne", "userTwo", "userThree"]});
})

app.post('/api/locations', async (req, res) => {
    let location = req.body.location;
    try{
        let result = await mongoDB.connectFind(location); // Connect to mongo and query
        res.send(result); // send back to react
      } catch (error){
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      }
  });

  app.post('/api/submitProject', async (req, res) => {
    const { projectName, groupName, projectDescription, projectContact } = req.body;
    mail.sendEmail(
      projectContact, // To
      'New Project Submission for: ' + projectName, // Subject
      `Project Name: ${projectName}\nGroup Name: ${groupName}\nProject Description: ${projectDescription}\nContact: ${projectContact}`
    );
  });

  app.listen(5000, () => { console.log("Server is running on port 5000") });