const express =require('express')
const router =new express.Router()
const userController =require('../Controllers/userController')
const projectController =require('../Controllers/projectController')
const jwtMiddleware = require('../Middleware.js/jwtMiddleware')
const multerConfig = require('../Middleware.js/multerMiddleware')
//register
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)
router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)
router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)
router.get('/home-projects',projectController.getHomeProjects)
router.put('/edit-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editproject)
router.delete('/removeProject/:id',jwtMiddleware,projectController.removeProjects)
router.put('/edit-user',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)
//export router
module.exports =router
