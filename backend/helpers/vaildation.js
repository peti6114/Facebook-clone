const User = require("../models/user");


exports.vaildateEmail = (email) =>{
    return String(email).toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

exports.vaildateLength=(text,min,max) =>{
    if(text.length > max || text.length < min) {
        return false;
    }
    return true;
}

exports.vaildateUsername = async (username) => {
    let a = false;

    do {
        let check = await User.findOne({username});
        if(check){
            //change username
            username += (+new Date() * Math.random()).toString().substring(0, 1);
            a = true;
        }else {
            a = false;
        }
    }while (a);
    return username;
};