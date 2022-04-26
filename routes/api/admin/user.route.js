const express = require("express");
const router = express.Router();

const userController = require("../../../controllers/admin/user.controller");

const adminMiddleware = require("../../../middlewares/admin.middleware");

router.get("/get_all_users", adminMiddleware, userController.getAllUsers);
router.delete(
    "/delete_user/:userId",
    adminMiddleware,
    userController.deleteUser
);

module.exports = router;
