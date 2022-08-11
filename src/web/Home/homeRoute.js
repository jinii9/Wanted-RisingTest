module.exports = function(app){
    const home = require('./homeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 메인 광고 배너 조회 API
    app.get('/web/home/advertisments', home.getAdvertisment);

    // 2. 커리어 인사이트 조회 API
    app.get('/web/home/insights', home.getInsights);

    // 3. 3분만에 읽는 아티클 조회 API
    app.get('/web/home/article', home.getArticle);

    // 4. 커리어 성장 이벤트 API
    app.get('/web/home/growthEvent', home.getGrowthEvent);

    // 5. VOD API
    app.get('/web/home/vod', home.getVod);
};
