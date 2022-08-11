module.exports = function(app){
    const salary = require('./salaryController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    // 2. 연봉 업그레이드 포지션 API
    //app.get('/web/salary', salary.getSalaryPosition);
    app.get('/web/salary/salaryPosition', salary.getSalaryPosition);
    // 1. 직무별 연봉 조회 API
    app.get('/web/salary/:userId', salary.getSalary);

};
