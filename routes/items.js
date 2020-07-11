var express = require('express');
var router = express.Router();

const Item = require('../models/items')

// At /items


// Get all Items

router.get('/', function (req, res) {
    Item
        .find()
        .lean()
        .exec((err, data) => {
            if (err) {
                res.send('error')
            } else {
                res.json(data)
            }
        })
});

// Create a new Item

router.post('/', (req, res) => {
    var item = new Item({
        itemText: req.body.text
    })

    item.save((err, data) => {
        if (err) {
            console.log(err)
            res.send('error')
        } else {
            console.log("save success")
            res.send(data)
        }
    })
})



router.delete('/', (req, res) => {
    console.log(req)
    Item
        .where('_id').equals(req.params._id)
        .remove()
        .exec((err, data) => {
            if (err) {
                res.send("error: ", err)
            } else {
                res.json(data)
            }
        })
})

module.exports = router;
