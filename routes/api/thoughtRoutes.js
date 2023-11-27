const router = require('express').Router();

const {

} = require('../../controllers/thoughtController');

// api/thoughts
router
  .route('/')
  .get(getThoughts)
  .get(getSingleThought)
  .post(createThought)
  .put(updateThought)
  .delete(removeThought)

// api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(removeReaction)
