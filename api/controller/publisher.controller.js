const mongoose = require("mongoose");

const Game = mongoose.model("Game");
const ObjectId = require('mongodb').ObjectId;


const getPublishers = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, doc) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500
            response.message = { "message": "Can not find publisher" };
        }
        else if (!doc) {
            response.status = 404
            response.message = { "message": " game does not exist" };
        }
        else {
            response.status = 200;
            response.message = doc.publisher;
        }
        res.status(response.status).json(response.message);
    });
}

const _deletePublisher = function (req, res, game, pubId) {
    game.publisher.remove({ "_id": ObjectId(pubId) });
    game.save(function (err, game) {
        const response = { status: 204, message: [] };

        if (err) {
            console.log("Error finding game");
            response.status = 500
            response.message = { "message": "Can not find game" };
        }
        else if (!game) {
            response.status = 404
            response.message = { "message": " game does not exist" };
        }
        else {
            console.log("Publisher deleted");
            response.status = 200;
            response.message = { "message": "Publisher deleted" }
        }
        res.status(response.status).json(response.message);

    });
}

const deletePublisher = function (req, res) {
    const gameId = req.params.gameId;
    const pubId = req.params.pubId;
    Game.findById(gameId).select("publisher").exec(function (err, doc) {
        const response = { status: 204, message: [] };
        if (err) {
            console.log("error getting game");
            response.status = 500
            response.message = { "message": "Can not find publisher" };
        }
        else if (!doc) {
            response.status = 404
            response.message = { "message": " Publisher does not exist" };
        }
        if (!doc) {
            _deletePublisher(req, res, doc, pubId);
            return;
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
}

const _addPublisher = function (req, res, game) {
    game.publisher.name = req.body.name;
    game.save(function (err, game) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = game.publisher;
        }
        res.status(response.status).json(response.message);
    });
}
const addPublisher = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Get gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204, message: [] };
        if (err) {
            console.log("Error finding game");
            response.status = 500; response.message = err;
        }
        else if (!game) {
            console.log("Game id not found in database", id);
            response.status = 404; response.message = { "message": "Game ID not found" + gameId };
        }
        if (game) {
            _addPublisher(req, res, game);
            return;
        }
        else {
            res.status(response.status).json(response.message);
        }
    }
    );
}

const _updatePublisher = function (req, res, game) {
    game.publisher.name = req.body.name;
    game.save(function (err, game) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = game.publisher;
        }
        res.status(response.status).json(response.message);
    });
}
const updatePublisher = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Get gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204, message: [] };
        if (err) {
            console.log("Error finding game");
            response.status = 500; response.message = err;
        }
        else if (!game) {
            console.log("Game id not found in database", id);
            response.status = 404; response.message = { "message": "Game ID not found" + gameId };
        }
        if (game) {
            _updatePublisher(req, res, game);
            return;
        }
        else {
            res.status(response.status).json(response.message);
        }
    }
    );
}

module.exports = {
    getPublishers: getPublishers,
    deletePublisher: deletePublisher,
    addPublisher: addPublisher,
    updatePublisher: updatePublisher
}