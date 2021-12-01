const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

const dashboardRoutes = require('./dashboard-routes.js');

router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;