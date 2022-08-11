const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const resumeDao = require("./resumeDao");
const {errResponse} = require("../../../config/response");
// // 이력서 식별값 get
// // resumeNoCheck(user_no, introduction, link, writing_status)
// exports.emailCheck = async function (user_no, introduction, link, writing_status) {
//     const connection = await pool.getConnection(async (conn) => conn);
//     const emailCheckResult = await userDao.selectUserEmail(connection, email);
//     connection.release();
  
//     return emailCheckResult;
//   };


// 이력서 status get statusCheck
exports.statusCheck = async function (user_no, resume_no) {
    const connection = await pool.getConnection(async (conn) => conn);
    const statusResult = await resumeDao.selectStatus(connection, user_no, resume_no);
    connection.release();
  
    return statusResult;
};


// 이력서 내용 조회
exports.getResume = async function (user_no, resume_no) {
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        
        // 이미 삭제된 이력서입니다.
        const resumeStatus = await resumeDao.selectStatus(connection, user_no, resume_no);
        console.log(resumeStatus[0].status)
        
        if (resumeStatus[0].status === 'N') { 
            console.log("삭제된 이력서")
            return 0; // status=N이라면 에러
        
        } else {
            // const connection = await pool.getConnection(async (conn) => conn);

            const resumeResult = await resumeDao.selectResume(connection, user_no, resume_no);

            connection.release();

            return resumeResult;
        }
    } catch (err) {
        logger.error(`App - getResumeDetail Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 이력서 리스트 조회
exports.getResumeList = async function (user_no) {
    try{
        
        const connection = await pool.getConnection(async (conn) => conn);

        const resumeResult = await resumeDao.selectResumeList(connection, user_no);

        connection.release();

        return resumeResult;
    } catch (err) {
        logger.error(`App - getResumeList Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
