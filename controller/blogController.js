const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../model/user");
const Blog = require("../model/blog");

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET_KEY;
const tokenExpiration = process.env.TOKEN_EXPIRATION;

exports.getAllBlogs = async (req, res) => {
    try{
        console.log(req.user.email);
        // const user = await User.findOne({ email: req.user.email }).populate('blogs');

        if(req.user.email){
            const blogs = await Blog.find();
            res.status(200).send({blogs: blogs});
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.createBlog = async (req, res) => {
    try{
        if(req.user){
            const { title, content, category } = req.body;
            let createdBlog = await Blog.create({
                username: req.user.username,
                title,
                content,
                category,
                likes: 0,
                comments: []
            });

            if(!createdBlog){
                res.status(400).send("Error creating blog");
                return;
            }

            res.status(200).send({ message: "Blog created successfully", blog: createdBlog });
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.updateBlog = async (req, res) => {
    try{
        if(req.user){
            const { id } = req.params;
            
            let updatedBlog = await Blog.findByIdAndUpdate({_id: id}, req.body, {new: true});

            if(!updatedBlog){
                res.status(400).send("Error updating blog");
                return;
            }

            res.status(200).send({ message: "Blog updated successfully", blog: updatedBlog });
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.deleteBlog = async (req, res) => {
    try{
        if(req.user){
            const { id } = req.params;
            
            let deletedBlog = await Blog.findByIdAndDelete({ _id: id });

            if(!deletedBlog){
                res.status(400).send("Error deleting blog");
                return;
            }

            res.status(200).send({ message: "Blog deleted successfully", blog: deletedBlog });
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.updateBlogLikes = async (req, res) => {
    try{
        if(req.user){
            const { id } = req.params;

            let blog = await Blog.findById({ _id: id });

            let updatedBlogLikes = {
                likes: blog.likes + 1
            };
            
            let updatedBlog = await Blog.findByIdAndUpdate({_id: id}, updatedBlogLikes, {new: true});

            if(!updatedBlog){
                res.status(400).send("Error updating blog");
                return;
            }

            res.status(200).send({ message: "Blog likes updated successfully", blog: updatedBlog });
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}

exports.updateBlogComments = async (req, res) => {
    try{
        if(req.user){
            const { id } = req.params;

            let blog = await Blog.findById({ _id: id });

            let updatedBlogComments = {
                comments: blog.comments.push({ username: req.user.username, content: req.body.content })
            };
            
            let updatedBlog = await Blog.findByIdAndUpdate({_id: id}, updatedBlogComments, {new: true});

            if(!updatedBlog){
                res.status(400).send("Error updating blog");
                return;
            }

            res.status(200).send({ message: "Blog comments updated successfully", blog: updatedBlog });
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}