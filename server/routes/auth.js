const express = require("express");
const verifyToken = require("../middlewares/auth");
const { checkLogin, login, register } = require("../api/auth");

const router = express.Router();

// @route GET /api/auth
// @dest Check login
// @access Public
router.get("/", verifyToken, checkLogin);

// @route POST /api/auth/register
// @dest Register user
// @access Public
router.post("/register", register);

// @route POST /api/auth/login
// @dest Login user
// @access Public
router.post("/login", login);

module.exports = router;
