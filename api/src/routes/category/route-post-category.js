const { Router } = require('express');
const { createCategory } = require('../../controllers/category/controller-post-category');

const router = Router();

// POST /categories
router.post(
    '/',
    async (req, res, next) => {
        try {
            const { name } = req.body;
            const category = await createCategory(name);

            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
