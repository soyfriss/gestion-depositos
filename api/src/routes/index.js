const { Router } = require('express');
const categoryRouter = require('./category');
const productRouter = require('./product');
const employeeRouter = require('./employee');
const userRouter = require('./user');
const deliveryNoteRouter = require('./delivery-note');
const supplierRouter = require('./supplier');
const purchaseRouter = require('./purchase-receipt');
const ticketRouter = require('./ticket');
const profileRouter = require('./profile');
const inventoryRouter = require('./inventory-count');

// Test stock of a product
const { updateStock2 } = require('../controllers/stock/update-stock');

//Login & Logout
const passport = require('passport');
const { loginUser, logoutUser } = require('../controllers/auth/auth');

const router = Router();
router.use('/categories', categoryRouter);
router.use('/employees', passport.authenticate('jwt', { session: false }), employeeRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/delivery-notes', deliveryNoteRouter);
router.post('/login', passport.authenticate('local', { session: false }), loginUser);
router.post('/logout', passport.authenticate('jwt', { session: false }), logoutUser);
router.use('/suppliers', passport.authenticate('jwt', { session: false }), supplierRouter);
router.use('/purchase-receipts', passport.authenticate('jwt', { session: false }), purchaseRouter);
router.use('/tickets', ticketRouter);
router.use('/profile', passport.authenticate('jwt', { session: false }), profileRouter);
router.use('/inventory-counts', passport.authenticate('jwt', { session: false }), inventoryRouter);

// Test stock of a product
router.get('/stock/:productId', async (req, res) => {
    const { productId } = req.params;

    const qty = await updateStock2(productId);

    res.status(200).send(`Qty: ${qty}`);

})

module.exports = router;
