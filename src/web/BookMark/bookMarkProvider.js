const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const bookMarkDao = require("./bookMarkDao");

exports.bookMarkCheck = async function (user_no, companyDuty_no) {
    const connection = await pool.getConnection(async (conn) => conn);
    //console.log('확인')
    const bookMarkStatusCheck = await bookMarkDao.selectBookMarkStatus(connection, user_no, companyDuty_no);
    connection.release();

    return bookMarkStatusCheck;
};