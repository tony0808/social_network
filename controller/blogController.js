

const blog_home_page_get = function(req, res) {
    res.render('blog/home', {title:'My Personal Blog'});
};

const blog_setting_page_get = function(req, res) {
    res.render('blog/settings', {title:'Blog Settings'});
};

const blog_blogs_page_get = function(req, res) {
    res.render('blog/blogs', {title:'Manage Blogs'});
}

const blog_friends_page_get = function(req, res) {
    res.render('blog/friends', {title:'Friends'});
}

const blog_logout_get = function(req, res) {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

module.exports = {
    blog_home_page_get,
    blog_setting_page_get,
    blog_blogs_page_get,
    blog_friends_page_get,
    blog_logout_get
}