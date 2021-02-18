module.exports = (app) => {
    const { validateToken } = require("../auth/auth");
    const users = require('../controllers/user.controller.js');
    const posts = require('../controllers/posts.controller')


app.post('/createpost',validateToken,posts.createpost);
app.get('/getPosts',validateToken,posts.getPosts);
app.post('/likepost',validateToken,posts.likepost);
app.post('/commentpost',validateToken,posts.commentpost);

}