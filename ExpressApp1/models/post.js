﻿var mongodb = require('./db');

function Post(name, title, content,tag) {
    this.name = name;
    this.title = title;
    this.content = content;
    this.tag = tag;
}

module.exports = Post;

Post.prototype.save = function (callback) {
    var date = new Date();

    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    };

    var content = {
        name: this.name,
        time: time,
        title: this.title,
        content: this.content,
        tag: this.tag,
        id: date.getTime()
    };

    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('contents', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            collection.insert(content, { safe: true }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Post.get = function (name,callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('contents', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }

            var query = {};
            if (name) {
                query.name= name;
            }
            collection
                .find(query)
                .sort({ time: -1 })
                .toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, docs);
                });
        });
    });
};
Post.remove = function (blog_id, callback) {
    mongodb.open(function (err, db) {
        if (err) { return callback(err); }
        db.collection("contents", function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            collection.remove({ id: blog_id }, function (err, count) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, count);
            });
        });
    });
};
Post.update = function (blog_id, blog_title, blog_content, callback) {
    mongodb.open(function (err, db) {
        if (err) { return callback(err); }
        db.collection("contents", function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            collection.update({ id: blog_id },
                { $set: { title: blog_title, content: blog_content } },
                { safe: true, upsert: true },
                function (err, blog) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, blog);
                }
            );
        });
    });
};