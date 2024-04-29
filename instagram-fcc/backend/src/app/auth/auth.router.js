const router = require('express')
.Router();
const checkAuthentication = require('../../middlewares/auth.middleware');
const authCtrl = require('./auth.controller')
checkAuthentication


router.post("/sign-up", authCtrl.signUp);

router.post("/login", authCtrl.login);
router.get("/suggested-profiles",checkAuthentication, authCtrl.getSuggestedProfiles)

module.exports = router;