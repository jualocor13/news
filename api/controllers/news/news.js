const newModel = require('../../models/news');
const express = require('express');
const router = express.Router();
const route_utils = require('../../lib/routing/routeUtils');
const { request } = require('express');

router.route('/')

    .get(
        function (request, response, next) {
            const transform = {
                regexQuery: {
                    "title": "title"
                },
                textQuery: {
                    language: request.headers["accept-language"]
                }
            };
            const sortTransform = {
                _default: [['archiveDate', 1]]
            };
            const query = route_utils.filterQuery(request.query, transform, request.params);
            const options = {sort: []}
            options.sort = route_utils.sortQuery(request.query.sort, sortTransform, options.sort);
            route_utils.getAll(newModel, query, options, request, response, next)
        }
    )

    .post(
        function (request, response, next) {
            let newNewReq = request.body;
            newModel.findOne({
                title: newNewReq.title,
                author: newNewReq.author,
            }, function(err, newFound) {
                if (newFound) {
                    return response.status(409).json("This new is already added");
                }
                let newDBNew = new newModel();
                let newNew = newModel.mapObject(newDBNew, newNewReq);
                newNew.save(function (err){
                    if(err) {
                        return response.status(500).json(err)
                    } else {
                        response.status(201).json(newNew);
                    }
                })
            }
            )
        });

router.route('/:id')
    .patch(
        function(request, response, next) {
            let newToUpdate = new newModel();
            newToUpdate = request.body;
            let query = { '_id': newToUpdate._id};
            let newValue = {$set: {archived: true}}
            console.log(request.body);
            newModel.updateOne(query, newValue, function(err, res){
                if (err) console.log(err);
                else {
                    return response.status(200).json("Updated");
                }

            });
        }
    )
    .delete(
        function (request, response, next) {
            let id = request.params.id;
            let query = {'_id': id};
            newModel.deleteOne(query, function(err, obj) {
                if (err) {
                    console.log(err);
                    return resposnse.status(400).json(err)
                }
                console.log(id + " deleted");
            })
            return response.status(200).json("Deleted");
        }
    );
        
module.exports = router;

/* module.exports = {
    create: function(req, res, next) {
        newModel.create({
            title: req.body.title,
            description: req.body.description,
            data: req.body.date,
            content: req.body.content,
            author: req.body.author,
            archiveDate: Date.now()
        },
        function(err, result) {
            if (err)
                next (err);
            else
                res.json({
                    status:'Ok',
                    message: 'New new insert',
                    data: null
            })
        });
    }
} */