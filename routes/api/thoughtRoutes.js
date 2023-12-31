const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  removeThought,
  createReaction,
  removeReactions
} = require('../../controllers/thoughtController');

// api/thoughts
router
  .route('/')
  .get(getThoughts)
  .post(createThought)

// api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought)

// api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions/')
  .post(createReaction)
  .delete(removeReactions);

module.exports = router;