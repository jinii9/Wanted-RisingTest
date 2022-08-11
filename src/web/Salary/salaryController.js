const jwtMiddleware = require("../../../config/jwtMiddleware");
const salaryProvider = require("../../web/Salary/salaryProvider");
const salaryService = require("../../web/Salary/salaryService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 직무별 연봉 조회 API
 * [GET] /web/salary/:userId
 */
 exports.getSalary = async function (req, res) {
    /**
     * Path Variable : userId
     * Query String : jobCategoryId, dutyCategoryId
     */

    // // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    // const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴

    // const user_no = req.params.userId; 
    // console.log(userIdFromJWT, user_no)
    
    jobCategory_no = req.query.jobCategoryId;
    dutyCategory_no = req.query.dutyCategoryId;
    if(!jobCategory_no)
    return res.send(response(baseResponse.INITIALSETTING_JOB_EMPTY));
    if(!dutyCategory_no)
    return res.send(response(baseResponse.INITIALSETTING_DUTY_EMPTY));
    // // 비교
    // if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
    //     res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    // } else {
        const getSalaryResponse = await salaryProvider.getSalary(
            //user_no,
            jobCategory_no,
            dutyCategory_no
        );
        //return res.send(getLikeListResponse);
        return res.send(response(baseResponse.SALARY_SUCCESS, getSalaryResponse));
    //}
}

/**
 * API No. 2
 * API Name : 연봉 업그레이드 포지션 조회 API
 * [GET] /web/salary/salaryPosition
 */
 exports.getSalaryPosition = async function (req, res) {
    console.log('확인');
    const positionResult = await salaryProvider.retrievePosition();
    console.log(positionResult);
    return res.send(response(baseResponse.SALARY_POSITION_SUCCESS, positionResult));
}