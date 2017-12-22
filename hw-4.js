var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var User = function(id, fName, lName, title, gender, age) {
    this.id = id;
    this.fName = fName;
    this.lName = lName;
    this.title = title;
    this.gender = gender;
    this.age = age;
}

var users = [
        {id:1, fName:'Hege',  lName:"Pege", title:"Software Engineer", gender:"male", age:22},
        {id:2, fName:'Kim',   lName:"Pim", title:"Principle", gender:"female", age:45},
        {id:3, fName:'Sal',   lName:"Smith", title:"Project Manager", gender:"male", age:35 },
        {id:4, fName:'Jack',  lName:"Jones", title:"Senior Engineer", gender:"male", age:32 },
        {id:5, fName:'John',  lName:"Doe", title:"ME", gender:"male", age:30 },
        {id:6, fName:'Peter', lName:"Pan", title:"blacksmith", gender:"male", age:19 },
        {id:7, fName:'Hege',  lName:"Pege", title:"Software Engineer", gender:"male", age:22},
        {id:8, fName:'Kim',   lName:"Pim", title:"Principle", gender:"female", age:45},
        {id:9, fName:'Sal',   lName:"Smith", title:"Project Manager", gender:"male", age:35 },
        {id:10, fName:'Jack',  lName:"Jones", title:"Senior Engineer", gender:"male", age:32 },
        {id:11, fName:'John',  lName:"Doe", title:"ME", gender:"male", age:30 },
        {id:12, fName:'Peter', lName:"Pan", title:"blacksmith", gender:"male", age:19 },
        {id:13, fName:'Hege',  lName:"Pege", title:"Software Engineer", gender:"male", age:22},
        {id:14, fName:'Kim',   lName:"Pim", title:"Principle", gender:"female", age:45},
        {id:15, fName:'Sal',   lName:"Smith", title:"Project Manager", gender:"male", age:35 },
        {id:16, fName:'Jack',  lName:"Jones", title:"Senior Engineer", gender:"male", age:32 },
        {id:17, fName:'John',  lName:"Doe", title:"ME", gender:"male", age:30 },
        {id:18, fName:'Peter', lName:"Pan", title:"blacksmith", gender:"male", age:19 }];

var userId = users.length;
var port = process.env.PORT || 8888;

app.use(express.static(path.join(__dirname, '/static')));

var router = express.Router();
router.use(function(req, res, next) {
    // do logging
    console.log('Server running ' + req.url);
    next(); // make sure we go to the next routes and don't stop here
});

// get all users (accessed at GET http://localhost:8080/users)
router.get('/', function(req, res) {
    res.json(users);
});

// create user (accessed at POST http://localhost:8080/users)
router.post('/', function(req, res) {
    var user = createUser(req.body);
    users.push(user);
    res.json(user);
});

// get user by id (accessed at GET http://localhost:8080/users/:user_id)
router.get('/:user_id', function(req, res) {
    var id = Number(req.params.user_id);
    if (isNaN(id)) {
        res.status(400).send("User Id must be a number");
    } else {
        var target = findById(id);
        if (!target) {
            res.status(400).send("User not found");
        } else {
            res.json(target.user);
        }
    }
});

// update user by id (accessed at PUT http://localhost:8080/users/:user_id)
router.put('/:user_id', function(req, res) {
    var id = Number(req.params.user_id);
    if (isNaN(id)) {
        res.status(400).send("User Id must be a number");
    } else {
        var target = findById(id);
        if (!target) {
            res.status(400).send("User not found");
        } else {
            users[target.index] = updateUser(req.body, target.user);
            res.json(users[target.index]);
        }
    }
});

// delete user by id (accessed at DELETE http://localhost:8080/users/:user_id)
router.delete('/:user_id', function(req, res) {
    var id = Number(req.params.user_id);
    if (isNaN(id)) {
        res.status(400).send("User Id must be a number");
    } else {
        var target = findById(id);
        if (!target) {
            res.status(400).send("User not found");
        } else {
            users.splice(target.index, 1);
            res.json(target.user);
        }
    }
});

app.use('/users', router);

function findById(id) {
    let i = 0;
    for (let user of users) {
        if (user.id === id)  return {user : user, index : i};
        i++;
    }
    return null;
}

function createUser(user) {
    return new User(++userId, user.fName, user.lName, user.title, user.gender, user.age);
}

function updateUser(newUsr, oldUsr) {
    oldUsr.fName = newUsr.fName || oldUsr.fName;
    oldUsr.lName = newUsr.lName || oldUsr.lName;
    oldUsr.title = newUsr.title || oldUsr.title;
    oldUsr.gender = newUsr.gender || oldUsr.gender;
    oldUsr.age = newUsr.age || oldUsr.age;
    return oldUsr;
}

app.listen(port, function() {
    console.log('Express App started');
});