const router = require('express').Router();
const apiRoutes = require('./api');

// add /api prefix for api directory
router.use('/api', apiRoutes);

// returns error if server/site not working
router.use((req, res) => {
  res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;