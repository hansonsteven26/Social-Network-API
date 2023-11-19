const User = require('../models/User');
const Thought = require('../models/Thoughts');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate({ path: 'friends', select: '-__v' })
        .populate({ path: 'thoughts', select: '-__v' });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      
      res.json({ message: 'User and thoughts deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add to user's friends list
  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user from friend's list
  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friend : { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};