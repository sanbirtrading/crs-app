const express = require('express');
const isAuthenticated = require('../config/isAuthenticated');
const isAdmin = require('../config/isAdmin');
const requestController = require('../controllers/request');

const router = express.Router();

router.post(
  '/ip/:user_id',
  isAuthenticated,
  requestController.postWhitelistRequest
);
router.post(
  '/server/:user_id',
  isAuthenticated,
  requestController.postServerRequest
);
router.get('/:id', isAuthenticated, requestController.getRequest);
router.get('/', isAuthenticated, requestController.getRequests);

module.exports = router;
