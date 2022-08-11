const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const likeDao = require("./likeDao");

exports.likeCheck = async function (user_no, companyDuty_no) {
    const connection = await pool.getConnection(async (conn) => conn);
    //console.log('확인')
    const likeStatusCheck = await likeDao.selectLikeStatus(connection, user_no, companyDuty_no);
    connection.release();

    return likeStatusCheck;
};

// // 좋아요 status 체크 
// exports.statusCheck = async function (user_no, companyDuty_no) {
//     const connection = await pool.getConnection(async (conn) => conn);
//     const statusResult = await likeDao.selectStatus(connection, user_no, companyDuty_no);
//     connection.release();
  
//     return statusResult;
// };