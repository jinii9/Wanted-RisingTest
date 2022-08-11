const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const homeDao = require("./homeDao");

// Provider: Read 비즈니스 로직 처리

// 광고 배너 목록 가져오기
exports.retrieveAdvertList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const advertListResult = await homeDao.selectAdvert(connection);
    connection.release();

    return advertListResult;
  
};

// 인사이트 목록 가져오기
exports.retrieveInsightsList = async function (InterestTagCategoryId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const insightsListResult = await homeDao.selectInsights(connection, InterestTagCategoryId);
    connection.release();

    return insightsListResult;
  
};

// 3분만에 읽는 아티클 목록 가져오기
exports.retrieveArticle = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const articleResult = await homeDao.selectArticle(connection);
    connection.release();

    return articleResult;
  
};

// 커리어 성장 이벤트 리스트 가져오기
exports.retrieveGrowth = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const growthResult = await homeDao.selectGrowth(connection);
    connection.release();

    return growthResult;
  
};

// Vod 리스트 가져오기
exports.retrieveVod = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const vodResult = await homeDao.selectVod(connection);
    connection.release();

    return vodResult;
  
};



