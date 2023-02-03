const Blog = require('../models/blog');
const User = require('../models/user');

const blog_home_page_get = function(req, res) {
    res.render('blog/home', {title:'My Personal Blog'});
};

const blog_setting_page_get = function(req, res) {
    res.render('blog/settings', {title:'Blog Settings'});
};

const blog_blogs_page_get = function(req, res) {
    res.render('blog/blogs/blogOptions', {title:'Manage Blogs'});
};

const blog_create_page_get = function(req, res) {
    res.render('blog/blogs/blogForm', {title:'Create new Blog'});
};

const blog_create_page_post = function(req, res) {
    req.body['author'] = res.locals.user._id;
    const newBlog = new Blog(req.body);
    newBlog.save()
        .then((result) => {
            User.updateOne(
                {_id:res.locals.user._id},
                {$push: {blogs:newBlog._id}}
            )
            .then((result) => {
                console.log('updated', );
            })
            .catch((err) => {
                console.log(err);
            });
            res.status(200).send({blog:newBlog._id});
        })
        .catch((err) => {
            res.status(400).send('some error occured');
        });
};

const blog_friends_page_get = function(req, res) {
    res.render('blog/friends', {title:'Friends'});
};

const blog_logout_get = function(req, res) {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
};

module.exports = {
    blog_home_page_get,
    blog_setting_page_get,
    blog_blogs_page_get,
    blog_friends_page_get,
    blog_create_page_get,
    blog_create_page_post,
    blog_logout_get
}