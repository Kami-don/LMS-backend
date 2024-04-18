const express = require('express')
const router = new express.Router()
const {
    getLatestData
} = require('../controller/testController')


router.get('/get', getLatestData)

module.exports = router
