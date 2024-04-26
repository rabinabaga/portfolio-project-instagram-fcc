const router = require('express')
.Router();
const authCtrl = require('./auth.controller')


router.post("/sign-up", authCtrl.signUp);

router.post("/login", authCtrl.login);

module.exports = router;