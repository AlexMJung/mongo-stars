var express = require('express');
var router = express.Router();
// bring in our Mongoose model
var Person = require('../models/person.schema.js');

router.get('/', function(req, res) {
   Person.find({}, function(err, data){
       if(err) {
           console.log('find error: ', err);
           res.sendStatus(500);
       } else {
        console.log('found data: ', data);        
        res.send(data);
       }
   });
});

//begining of search
router.get('/:search', function (req, res) {
    var PersonSearch = req.params.search;
    Person.find({name: PersonSearch}, function (err, data) {
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            console.log('found data: ', data);
            res.send(data);
        }
    });
});

router.post('/', function(req, res) {
    console.log('new person to store: ', req.body);

    // use model/constructor to make a Mongoose Object
    var personToSaveToTheCollection = new Person(req.body);

    // insert into our collection
    personToSaveToTheCollection.save(function(err, data) {
        console.log('saved to the collection: ', data);
        if(err) {
            console.log('save error: ', err);
            
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
        
    });
});


router.put('/:evilGoose', function (req, res) {
    var personId = req.params.evilGoose;
    console.log('new location', req.body);
    Person.findByIdAndUpdate(
        {_id: personId},
        { $set:{location: req.body.location} },
        function (err, data) {
            if (err) {
                console.log('update error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    )
});
//add points start
router.put('/:evilGoose/addPoints', function (req, res) {
    var personId = req.params.evilGoose;
    console.log('new location', req.body);
    Person.findByIdAndUpdate(
        { _id: personId },
        { $set: { internetPts: req.body.internetPts } },
        function (err, data) {
            if (err) {
                console.log('update error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    )
});
//add points stop

router.delete('/:id', function(req, res){
    Person.findByIdAndRemove(
        {_id:req.params.id},
        function(err, data){
            if (err) {
             console.log('delete error is:', err);
            }else{
                res.sendStatus(201);
            }
        }
    )
})

module.exports = router;