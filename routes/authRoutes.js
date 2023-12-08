const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const authController = require("../controllers/authController");

router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    authController.signUp
);

router.post("/signin", authController.signIn);

router.post("/signout", authController.signOut);

module.exports = router;