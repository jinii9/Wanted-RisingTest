const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const resumeProvider = require("./resumeProvider");
const resumeDao = require("./resumeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// 이력서 생성
exports.createResume = async function (user_no, introduction, company_career, school, link, writing_status) {
    try{
        // 의미적 validation 

        // // DB에서 좋아요가 이미 생성되어 있는지 여부 확인
        // const likeRows = await likeProvider.likeCheck(user_no, companyDuty_no);
        // if(likeRows.length > 0) {
        //     // status만 'Y'로 바꿔주기
        //     const updateLikeStatus = await likeDao.updateLikeStatus(connection, user_no, companyDuty_no);
        //     //console.log(`수정된 좋아요 상태 : ${updateLikeStatus[0].insertId}`)
        // } else {
            // 새로 생성
            //console.log(introduction, company_career, school, link, writing_status);
        const connection = await pool.getConnection(async (conn) => conn);    


        // 이력서 name 넣기 위해 해당 유저의 이력서 수 가져오기 + 1
        const selectResumeCount = await resumeDao.selectResumeCount(connection, user_no);
        console.log('해당 유저의 이력서 수 : ' + selectResumeCount);
        const resumeName = selectResumeCount + 1;

        const createResumeResult = await resumeDao.createResume(connection, user_no, resumeName, introduction, link, writing_status);
        
 
        
        // resume 식별값 얻기
        //const resumeNoRows = await resumeProvider.resumeNoCheck(user_no, introduction, link, writing_status);
        
        
        const resumeNo = `${createResumeResult[0].insertId}`;        
        console.log("이력서 식별값 : " + resumeNo)

        const createResumeRest = await resumeDao.createResumeRest(connection, user_no, resumeNo, company_career, school);
        
   
        //}

        connection.release();

        return response(baseResponse.POSTRESUME_SUCCESS);
    } catch (err) {
        logger.error(`App - createResume Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 이력서 내용 수정
exports.patchResume = async function (user_no, resume_no, introduction, company_career, school, link, writing_status) {
    try{
        // 의미적 validation 
        // 이미 삭제된 이력서입니다.
        const resumeStatus = await resumeProvider.statusCheck(user_no, resume_no);
        console.log(resumeStatus[0].status)
        if (resumeStatus[0].status === 'N') { 
            console.log("삭제된 이력서")
            return 0;// status=N이라면 에러
        
        } else {

            const connection = await pool.getConnection(async (conn) => conn);    

            const updateResumeResult = await resumeDao.updateResume(connection, user_no, resume_no, introduction, company_career, school, link, writing_status);

            connection.release();

            return response(baseResponse.PATCHRESUME_SUCCESS);
        }
    } catch (err) {
        logger.error(`App - patchResume Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 이력서 삭제처리
exports.patchResumeStatus = async function (user_no, resume_no) {
    try{
        // 의미적 validation 
        // 이미 삭제된 이력서입니다.
        const resumeStatus = await resumeProvider.statusCheck(user_no, resume_no);
        console.log(resumeStatus[0].status)
        if (resumeStatus[0].status === 'N') { 
            console.log("삭제된 이력서")
            return 0;// status=N이라면 에러
        
        } else {
            const connection = await pool.getConnection(async (conn) => conn);    

            const updateResumeStatusResult = await resumeDao.updateResumeStatus(connection, user_no, resume_no);

            connection.release();

            return response(baseResponse.DELETERESUME_SUCCESS);
        }
    } catch (err) {
        logger.error(`App - patchResumeStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
