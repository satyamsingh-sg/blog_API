const express = require("express");
const authMiddleware = require("../../../middlewares/auth.middleware");
const postController = require("../../../controllers/v1/post.controller");
const upload = require("../../../middlewares/multer.middleware");
const {
    postImageCellsMiddleware,
    uploadToCloudinary,
} = require("../../../middlewares/post.middleware");
const router = express.Router();

router.get("/get_all_posts", postController.getPosts);
router.get("/get_posts", authMiddleware, postController.getPostsByUserId);
router.get(
    "/get_posts_by_userId/:userId",
    postController.getPostsByOtherUserId
);
router.get("/get_post/:postId", postController.getPostByPostId);
router.post(
    "/create_post",
    [
        authMiddleware,
        upload.any(),
        postImageCellsMiddleware,
        uploadToCloudinary,
    ],
    postController.createPost
);
router.put("/update_post", authMiddleware, postController.updatePost);
router.delete("/delete_post", authMiddleware, postController.deletePost);
router.put("/like_post", authMiddleware, postController.likeOrDislikeThePost);

module.exports = router;
