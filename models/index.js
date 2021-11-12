const User = require('./user.js');
const Post = require('./post.js');
const Comment = require('./comment.js');

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