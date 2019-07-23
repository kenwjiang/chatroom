const controller = require('../controller/controller.js');

var path = require('path');


function verifyToken(req, res, next){
    console.log(req.headers.Authorization);
    if(!req.headers.Authorization){
        return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.Authorization.split(" ")[1];
    console.log(token);
    if (token === "null"){
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, "secretKey");
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next()
}

module.exports = function(app){
    //go to special route
    app.get('/specials', verifyToken, controller.special);

    // add user
    app.post('/register', controller.addUser);

    //check login
    app.post('/login', controller.login);

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}
