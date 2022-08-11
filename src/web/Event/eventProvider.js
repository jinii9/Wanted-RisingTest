const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const eventDao = require("./eventDao");
const {errResponse} = require("../../../config/response");
// 이벤트 목록 가져오기
exports.retrieveEvent = async function (InterestTagCategoryId, page_idx, size) {

    const connection = await pool.getConnection(async (conn) => conn);
    const eventResult = await eventDao.selectEvent(connection, InterestTagCategoryId, page_idx, size);
    connection.release();
    
    // console.log(eventResult.length);
    // if(eventResult.length == 0) return errResponse(baseResponse.PAGING_END);//return send(response(baseResponse.PAGING_END));
    
    return eventResult;
  
};
