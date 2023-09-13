var express = require('express');
var router = express.Router();
const userModel = require("../models/userModel")
const taskModel = require("../models/taskModel")

const task = require('../models/taskModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page' });
});
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'signin page' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'signup page' });
});




router.post("/signup",async function (req,res,next){
  try{
    const newuser = new userModel(req.body);
    await newuser.save();
    res.redirect("/signin");

  }
  catch(error){
    res.send(error);

  }

})

router.post("/signin",async function (req,res,next){ 

  try {  const {username,password} = req.body;
    const user = await userModel.findOne({username});
  
    if(user === null){
      return res.send(`user not found <a href="/signin">signin</a>`)
    }
    if(user.password !== password){
      return res.send(`incorrect password <a href="/signin">signin</a>`)
    }
    // res.send(user);
    res.redirect("/Task-list");
  } catch (error) {
    res.send(error)
    
  }

})



router.get('/Task-create', function(req, res, next) {
  res.render('Task-create', { title: 'Task-create page' });

});
router.post("/Task-create",async function (req,res,next){ 

  try {  

    const {head, details, duedate} =  req.body;
    const doc = new taskModel({
       head,details,duedate
    })
    const result= await doc.save();



    
    res.redirect("/Task-list");


  } catch (error) {
    res.send(error)
    
  }

})


router.get('/Task-list',async function(req, res, next) {
  
  try{
    const dets = await taskModel.find();
    res.render('Task-list', { title: 'Task-list', dets });
  }
  
  catch(error){
    res.send(error)
  
  }
  
  });




  

router.get('/update/:id', async function(req, res, next) {
  try {
   const task = await taskModel.findById (req.params.id);
   res.render("update",{title:"Update",task})
  } catch (error) {
    res.send(error);
  }
 });
 
 
 router.post('/update/:id', async function(req, res, next) {
   try {
     await taskModel.findByIdAndUpdate (req.params.id,req.body);
    res.redirect("/Task-list");
   } catch (error) {
     res.send(error);
   }
  });
  
 

  
router.get('/delete/:id',async function(req, res, next) {
  
  try{
    await taskModel.findByIdAndDelete(req.params.id);
    res.redirect('/Task-list');
  }
  
  catch(error){
    res.send(error)
  
  }
  });
  
  
 








router.get("/forget-pass", function (req, res, next) {
  res.render("forget-pass", { title: "forget-pass" });
});

router.post("/forget-pass", async function (req, res, next) {
  try {
      const user = await userModel.findOne({ email: req.body.email });

      if (user === null) {
          return res.send(
              `User not found. <a href="/forget-pass">Forget Password</a>`
          );
      }
      res.redirect("/change-pass/" + user._id);
  } catch (error) {
      res.send(error);
  }
});



router.get("/change-pass/:id", function (req, res, next) {
  res.render("change-pass", {
      title: "Change Pass",
      id: req.params.id,
  });
});

router.post("/change-pass/:id", async function (req, res, next) {
  try {
      await userModel.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/signin");
  } catch (error) {
      res.send(error);
  }
});







module.exports = router;
