const Thought = require('../models/Thoughts');
const User = require('../models/User');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID'
         });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
      
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}