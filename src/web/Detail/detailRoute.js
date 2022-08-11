module.exports = function(app){
    const detail = require('./detailController');
    const jwtMiddleware2 = require('../../../config/jwtMiddleware2');

    // 1. 기업 직무 디테일 조회 API
    app.get('/web/PostingDetail/:companyDutyId', detail.getDetailList);

};