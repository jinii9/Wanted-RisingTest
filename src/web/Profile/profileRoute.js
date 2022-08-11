module.exports = function(app) {
    const profile = require('./profileController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 프로필 조회 API
    app.get('/web/profile/:userId', jwtMiddleware, profile.getProfile);

    // 2. 프로필 - 기본 이력서 조회 API
    app.get('/web/profile/:userId/resume', jwtMiddleware, profile.getProfileResume);

    // 3. 프로필 - 전문분야 조회 API
    app.get('/web/profile/:userId/specialty', jwtMiddleware, profile.getSpecialty);

    ///
    // 4. 프로필 정보 수정 API
    app.patch('/web/profile/:userId', jwtMiddleware, profile.patchProfile);

    // 5. 기본 이력서 선택 수정 API
    app.patch('/web/profile/:userId/:resumeId', jwtMiddleware, profile.patchBasicResume);

    // 6. 전문분야 수정 API
    
}