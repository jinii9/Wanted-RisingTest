const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const likeProvider = require("./likeProvider");
const likeDao = require("./likeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// 좋아요리스트 생성/수정
exports.createLikeList = async function (user_no, companyDuty_no) {
    try{
        // 의미적 validation 
        // 이미 좋아요가 추가되었습니다.
        const likeStatus = await likeProvider.likeCheck(user_no, companyDuty_no);
        //console.log(likeStatus[0].status)
        //console.log(likeStatus)
        if (likeStatus[0]) { 
            
            if(likeStatus[0].status === 'Y'){ //validation 처리
                console.log("추가된 좋아요")
                return response(baseResponse.LIKE_ALREADYEXIST); // status=N이라면 에러
            }
        } else {
            // 트랜잭션
            await connection.beginTransaction(); // 트랜잭션 적용 시작 
            const connection = await pool.getConnection(async (conn) => conn);
            
            // DB에서 좋아요가 이미 생성되어 있는지 여부 확인
            const likeRows = await likeProvider.likeCheck(user_no, companyDuty_no);
            if(likeRows.length > 0) {
                // status만 'Y'로 바꿔주기
                const updateLikeStatus = await likeDao.updateLikeStatus(connection, user_no, companyDuty_no);
                //console.log(`수정된 좋아요 상태 : ${updateLikeStatus[0].insertId}`)
            
            } else {
                // 새로 생성
                console.log(user_no, companyDuty_no)
                const createLikeStatus = await likeDao.createLikeStatus(connection, user_no, companyDuty_no);
                //console.log(`생성된 좋아요 리스트 : ${createLikeStatus[0].insertId}`)
            }
            
            // 좋아요리스트가 잘 되었다면, 기업 직무 likecount +1 해주기
            const likeCountResult = await likeDao.updateCompanyLikeCount(connection, companyDuty_no);
            
            await connection.commit(); // 트랜잭션 커밋 (DB에 한꺼번에 반영)
            connection.release();

            console.log('확인할까')
        return response(baseResponse.POSTLIKE_SUCCESS);
     }
    } catch (err) {
        await connection.rollback(); // 롤백
        logger.error(`App - createLike Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 좋아요리스트 삭제처리
exports.patchLikeList = async function (user_no, companyDuty_no) {
    try{
        // 이미 좋아요가 삭제되었습니다.
        const likeStatus = await likeProvider.likeCheck(user_no, companyDuty_no);
        console.log(likeStatus)
        console.log(likeStatus[0].status)
        if (likeStatus[0].status === 'N') { 
            console.log("삭제된 좋아요")
            return response(baseResponse.LIKE_ALREADYDELETE); // status=N이라면 에러
        
        } else {

            const connection = await pool.getConnection(async (conn) => conn);

            // status 'N'으로 바꿔주기
            const deleteLikeStatus = await likeDao.deleteLikeStatus(connection, user_no, companyDuty_no);

            connection.release();

            return response(baseResponse.PATCHLIKE_SUCCESS);
        }
    } catch (err) {
        logger.error(`App - patchLike Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 좋아요리스트 조회
exports.getLikeList = async function (user_no) {
    try{
        
        const connection = await pool.getConnection(async (conn) => conn);

        const LikeListResult = await likeDao.selectLikeList(connection, user_no);

        connection.release();

        return LikeListResult;
    } catch (err) {
        logger.error(`App - getLike Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

