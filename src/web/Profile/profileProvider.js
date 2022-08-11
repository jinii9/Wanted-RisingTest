const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const profileDao = require("./profileDao");


// 프로필 조회
exports.getProfile = async function (user_no) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const profileResult = await profileDao.selectProfile(connection, user_no);
    connection.release();

    return profileResult;
};

// 프로필-기본이력서 조회
exports.getProfileResume = async function (user_no) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const profileResumeResult = await profileDao.selectProfileResume(connection, user_no);
    connection.release();

    return profileResumeResult;
};

// 프로필-전문분야 조회
exports.getProfileSpecialty = async function (user_no) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const profileSpecialtyResult = await profileDao.selectProfileSpecialty(connection, user_no);
    connection.release();

    return profileSpecialtyResult;
};