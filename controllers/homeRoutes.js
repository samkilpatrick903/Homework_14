const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: User,
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts: posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      //post include foreign key table User give the user information tied to the post
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/edit/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      //post include foreign key table User give the user information tied to the post
      include: [
        User,
        {
          //We also need to comment data so we call that model and say to include its foreign key for users
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render("edit", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/posts", withAuth, async (req, res) => {
  try {
    //Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {});
    const user = userData.get({ plain: true });
    console.log(user);
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("dashboard", {
      posts: posts,
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    //Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {});
    const identity = req.session.user_id;
    console.log(identity);
    const user = userData.get({ plain: true });
    console.log(user);
    const postData = await Post.findAll({
      where: {
        user_id: identity,
      },
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("dashboard", {
      posts: posts,
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

module.exports = router;
