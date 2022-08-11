module.exports = function(app){
    const search = require('./searchController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 검색 API /web/search?search_word=
    app.get('/web/search', search.getSearch); 

};
