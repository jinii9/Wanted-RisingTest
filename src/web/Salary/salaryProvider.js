const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const salaryDao = require("./salaryDao");

// 직군별 연봉 조회
exports.getSalary = async function (jobCategory_no, dutyCategory_no) {
    try{
        
        const connection = await pool.getConnection(async (conn) => conn);

        const salaryResult = await salaryDao.selectSalary(connection, jobCategory_no, dutyCategory_no);

        connection.release();

        return salaryResult;
    } catch (err) {
        logger.error(`App - getSalary Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 연봉 업그레이드 포지션 가져오기
exports.retrievePosition = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    positionResult = await salaryDao.selectPosition(connection);
    connection.release();
    console.log(positionResult)
    return positionResult;
}