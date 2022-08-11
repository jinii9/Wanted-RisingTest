module.exports = function(app){
    const resume = require('./resumeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 이력서 생성 API
    app.post('/web/resume/:userId', jwtMiddleware, resume.postResume);

    // 2. 이력서 내용 조회 API
    app.get('/web/resume/:userId/:resumeId', jwtMiddleware, resume.getResume);

    // 3. 이력서 내용 수정 API
    app.put('/web/resume/:userId/:resumeId', jwtMiddleware, resume.patchResume);

    // 4. 이력서 삭제처리 API
    app.patch('/web/resume/:userId/:resumeId/status', jwtMiddleware, resume.patchResumeStatus);

    // 5. 이력서 리스트 조회 API
    app.get('/web/resumeList/:userId', jwtMiddleware, resume.getResumeList);
};