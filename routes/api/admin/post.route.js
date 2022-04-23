const express = require("express");
const router = express.Router();

const postController = require("../../../controllers/admin/post.controller");
const adminMiddleware = require("../../../middlewares/admin.middleware");

router.get("/get_posts", adminMiddleware, postController.getAllPosts);
router.delete("/delete_post", adminMiddleware, postController.deletePostById);

module.exports = router;
