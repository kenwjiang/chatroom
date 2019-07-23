const mongoose = require('mongoose');
const model = require('../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    special: (req, res)=> {
        console.log("reached controller");
        let events = [
            {
                'id':1,
                name: "Kenny",
                age: 27
            },
            {
                'id':2,
                name: "K232ny",
                age: 25
            },
            {
                'id':3,
                name: "Ke12323nny",
                age: 21
            },
            {
                'id':4,
                name: "Kenn512y",
                age: 22
            },
            {
                'id':5,
                name: "Ke23nny",
                age: 22
            }
        ];
        res.json(events);
    },

    login: function(req, res){
        model.User.findOne({username: req.body.username}, function(err, user){
            if(err){
                console.log('Error', err);
                res.json(err);
            }
            else if(user === null){
                console.log('Error');
                res.json({message:"User doesnt exist!"});
            }else{
                bcrypt.compare(req.body.password, user.password, function(error, data) {
                    if(error){
                        console.log(error);
                        res.json(error);
                    } else {
                        let payload = {subject: data._id};
                        let token = jwt.sign(payload, "secretKey");
                        res.json({token});
                    }
            })
        }
    })
    },
    //create new task
    addUser: function(req, res){
        bcrypt.hash(req.body.password, 10, function(err, hash){
            if(err){
                console.log("Error Hashing password", err);
            }else{
                model.User.create({
                    username:req.body.username,
                    password: hash
                }, function(err, data){
                    if(err){
                        console.log('Error: ', err);
                        res.json({message:"Error", error:err});
                    }else{
                        let payload = {subject: data._id}
                        let token = jwt.sign(payload, "secretKey");
                        res.json({token});
                    }
                })
            }
        })
    },

    //find one
    findOne: function(req, res){
        model.Author.findOne({_id: req.params.id}, function(err, data){
            if(err){
                console.log("Error", err);
                res.json({message: "Error", error: err});
            } else {
                res.json(data);
            }
        })
    },

    update: function(req, res){
        model.Author.findOneAndUpdate({_id: req.body.id}, {$set:{
            name: req.body.name
        }}, {runValidators: true}, function(err, data){
            if(err){
                console.log('Error', err);
                res.json({message:"Error", error:err});
            } else {
                res.json(data);
            }
        })

    },

    remove: function(req, res){
        console.log(req.params.id);
        model.Author.remove({_id: req.params.id}, function(err, data){
            if(err){
                console.log("Error", err);
                res.json({message: "Error", error:err});
            }else {
                console.log('Success!');
                res.json(data);
            }
        })
    }
}
