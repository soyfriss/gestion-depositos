const { DeliveryNote, Employee, DeliveryNoteItem } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const getDeliveryNote = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deliveryNote = await DeliveryNote.findByPk(id, { include: { all: true, nested: true } });

        res.status(httpStatusCodes.OK).json(deliveryNote);
    } catch (error) {
        next(error);
    }
}

module.exports = { getDeliveryNote };

