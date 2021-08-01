const router = require("express").Router();
const sequelize = require("../config/connection");
const { Blog, User, Comment } = require("../models");

//get all posts
router.get("/", (req, res) => {
  Blog.findAll({
    attributes: ["id", "title", "blog_text", "created_at"],
    include: [
      {
        model: Comment,
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogData) => {
      const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

      res.render("homepage", {
        blogs,
        // will later include logged in when adding sessions
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a single post
router.get("/blogs/:id", (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "blog_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["comment_text", "blog_id", "user_id", "created_at"],
        inculde: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogData) => {
      if (!dbBlogData) {
        res.status(404).json({ message: "No blog found with this id" });
        return;
      }
      const blog = dbBlogData.get({ plain: true });

      res.render("single-blog", {
        blog,
        //will include logged in when building session
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
