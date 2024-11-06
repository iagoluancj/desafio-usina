const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.post('/', reviewsController.addReview);
router.get('/', reviewsController.getReviews);

router.get('/:id', reviewsController.getReviewById);

router.put('/:id', reviewsController.updateReview);

router.delete('/:id', reviewsController.deleteReview);

router.get('/categorized/:userId', reviewsController.getCategorizedReviews);

module.exports = router;
