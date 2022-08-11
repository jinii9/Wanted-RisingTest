const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const bookMarkProvider = require("./bookMarkProvider");
const bookMarkDao = require("./bookMarkDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// 좋아요리스트 생성/수정
exports.createBookMarkList = async function (user_no, companyDuty_no) {
    try{
        // 의미적 validation 
        // 이미 북마크가 추가되었습니다.
        const likeStatus = await bookMarkProvider.bookMarkCheck(user_no, companyDuty_no);
        //console.log(likeStatus[0].status)
        if(likeStatus[0]){    
            if (likeStatus[0].status === 'Y') { 
                console.log("추가된 북마크")
                return response(baseResponse.BOOK_ALREADYEXIST); // status=N이라면 에러
            }
        } else {
    
            const connection = await pool.getConnection(async (conn) => conn);

            // DB에서 좋아요가 이미 생성되어 있는지 여부 확인
            const bookMarkRows = await bookMarkProvider.bookMarkCheck(user_no, companyDuty_no);
            if(bookMarkRows.length > 0) {
                // status만 'Y'로 바꿔주기
                const updatebookMarkStatus = await bookMarkDao.updateBookMarkStatus(connection, user_no, companyDuty_no);

            } else {
                // 새로 생성
                console.log(user_no, companyDuty_no)
                const createBookMarkStatus = await bookMarkDao.createBookMarkStatus(connection, user_no, companyDuty_no);
    
            }

            connection.release();

            return response(baseResponse.POSTBOOKMARK_SUCCESS);
        }
    } catch (err) {
        logger.error(`App - createBookMark Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 좋아요리스트 삭제처리
exports.patchBookMarkList = async function (user_no, companyDuty_no) {
    try{
        // 의미적 validation 
        // 이미 좋아요가 추가되었습니다.
        const likeStatus = await bookMarkProvider.bookMarkCheck(user_no, companyDuty_no);
        console.log(likeStatus[0].status)
        if (likeStatus[0].status === 'N') { 
            console.log("삭제된 북마크")
            return response(baseResponse.BOOK_ALREADYDELETE); // status=N이라면 에러
        } else {

            const connection = await pool.getConnection(async (conn) => conn);

            // status 'N'으로 바꿔주기
            const deleteBookMarkStatus = await bookMarkDao.deleteBookMarkStatus(connection, user_no, companyDuty_no);

            connection.release();

            return response(baseResponse.PATCHBOOKMARK_SUCCESS);
        }
    } catch (err) {
        logger.error(`App - patchBOOKMARK Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 좋아요리스트 조회
exports.getBookMarkList = async function (user_no) {
    try{
        
        const connection = await pool.getConnection(async (conn) => conn);

        const BookMarkListResult = await bookMarkDao.selectBookMarkList(connection, user_no);

        connection.release();

        return BookMarkListResult;
    } catch (err) {
        logger.error(`App - getBookMark Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

