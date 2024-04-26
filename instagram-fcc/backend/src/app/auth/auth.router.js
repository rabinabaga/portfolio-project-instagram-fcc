const router = require('express')
.Router();
const authCtrl = require('./auth.controller')


router.post("/sign-up", authCtrl.signUp);

module.exports = router;