const { Product,
    InventoryCount,
    InventoryCountItem } = require('../../db');

const updateProductCountDate = async (productId, qtyCountDate, isDocumentCanceled, transaction) => {
    const product = await Product.findByPk(productId, { transaction });

    let lastQtyCountDate = qtyCountDate;
    if (isDocumentCanceled) {
        // Find the latest inventory count
        const options = {
            include: [
                {
                    model: InventoryCountItem,
                    where: { productId },
                    attributes: []
                }
            ],
            where: { status: 'Completed' },
            order: [['documentDate', 'DESC']],
            limit: 1,
            transaction
        }

        let inventoryCounts = await InventoryCount.findAll(options);
        if (inventoryCounts.length) {
            lastQtyCountDate = inventoryCounts[0].documentDate;
        } else {
            lastQtyCountDate = null;
        }
        console.log('inventoryCounts', inventoryCounts);
    }

    await product.update({
        lastQtyCountDate
    }, { transaction });

    return product;
}

module.exports = updateProductCountDate;
