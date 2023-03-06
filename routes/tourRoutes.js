const express = require('express');

const tourcontroller = require('../controllers/tourControllers');

const router = express.Router();

router.param('id', tourcontroller.checkID);

// Create a checkBody middleware function
// Check if the body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack
router.param('body', tourcontroller.checkBody);

// Tours
router
  .route('/')
  .get(tourcontroller.getAllTours)
  .post(tourcontroller.checkBody, tourcontroller.createTour);
router
  .route('/:id')
  .get(tourcontroller.getTour)
  .patch(tourcontroller.updateTour)
  .delete(tourcontroller.deleteTour);

module.exports = router;
