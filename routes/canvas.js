const express = require('express')
const router = new express.Router()
const { getCourses, getContentById, getLecture, getTotal } = require('../controller/canvasController/canvasController')

router.get('/getcourses', getCourses)
router.get('/getcontentbyid', getContentById)
router.get('/gettotal', getTotal)
router.get('/getlecture', getLecture)
// router.post('/getmycourses', getMyCourses)

module.exports = router
