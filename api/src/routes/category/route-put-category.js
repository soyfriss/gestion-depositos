const { Router } = require('express');
const { editCategory } = require('../../controllers/category/controller-put-category');

const router = Router();

// PUT /categories/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const category = await editCategory(id, name);

            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
