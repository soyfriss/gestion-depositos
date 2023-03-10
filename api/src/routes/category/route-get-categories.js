const { Router } = require('express');
const { getCategories } = require('../../controllers/category/controller-get-categories');

// GET /categories
const router = Router();
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { page, size, sort, filter } = req.query;
            const categories = await getCategories(page, size, sort, filter);

            res.status(200).json(categories);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
