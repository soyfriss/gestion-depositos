const { Op } = require('sequelize');
const { Product } = require('../../db');

const isProductDuplicated = async (name, id = 0) => {
    const nameCondition = { [Op.iLike]: name };
    const idCondition = { [Op.ne]: id };
    const options = {
        where: { [Op.and]: [{ id: idCondition }, { name: nameCondition }] }
    };

    let product = await Product.findAndCountAll(options);

    return (product.count > 0);
}


module.exports = { isProductDuplicated };
