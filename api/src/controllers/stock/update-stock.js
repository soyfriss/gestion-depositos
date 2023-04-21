const { Product } = require('../../db');

const updateStock = async (productId, quantity, transaction) => {
    const product = await Product.findByPk(productId, { transaction });

    await product.update({
        currentQty: product.currentQty + quantity
    }, { transaction });

    return product;
}

module.exports = updateStock;

