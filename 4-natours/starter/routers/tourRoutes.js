const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');
const tourValidator = require('../validators/tourValidator');

//router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourValidator.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
