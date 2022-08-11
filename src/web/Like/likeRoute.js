module.exports = function(app){
    const like = require('./likeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 좋아요리스트 생성/수정 API
    app.post('/web/likeList/:userId', jwtMiddleware, like.postLikeList);
    
    // 2. 좋아요리스트 삭제처리 API
    app.patch('/web/likeList/:userId/status', jwtMiddleware, like.patchLikeList);

    // 3. 좋아요리스트 조회 API
    app.get('/web/likeList/:userId', jwtMiddleware, like.getLikeList);

};