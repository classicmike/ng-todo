var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:mikaznhg@ds163758.mlab.com:63758/koramaiku_meantodos', ['todos']);

//get todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(error, todos){
        if(error){
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

//get single todo
router.get('/todos/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(error, todo){
        if(error){
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

//save

router.post('/todo', function(req, res, next){
var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//update
router.put('/todo/:id', function(req, res, next){
    var todo = req.body;
    var updObj = {};
    
    if(todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }

    if(todo.text){
        updObj.text = todo.text;
    }

    if(!updObj){
        res.staus(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id),
        }, updObj, {}, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});

//delete
router.delete('/todo/:id', function(req, res, next){
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id),
    }, '', function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    })
});


module.exports = router;