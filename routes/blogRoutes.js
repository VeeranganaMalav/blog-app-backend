const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getAllBlogs, createBlog, deleteBlog, updateBlog, updateBlogLikes, updateBlogComments } = require("../controller/blogController");

const router = express.Router();

router.get("/blogs", authMiddleware, getAllBlogs);
router.post("/blogs", authMiddleware, createBlog);
router.patch("/blogs/:id", authMiddleware, updateBlog);
router.delete("/blogs/:id", authMiddleware, deleteBlog);
router.patch("/blogs/:id/like", authMiddleware, updateBlogLikes );
router.patch("/blogs/:id/comment", authMiddleware, updateBlogComments);

module.exports = router;