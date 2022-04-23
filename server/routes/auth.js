const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");


router.post('/signup',authController.userSignup );
router.post('/signin',authController.userLogin );
//jwt测试,成功则返还message,失败返还403
router.post('/testJwt',authController.testJwt );
router.get('/logout',authController.userLogout );

module.exports = router;