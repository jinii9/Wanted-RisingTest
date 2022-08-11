const jwtMiddleware = require("../../../config/jwtMiddleware");
const bookMarkProvider = require("../../web/BookMark/bookMarkProvider");
const bookMarkService = require("../../web/BookMark/bookMarkService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 1
 * API Name : 북마크리스트 생성 API
 * [POST] /web/bookMarkList/:userId
 * body : companyDuty_no
 */
exports.postBookMarkList = async function (req, res) {
    /**
     * Path Variable : userId
     * Body: companyDuty_no 
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴
    
    const user_no = req.params.userId; 
    console.log(userIdFromJWT, user_no)
    const {companyDuty_no} = req.body;

    // 형식적 validation
    if(!companyDuty_no) return res.send(errResponse(baseResponse.LIKE_COMPANYDUTYNO_EMPTY)); 

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const postBookMarkListResponse = await bookMarkService.createBookMarkList(
            user_no,
            companyDuty_no
        );
        return res.send(postBookMarkListResponse);
    }
}

/**
 * API No. 2
 * API Name : 북마크리스트 삭제처리 API
 * [PATCH] /web/bookMarkList/:userId/status
 * body : companyDuty_no
 */
 exports.patchBookMarkList = async function (req, res) {
    /**
     * Path Variable : userId
     * Body: companyDuty_no 
     */

    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴

    const user_no = req.params.userId; 
    console.log(userIdFromJWT, user_no)
    const {companyDuty_no} = req.body;

    // 형식적 validation
    if(!companyDuty_no) return res.send(errResponse(baseResponse.LIKE_COMPANYDUTYNO_EMPTY)); 

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const patchBookMarkListResponse = await bookMarkService.patchBookMarkList(
            user_no,
            companyDuty_no
        );
        return res.send(patchBookMarkListResponse);
    }
}

/**
 * API No. 3
 * API Name : 북마크리스트 조회 API
 * [GET] /web/bookMarkList/:userId
 */
 exports.getBookMarkList = async function (req, res) {
    /**
     * Path Variable : userId
     */

    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴

    const user_no = req.params.userId; 
    console.log(userIdFromJWT, user_no)
 

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getBookMarkListResponse = await bookMarkService.getBookMarkList(
            user_no
        );
        //return res.send(getLikeListResponse);
        return res.send(response(baseResponse.GETBOOKMARKLIST_SUCCESS, getBookMarkListResponse));
    }
}
