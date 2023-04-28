const { Product,
    DeliveryNote,
    DeliveryNoteItem,
    PurchaseReceipt,
    PurchaseReceiptItem,
    InventoryCount,
    InventoryCountItem } = require('../../db');

const updateStock = async (productId, quantity, transaction) => {
    const product = await Product.findByPk(productId, { transaction });

    await product.update({
        currentQty: product.currentQty + quantity
    }, { transaction });

    return product;
}

const updateStock2 = async (productId) => {
    // Get product qty from Purchase Receipts
    let options = {
        include: [
            {
                model: PurchaseReceipt,
                where: { status: 'Completed' },
                attributes: []
            }
        ],
        where: { productId }
    }

    const qtyByPR = await PurchaseReceiptItem.sum('quantity', options);
    console.log('PR qty', qtyByPR);

    // From Delivery Notes
    options = {
        include: [
            {
                model: DeliveryNote,
                where: { status: 'Completed' },
                attributes: []
            }
        ],
        where: { productId }
    }

    const qtyByDN = await DeliveryNoteItem.sum('quantity', options);
    console.log('DN qty', qtyByDN);

    // From Inventory Counts
    options = {
        include: [
            {
                model: InventoryCount,
                where: { status: 'Completed' },
                attributes: []
            }
        ],
        where: { productId }
    }

    const realQtyByIC = await InventoryCountItem.sum('realQty', options);
    console.log('IC real qty', realQtyByIC);

    const currentQtyByIC = await InventoryCountItem.sum('currentQty', options);
    console.log('IC current qty', currentQtyByIC);

    return qtyByPR - qtyByDN + realQtyByIC - currentQtyByIC;
}

module.exports = { updateStock, updateStock2 };

