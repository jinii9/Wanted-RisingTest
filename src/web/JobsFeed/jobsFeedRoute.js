module.exports = function(app){
    const jobsFeed = require('./jobsFeedController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 채용 광고 배너 조회 API
    app.get('/web/jobsFeed/advertisments', jobsFeed.getAdvertisment);

    // 2. 태그별 회사 조회 API
    app.get('/web/jobsFeed/companyByTag', jobsFeed.getCompanyByTag);
    
    // 3. 요즘 뜨는 포지션 조회 API
    app.get('/web/jobsFeed/famousPosistion', jobsFeed.getFamusPosision);

};
