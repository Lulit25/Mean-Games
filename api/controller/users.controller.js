const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

module.exports.addUser= function(req, res){
    console.log(req.body);

    bcrypt.genSalt(10, function(err, salt){
        if(err){
            console.log(err);
        }
        else{
            bcrypt.hash(req.body.password, salt, function(err, hashPassword){
                if(err){
                    console.log("password, salt", req.body.password);
                    console.log(err);
                }
                else{
                    const newUser={
                        username : req.body.username,
                        password:hashPassword,
                        name: req.body.name
                       }
                       User.create(newUser, function(err, response){
                           if(err){
                               console.log(err);
                           }
                           else{
                               console.log("user created");
                           }
                           res.status(200).json({"message": "user created"});
                       })
                }
            });
        }
    });
}

module.exports.login= function(req, res){
    console.log("in login");
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    User.findOne(username).exec(function(err, user){
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        if(user){
        console.log("user", user);
        console.log("user", password);
        console.log("user", user.password);
        if(bcrypt.compareSync(password, user.password)){
            console.log("user found");
            const mytoken = jwt.sign({name:user.name}, "cs571", {expiresIn:3600})
            res.status(200).json("Sucess");
        }
        else{
            console.log("password Incorrect");
            res.status(401).json("Unauthorized");

        }
        }
        else{
            console.log("user not found", user);
            res.status(401).json("Unauthorized");

        }
    })
}
module.exports.authenticate = function(req, res, next){
    const headerExists = req.headers.authorization;
    if(headerExists){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "cs571", function(err, decoded){
            if(err){
                res.status(401).json("Unauthorized");

            }
            else{
                next();
            }
        })
    }
    else{
        res.status(403).json("no token provided");
    }
}