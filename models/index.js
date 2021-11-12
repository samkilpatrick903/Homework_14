const User = require('./user');
const Post = require('./post.js');
const Comment = require('./comment');

Post.belongsTo(User, {
    foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
onDelete: 'CASCADE'
})

Post.hasMany(Comment, {
  foreignKey: 'post_id',
onDelete: 'CASCADE'
})

module.exports = { User, Post, Comment };