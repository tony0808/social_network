const { render } = require('ejs');
const Blog = require('../models/blog');
const User = require('../models/user');
const Profile = require('../models/profile');

const blog_home_page_get = function(req, res) {
    const user = res.locals.user;
    if (user.profile !== undefined) {
        Profile.findById(user.profile)
            .then((result) => {
                res.render('blog/home', {title:'My Personal Blog', profile:result});
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        res.render('blog/home', {title:'My Personal Blog'})
    }
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

const blog_edit_page_get = function(req, res) {
    Blog.findById(req.params.blog_id)
        .then((result) => {
            res.render('blog/blogs/blogEditForm', {title:'Edit Blog', blog:result});
        }) 
        .catch((err) => {
            console.log(err);
        });
}

const blog_edit_page_post = function(req, res) {
    Blog.findByIdAndUpdate(
        req.params.blog_id,
        {title:req.body.title, content:req.body.content}
    )
    .then((result) => {
        res.status(200).send('blog updated');
    })
    .catch((err) => {
        res.status(400).send('blog could not be updated');
    });
};

const all_blog_list_page_get = function(req, res) {
    let blog_arr = res.locals.user.blogs;
    let blog_counter = 0;
    let blog_list = [];
    for(index in blog_arr) {
        let blog_id = blog_arr[index];
        Blog.findOne({_id:blog_id})
            .then((result) => {
                blog_list.push(result);
                blog_counter += 1;
                if (blog_counter === blog_arr.length) {
                    res.render('blog/blogs/blogList', {title:'List of Blogs', blogs:blog_list});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if(blog_arr.length === 0) {        
        res.render('blog/blogs/blogList', {title:'List of Blogs'});
    }
};

const single_blog_list_page_get = function(req, res) {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blog/blogs/blogDetails', {title:'Blog Details', blog:result});
        })
        .catch((err) => {
            console.log(err);
        });
};

const single_blog_delete = function(req, res) {
    const blog_id = req.params.blog_id;
    const blog_arr = res.locals.user.blogs;
    // delete blog from blog collection
    Blog.findByIdAndDelete(blog_id) 
        .then((result) => {
            // delete blog from user's blog's array
            blog_arr.splice(blog_arr.indexOf(result._id), 1);
            User.findOneAndUpdate(
                res.locals.user._id,
                {blogs:blog_arr}
            )
            .then((result) => {
                res.status(200).send('blog deleted and user updated');
            })
            .catch((err) => {
                res.status(400).send('blog deleted but user could not be updated')
            })
        })
        .catch((err) => {
            res.status(400).send('blog could not be deleted');
        });
};

const blog_friends_page_get = function(req, res) {
    res.render('blog/friends', {title:'Friends'});
};

const blog_logout_get = function(req, res) {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
};

const blog_profile_get = function(req, res) {
    res.render('blog/profileForm', {title:'Create Profile'});
}

const blog_profile_post = function(req, res) {
    if (res.locals.user.profile !== undefined) {
        Profile.findByIdAndUpdate(
            res.locals.user.profile,
            {title:req.body['title'], content:req.body['content']}
        )
        .then((result) => {
            res.status(200).send('profile updated');
        })  
        .catch((err) => {
            res.status(400).send('profile could not be updated');
        })
    }
    else {
        req.body['author'] = res.locals.user._id;
        const newProfile = new Profile(req.body);
        newProfile.save()
            .then((result) => {
                User.updateOne(
                    {_id:res.locals.user._id},
                    {$push:{profile:newProfile._id}}
                )
                .then((result) => {
                    console.log('profile added to user');
                })
                .catch((err) => {
                    console.log(err);
                });
                res.status(200).send({profile:newProfile._id});
            })  
            .catch((err) => {
                console.log(err);
                res.status(400).send('some error occured saving profile to db');
            })
    }
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
                console.log('blog added to user array');
            })
            .catch((err) => {
                console.log(err);
            });
            res.status(200).send({blog:newBlog._id});
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('some error occured saving blog to db');
        });
};

module.exports = {
    blog_home_page_get,
    blog_setting_page_get,
    blog_blogs_page_get,
    blog_friends_page_get,
    blog_create_page_get,
    blog_create_page_post,
    all_blog_list_page_get,
    single_blog_list_page_get,
    single_blog_delete,
    blog_profile_get,
    blog_profile_post,
    blog_edit_page_get,
    blog_edit_page_post,
    blog_logout_get
}