const updateCategories = async (product, categories, transaction) => {
    const productCategories = await product.getCategories({ transaction });

    // Edit categories
    await product.removeCategories(productCategories, { transaction });
    if (categories && categories.length) {
        await product.addCategories(categories, { transaction });
    }
}

module.exports = updateCategories;
