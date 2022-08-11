module.exports = function(app){
    const jobPosting = require('./jobPostingController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 채용중인 직무 조회 API
    app.get('/web/jobPostingList', jobPosting.getJobPosting);



};
