const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add /user prefix for user routes
router.use('/users', userRoutes);
// add /thoughts prefix for thought routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;