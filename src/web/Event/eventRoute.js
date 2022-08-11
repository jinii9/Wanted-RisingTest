module.exports = function(app){
    const event = require('./eventController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 1. 이벤트 조회 API
    app.get('/web/event', event.getEvent);


};
