const router = require('express');

// functions from user controller
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// routes to get all user, create new users
router.route('/').get(getAllUsers).post(createUser);

// routes to get single user, update user, delete user
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// routes to add new friend, delete friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;