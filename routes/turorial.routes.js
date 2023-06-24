const tutorials = require('../controllers/tutorial.controller.js');
const router = require('express').Router();

// Create the routes using the router object
router.post('/', tutorials.create);
// router.get('/', tutorials.findAll);
// router.get('/published', tutorials.findAllPublished);
// router.get('/:id', tutorials.findOne);
// router.post('/:id', tutorials.update);
// router.delete('/:id', tutorials.delete);
// router.delete('/', tutorials.deleteAll);

// Export the function that accepts the app object and sets up the routes
module.exports = (app) => {
  app.use('/api/tutorials', router);
};
