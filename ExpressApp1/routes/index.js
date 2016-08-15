var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');
module.exports = function (app) {
    app.get('/', function (req, res) {
        console.log("---------------------");
        Post.get(false, function (err, blogs) {
            if (err || !req.session.user) {
                            blogs = [];
                        }
                        res.render('index', {
                            title: '主页',
                            user: req.session.user,
                            blogs: blogs,
                            success: req.flash('success').toString(),
                            error: req.flash('error').toString()
                        });
                    });
    });

    app.get('/login', function (req, res) {
        //checkNotLogin(req, res);
        res.render('login', {
            title: '登录',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.get('/registe', function (req, res) {
        //checkNotLogin(req, res);
        res.render('registe', {
            title: '注册',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString() });
    });
    app.post('/login', function (req, res) {
        //checkNotLogin(req, res);
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');

        User.get(req.body.name, function (err,user) {
            if (err) {
                req.flash('error', '用户不存在');
                return res.redirect('/login');
            }
            if (user.password != password) {
                req.flash('error', '密码错误');
                return res.redirect('/login');
            }
            req.session.user = user;
            req.flash('success', '登录成功');
            res.redirect('/');
        });
    });
    app.post('/registe', function (req, res) {
        //checkNotLogin(req, res);
        var name = req.body.name;
        var password = req.body.password;
        var password_re = req.body.confirm;

        if (password != password_re) {
            req.flash('error', '两次输入密码不一样');
            console.log('两次输入密码不一样');
            return res.redirect('/registe');
        }

        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');
        var newUser = new User({
            name: name,
            password: password
        });

        User.get(newUser.name, function (err, user) {
            if (err) {
                console.log('geterr');
                req.flash('error', 'err');
                return res.redirect('/');
            }
            if (user) {
                console.log('用户已存在');
                req.flash('error', '用户已存在!');
                return res.redirext('/registe');
            }
            newUser.save(function (err, user) {
                if (err) {
                    console.log('saveerr');
                    req.flash('error', 'err');
                    return res.redirect('/registe');
                }
                req.session.user = newUser;
                req.flash('success','注册成功');
                res.redirect('/');
            });
        });
    });
    app.get('/post', function (req, res) {
        //checkLogin(req, res);
        res.render('post', { title:'发表'});
    });
    app.post('/post', function (req, res) {
        //checkLogin(req, res);
        var currentUser = req.session.user;

        var post = new Post(currentUser.name, req.body.title, req.body.content);
        post.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            req.flash('success', '发布成功');
            res.redirect('/');
        });
    })
    app.get('/logout', function (req, res) {
        //checkLogin(req, res);
        req.session.user = null;
        req.flash('success', '登出成功!');
        res.redirect('/');
    });
    function checkLogin(req, res) {
        if (!req.session.user) {
            req.flash('error', '未登录!');
            return res.redirect('/login');
        }
        
    }

    function checkNotLogin(req, res) {
        if (req.session.user) {
            req.flash('error', '已登录!');
            return res.redirect('back');//返回之前的页面
        }
        
    }
}