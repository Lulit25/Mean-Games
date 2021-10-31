const mongoose = require("mongoose");
const Game = mongoose.model("Game");
const ObjectId = require('mongodb').ObjectId;

const getReviews = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function (err, doc) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500
            response.message = { "message": "Can not find reviews" };
        }
        else if (!doc) {
            response.status = 404
            response.message = { "message": " game does not exist" };
        }
        else {
            response.status = 200;
            response.message = doc.reviews;
        }
        res.status(response.status).json(response.message);
    });
}

const getOneReview = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    var review = null;
    Game.findById(gameId).select("reviews").exec(function (err, doc) {
        const response = { status: 204, message: [] };

        if (err) {
            console.log("error getting game");
            response.status = 500
            response.message = { "message": "Can not find review" };
        }
        else if (!doc) {
            response.status = 404
            response.message = { "message": " game does not exist" };
        }
        else {
            review = doc.reviews.id(reviewId);
            response.status = 200;
            response.message = review;
            console.log(review);
        }
        res.status(response.status).json(response.message);
    });
}

const _deleteReview = function (req, res, game, reviewId) {
    game.reviews.remove({ "_id": ObjectId(reviewId) });
    game.save(function (err, game) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500
            response.message = { "message": "Can not find game" };
        }
        else if (!game) {
            response.status = 404
            response.message = { "message": " game does not exist" };
        }
        else {
            response.status = 200;
            response.message = { "message": "Review deleted" }
        }
        res.status(response.status).json(response.message);

    });
}

const deleteReview = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select("reviews").exec(function (err, doc) {
        const response = { status: 204, message: [] };
        if (err) {
            console.log("error getting game");
            response.status = 500
            response.message = { "message": "Can not find review" };
        }
        else if (!doc) {
            response.status = 404
            response.message = { "message": " Review does not exist" };
        }
        if (doc) {
            _deleteReview(req, res, doc, reviewId);
            return;
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
}

const _addReview = function (req, res, game) {
    console.log(req.body.name);
    const newReview = {
        name: req.body.name,
        review: req.body.review,
    }
    console.log(newReview);
    game.reviews.push(newReview);
      game.save(function (err, game) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = game.reviews;
        }
        res.status(response.status).json(response.message);
    });
}
const addReview = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Get gameId ", gameId);
    Game.findById(gameId).select("reviews").exec(function (err, game) {
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
            _addReview(req, res, game);
            return;
        }
        else {
            res.status(response.status).json(response.message);
        }
    }
    );
}

const _updateReview = function (req, res, game, reviewId) {
    game.reviews.id(reviewId).name = req.body.name;
    game.reviews.id(reviewId).review = req.body.review;
    game.reviews.id(reviewId).date = req.body.date;
    game.markModified('reviews');
    game.save(function (err, game) {
        const response = { status: 204, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = game.reviews;
        }
        res.status(response.status).json(response.message);
    });
}

const updateReview = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
      Game.findById(gameId).select("reviews").exec(function (err, game) {
        const response = { status: 204, message: [] };
        if (err) {
            console.log("Error finding game");
            response.status = 500; 
            response.message = err;
        }
        else if (!game) {
            console.log("Game id not found in database", id);
            response.status = 404;
            response.message = { "message": "Game ID not found" + gameId };
        }
        if (game) {
            _updateReview(req, res, game, reviewId);
            return;
        }
        else {
            res.status(response.status).json(response.message);
        }
    }
    );
}

module.exports = {
    getOneReview: getOneReview,
    getReviews: getReviews,
    deleteReview: deleteReview,
    addReview: addReview,
    updateReview: updateReview
}