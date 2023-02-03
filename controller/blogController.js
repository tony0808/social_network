

const blog_home_page_get = function(req, res) {
    res.render('blog/myBlog', {title:'My Personal Blog'});
};

const blog_setting_page_get = function(req, res) {
    res.render('blog/blogSettings', {title:'Blog Settings'});
};

const blog_logout_get = function(req, res) {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

module.exports = {
    blog_home_page_get,
    blog_setting_page_get,
    blog_logout_get
}