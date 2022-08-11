const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const profileProvider = require("./profileProvider");
const profileDao = require("./profileDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// 유저 프로필 수정
exports.editProfile = async function (user_no, name, email, phone) {
    try {

        const updateProfileParams = [name, email, phone, user_no];

        const connection = await pool.getConnection(async (conn) => conn);


        const editProfileResult = await profileDao.updateProfile(connection, updateProfileParams);
        //console.log(`수정된 유저의 프로필 : ${editProfileResult[0].insertId}`)
        

        connection.release(); // 할당 해제

        return response(baseResponse.PATCHPPROFILE_SUCCESS);

    } catch (err) {
        logger.error(`App - updateProfile Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 기본 이력서 선택 수정
exports.editBasicResume = async function (user_no, resume_no) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);

        const editBasicResult = await profileDao.updateBasicResume(connection, user_no, resume_no);

        connection.release(); // 할당 해제

        return response(baseResponse.PATCHBASICRESUME_SUCCESS);

    } catch (err) {
        logger.error(`App - updateProfile Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
