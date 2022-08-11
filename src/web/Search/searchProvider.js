const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const searchDao = require("./searchDao");


// 검색 결과 가져오기
exports.retrieveSearch = async function (searchWord) {

    const connection = await pool.getConnection(async (conn) => conn);
    const searchResult = await searchDao.selectSearch(connection, searchWord);
    //console.log(searchResult);
    
    connection.release();

    return searchResult;
  
};