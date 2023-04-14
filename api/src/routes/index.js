const { Router } = require('express');
const categoryRouter = require('./category');
const productRouter = require('./product');
const employeeRouter = require('./employee');
const userRouter = require('./user');
const deliveryNoteRouter = require('./delivery-note');
const supplierRouter = require('./supplier');
const purchaseRouter = require('./purchase-receipt');
const ticketRouter = require('./ticket');

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

module.exports = router;
