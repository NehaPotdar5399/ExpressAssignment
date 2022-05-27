const {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} = require("./middleware/validations/userValidation");
const fs = require("fs");
const express = require("express");
var mysql=require('mysql');
var connection=require('./config');

var createError = require("http-errors");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { Result } = require("express-validator");
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connection.connect(function(err)
{
    if(err) throw err;
    console.log('database connected!');
    
});





//empty object for inserting in users.json file
var addUserData = {
  completeUserData: [],
};

app.get("/api/user", (req, res) => {
  
  connection.query('select * from user',(err,rows,fields)=>
  {
    if(!err)
    res.send(rows);
    
  })

});
/*catch (err) {
  
  res.send('Error')
}*/




app.get("/api/user/:id", (req, res) => {
  try{
  connection.query('select * from user where id=?',[req.params.id],(err,rows,fields)=>
  {
    if(!err)
    res.send(rows);
    
  })
}
catch(err)
{
  res.send('Error');
}
});

//register route
app.post('/api/user/login', (req, res) => {
  var loginDetails=req.body;
  var flag=false;
  try
  {
  connection.query("select * from user",(err,result)=>{
    if(err) throw err;
    result.forEach((row)=>
    {
      if(row.email==loginDetails.email&& row.password==loginDetails.password)
      {
        res.send("user login successful");
        flag=true;
        return;
      }
    })
    if(!flag){
      res.status(404);
      res.send("User not found");
    }
    
  })
}
catch(err)
{
  res.send('Login failed');
}
});
  //console.log(req.body.body);
  

 /* connection.query('select * from login', (err, rows, fields) => {
       
          res.send('Inserted Id : ' + login.id);
      
     
  })*/



//login route
app.post('/api/user/signup', (req, res) => {
  //console.log(req.body.body);
  var user = req.body;
  //console.log(user);
  try
  {

  connection.query('insert into user values(?,?,?,?,?) ', [user.id, user.name, user.phone, user.email,user.password], (err, rows, fields) => {
      if (!err) {
        res.send('Signup successfull' +" " + 'inserted id:' + user.id);
          
          
      }
      else
          res.send(err);
  })
}
catch(err)
{
  res.send('Failed to Signup');
}
});

//update route
//update employee
app.put('/api/user/:id', (req, res) => {
  var user = req.body;
  try{
  
  connection.query('update user set name=?,phone=?,password=? where id=?', [user.name, user.contact,user.password,req.params.id], (err, rows, fields) => {
      if (!err) {
          res.send('Updated successfully');
      }
      else
          res.send('update failed');
  })
}
catch(err)
{
  res.send('Update failed');
}
});
//delete route
app.delete('/api/user/:id', (req, res) => {
  try{
    
  connection.query('delete from user where id=?', [req.params.id], (err, rows, fields) => {
      if (!err)
          res.send('Record deleted successfully.')
      else
          res.send(err);
  })
}
catch(err)
{
  res.send('Delete failed');
}
});

//server port
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...!`);
 
});
