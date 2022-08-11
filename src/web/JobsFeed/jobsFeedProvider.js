const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const jobsFeedDao = require("./jobsFeedDao");

// Provider: Read 비즈니스 로직 처리

// 광고 배너 목록 가져오기
exports.retrieveAdvertList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const advertListResult = await jobsFeedDao.selectAdvert(connection);
    connection.release();

    return advertListResult;
  
};

// 태그별 기업 가져오기
exports.retrieveCompanyByTag = async function () {

    const connection = await pool.getConnection(async (conn) => conn);

    //const companyByTagResult = [];
    companyByTagResult = await jobsFeedDao.selectcompanyByTag(connection);
    connection.release();

    // console.log(companyByTagResult[0]);
    // console.log(companyByTagResult[1]);
    return [companyByTagResult[0],companyByTagResult[1][0]];
  
};

// 요즘 뜨는 포지션 가져오기
exports.retrievePosition = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    positionResult = await jobsFeedDao.selectPosition(connection);
    connection.release();
    console.log(positionResult)
    return positionResult;
}



