const mongoose = require("mongoose");
const Game = mongoose.model("Game");
const ObjectId = require('mongodb').ObjectId;

const runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    console.log("Geo serach lng ", lng, " lat ", lat);
    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: {
                        lng, lat
                    },
                    $maxDistance: 1000, // or 1000000
                    $minDistance: 0
                }
            }
        }
    }
    Game.find(query).exec(function (err, games) {
                if (err) {
                    console.log("Error ", err);
                }
                console.log("Found games", games);
                res.status(200).json(games);
            });
        };
        const getAll = function (req, res) {
            var offset = 0;
            var count = 5;
            const maxCount = 9;

            var count= 5;
        if (req.query && req.query.lat && req.query.lng) {
            runGeoQuery(req, res);
            return;
        }


            if (req.query && req.query.offset) {
                offset = parseInt(req.query.offset, 10);
            }
            if (req.query && req.query.count) {
                count = parseInt(req.query.count, 10);
            }
            if (isNaN(offset) || isNaN(count)) {
                res.status(400).json({ "message": "Offset and Count should be numbers" });
                return;
            }
            if (count > maxCount) {
                res.status(400).json({ "message": "Cannot exceed count of " + maxCount });
                return;
            }


            Game.find().skip(offset).limit(count).exec(function (err, games) {
                const response = { status: 204 };
                if (err) {
                    response.status = 500;
                    response.message = { "Message": "can not get games" };
                }
                else if (!games) {
                    response.status = 404;
                    response.message = { "Message": " games do not exist" };
                }
                else {
                    response.status = 200;
                    response.message = games;
                }
                res.status(response.status).json(response.message);

            });
        }

const getOne = function (req, res) {
            const gameId = req.params.gameId;

            Game.findById(gameId).exec(function (err, game) {
                const response = { status: 204 };
                if (err) {
                    response.status = 500;
                    response.message = { "Message": "can not get game" };
                }
                else if (!game) {
                    response.status = 404;
                    response.message = { "Message": " game does not exist" };
                }
                else {
                    response.status = 200;
                    response.message = game;
                }
                res.status(response.status).json(response.message);

            });
        }

const addOne = function (req, res) {
            const newGame = {
                title: req.body.title,
                price: req.body.price
            }

            Game.create(newGame, function (err, game) {
                const response = { status: 204 };
                if (err) {
                    console.log("Error creating games");
                    response.status = 500;
                    response.message = err;
                }
                else {
                    console.log("Game created", game);
                    response.status = 201;
                    response.message = { "message": "Game created" }
                }
                res.status(response.status).json(response.message);

            });
        }

const updateOne = function (req, res) {
            const gameId = req.params.gameId;
            Game.findById(gameId).select("-reviews -publisher").exec(function (err, game) {
                const response = { status: 204 };

                if (err) {
                    console.log("Error finding game");
                    response.status = 500;
                    response.message = err;
                }
                else if (!game) {
                    response.status = 404;
                    response.message = { "message": "Game ID not found" };
                }
                if (response.status !== 204) {
                    res.status(response.status).json(response.message);
                }

                else {
                    game.title = req.body.title;
                    game.year = parseFloat(req.body.year);
                    game.price = parseFloat(req.body.price);
                    game.designer = req.body.designer;
                    game.minPlayers = parseFloat(req.body.minPlayers);
                    game.maxPlayers = parseFloat(req.body.maxPlayers);
                    game.rate = parseFloat(req.body.rate);
                    game.minAge = parseFloat(req.body.minAge);

                    game.save(function (err, updatedGame) {
                        if (err) {
                            response.status = 500;
                            response.message = err;
                        }
                        else{
                            
                            response.status = 200;
                            response.message = updatedGame; 
                        
                        }                       
                        res.status(response.status).json(response.message);
                       
                    });
                }
            });
        };

        const deleteOne = function (req, res) {
            const gameId = req.params.gameId;
            console.log("DELETE gameId ", gameId);
            Game.findByIdAndRemove(gameId).exec(function (err, game) {
                const response = { status: 204 };
                if (err) {
                    console.log("Error finding game");
                    response.status = 500;
                    response.message = err;
                } else if (!game) {
                    response.status = 404;
                    response.message = { "message": "Game ID not found" };
                }
                res.status(response.status).json(response.message);
            });
        };


        module.exports = {
            getAll: getAll,
            getOne: getOne,
            addOne: addOne,
            updateOne: updateOne,
            deleteOne: deleteOne
        }