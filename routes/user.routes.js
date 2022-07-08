const express = require('express');
const controller = require('../controllers/user.controller');
const router = express.Router();

router.get('/list', controller.listUser);

router.get('/:id', controller.retrieveUser);

router.post('/adduser',controller.adduser);

router.delete('/:id',controller.removeUser);

router.put('/update/:id',controller.updateUser);

router.post('/register',controller.registeruser);

router.post('/login',controller.loginuser);

router.post('/token/verify',controller.tokenVerify);

module.exports = { userRouter: router };