const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const detailDao = require("./detailDao");

// Provider: Read 비즈니스 로직 처리

// 광고 배너 목록 가져오기
exports.retrieveDetail = async function (user_no, companyDuty_no) {

    const connection = await pool.getConnection(async (conn) => conn);
    
    // 비회원용
    //if
    
    // 회원용
    const detailResult = await detailDao.selectDetail(connection, user_no, companyDuty_no);
    
    connection.release();

    return detailResult;
  
};