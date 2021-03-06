const User = require('../models/User');

// user handler
const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
          .populate({
              path: 'thoughts',
              select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
    },
    // get user by id
    getUserById({ params }, res) {
        User.findOne({_id: params.id})
          .populate({
              path: 'thoughts',
              select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => {
              // 404 err if no user is found
              if(!dbUserData) {
                  res.status(404).json({ message: "no user found with this id"});
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
    },
    // create the user
    createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json(err));
    },
    // update created user by id
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
           .catch(err => res.json(err))
    },
    // delete the created user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'no user found with this id' });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err))
    },
    // add a friend to the user by using user id
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // remove a users friend by using friend id
    deleteFriend( { params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};



module.exports = userController;