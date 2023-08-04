const express = require('express')
const userController = require('../controllers/user-controller')
const router = express.Router()

router.post('/user', userController.createUser)
router.put('/user', userController.updateUser)
router.delete('/user', userController.deleteUser)
router.post('/login', userController.findUser)

module.exports = router