const express = require("express");
const router = express.Router();
const gamesController = require('../controller/games.controller')
const publisherController = require('../controller/publisher.controller');
const reviewController = require('../controller/review.controller');
const usersController = require('../controller/users.controller');

router.route("/games")
.get(usersController.authenticate, gamesController.getAll)
.post(gamesController.addOne);

router.route("/games/:gameId")
.get(gamesController.getOne)
.delete(gamesController.deleteOne)
.put(gamesController.updateOne);

router.route("/games/:gameId/publishers")
.get(publisherController.getPublishers)
.post(publisherController.addPublisher)
.put(publisherController.updatePublisher);

router.route("/games/:gameId/publishers/:pubId")
.delete(publisherController.deletePublisher)

router.route("/games/:gameId/reviews")
.get(reviewController.getReviews)
.post(reviewController.addReview)

router.route("/games/:gameId/reviews/:reviewId")
.get(reviewController.getOneReview)
.put(reviewController.updateReview)
.delete(reviewController.deleteReview);

router.route("/users")
.post(usersController.addUser);

router.route("/users/login").post(usersController.login);


module.exports = router;