
const { generateToken } = require("../helpers/tokens");
const { 
  vaildateEmail, 
  vaildateLength,
  vaildateUsername,
 } = require("../helpers/vaildation");
const User = require("../models/user");
const bcrypt = require("bcrypt");




// controllers/userController.js
exports.register = async (req, res) => {
  try{
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    //Vaildate email
    if(!vaildateEmail(email)){
      return res.status(400).json({
        message: "Invalid email address",
      });
    }
   

    //Check if email already exists
    const check = await User.findOne({email: email});
    if (check){
      return res.status(400).json({
        message:
         "This email address aleady exists, try with a different email address",
      });
    }

    //Vaildate first name length
    if (!vaildateLength(first_name,3,30)) {
      return res.status(400).json({
        message:
         "first name must between 3 and 30 characters",
    });
  }

  //Vaildate last name length
    if (!vaildateLength(last_name,3,30)) {
      return res.status(400).json({
        message:
        "last name must between 3 and 30 characters",
    });
  }

  //Vaildate password length
  if (!vaildateLength(password,6,40)) {
    return res.status(400).json({
      message:
       "password must be atleast 6 characters",
  });
}

//Encrypt password
const cryptedpassword = await bcrypt.hash(password,12);

//Generate a username
let tempUsername = first_name + last_name;
let newUsername = await vaildateUsername(tempUsername)


//Create and save the new user
    const user = await new User({
     first_name,
     last_name,
     email,
     password: cryptedpassword,
     username: newUsername,
     bYear,
     bMonth,
     bDay,
     gender,
    }).save();

    //generate email verification token
    const emailVerificationToken = generateToken(
      {id : user._id.toString()},
    "30m"
  );
  
  console.log(emailVerificationToken);

    res.json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }

};

// controllers/
