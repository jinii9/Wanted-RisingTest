const jwtMiddleware = require("../../../config/jwtMiddleware");
const likeProvider = require("../../web/Like/likeProvider");
const likeService = require("../../web/Like/likeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 1
 * API Name : 좋아요리스트 생성 API
 * [POST] /web/likeList/:userId
 * body : companyDuty_no
 */
exports.postLikeList = async function (req, res) {
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

        const postLikeListResponse = await likeService.createLikeList(
            user_no,
            companyDuty_no
        );
        console.log('response:' + postLikeListResponse);
        return res.send(postLikeListResponse);
         
    }
}

/**
 * API No. 2
 * API Name : 좋아요리스트 삭제처리 API
 * [PATCH] /web/likeList/:userId/status
 * body : companyDuty_no
 */
 exports.patchLikeList = async function (req, res) {
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
        const patchLikeListResponse = await likeService.patchLikeList(
            user_no,
            companyDuty_no
        );
        return res.send(patchLikeListResponse);
    }
}

/**
 * API No. 3
 * API Name : 좋아요리스트 조회 API
 * [GET] /web/likeList/:userId
 */
 exports.getLikeList = async function (req, res) {
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
        const getLikeListResponse = await likeService.getLikeList(
            user_no
        );
        //return res.send(getLikeListResponse);
        return res.send(response(baseResponse.GETLIKELIST_SUCCESS, getLikeListResponse));
    }
}
