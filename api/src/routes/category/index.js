const { Router } = require('express');
const getCategories = require('./route-get-categories');
const getCategory = require('./route-get-category');
const postCategory = require('./route-post-category');
const putCategory = require('./route-put-category');

const router = Router();
router.use('/', getCategories);
router.use('/', getCategory);
router.use('/', postCategory);
router.use('/', putCategory);

module.exports = router;
