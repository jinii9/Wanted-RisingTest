module.exports = function(app){
    const bookMark = require('./bookMarkController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 북마크리스트 생성/수정 API
    app.post('/web/bookMarkList/:userId', jwtMiddleware, bookMark.postBookMarkList);
    
    // 2. 북마크리스트 삭제처리 API
    app.patch('/web/bookMarkList/:userId/status', jwtMiddleware, bookMark.patchBookMarkList);

    // 3. 북마크리스트 조회 API
    app.get('/web/bookMarkList/:userId', jwtMiddleware, bookMark.getBookMarkList);

};