const router = require('express').Router();
const userRoutes = require('./user-routes');

// add /user prefix for user routes
router.use('/users', userRoutes);

module.exports = router;