const jwtMiddleware = require("../../../config/jwtMiddleware");
const profileProvider = require("../../web/Profile/profileProvider");
const profileService = require("../../web/Profile/profileService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 프로필 조회 API
 * [GET] /web/profile/:userId
 */
 exports.getProfile = async function (req, res) {
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
        const getProfileResponse = await profileProvider.getProfile(
            user_no
        );
        //return res.send(getLikeListResponse);
        return res.send(response(baseResponse.PROFILE_SUCCESS, getProfileResponse));
    }
}

/**
 * API No. 2
 * API Name : 프로필 - 기본 이력서 조회 API
 * [GET] /web/profile/:userId/resume
 */
 exports.getProfileResume = async function (req, res) {
    /**
     * Path Variable : userId
     */

    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴
    const user_no = req.params.userId;

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getProfileResumeResponse = await profileProvider.getProfileResume(
            user_no
        );
        //return res.send(getLikeListResponse);
        return res.send(response(baseResponse.PROFILE_RESUME_SUCCESS, getProfileResumeResponse));
    }
}

/**
 * API No. 3
 * API Name : 프로필 - 전문분야 조회 API
 * [GET] /web/profile/:userId/specialty
 */
 exports.getSpecialty = async function (req, res) {
    /**
     * Path Variable : userId
     */

    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴
    const user_no = req.params.userId;

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getProfileSpecialtyResponse = await profileProvider.getProfileSpecialty(
            user_no
        );
        //return res.send(getLikeListResponse);
        return res.send(response(baseResponse.PROFILE_SPECIALTY_SUCCESS, getProfileSpecialtyResponse));
    }
}

////////////////////// 수정(patch) ////////////////////////////
/**
 * API No. 4
 * API Name : 프로필 정보 수정 API
 * [POST] /web/users/:userId
 * body : name, email, phone
 */
 exports.patchProfile = async function (req, res) {
    /**
     * Path Variable : userId
     * Body: name, email, phone
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId // jwt(req.header['x-access-token])로부터 id 가져옴

    const user_no = req.params.userId; 
    const {name, email, phone} = req.body;


    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {

        // 평소 하던 것처럼 형식적 validation 넣기
        if(!name)
            return res.send(response(baseResponse.PROFILE_USEREMAIL_EMPTY));
        if(!email)
            return res.send(response(baseResponse.USER_USEREMAIL_EMPTY));
        if(!phone)
            return res.send(response(baseResponse.PROFILE_PHONE_EMPTY));

        // 이메일 형식 체크 (by 정규표현식)
        if (!regexEmail.test(email))
            return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));


        const patchProfileResponse = await profileService.editProfile(
            user_no,
            name,
            email,
            phone
        );
    
        return res.send(patchProfileResponse);
    }

}

/**
 * API No. 5
 * API Name : 기본 이력서 선택 수정 API
 * [POST] /web/profile/:userId/:resumeId
 */
 exports.patchBasicResume = async function (req, res) {
    /**
     * Path Variable : userId, resumeId
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId // jwt(req.header['x-access-token])로부터 id 가져옴

    const user_no = req.params.userId; 
    const resume_no = req.params.resumeId; 

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {

        // 평소 하던 것처럼 형식적 validation 넣기
        if(!user_no)
            return res.send(response(baseResponse.USER_USERID_EMPTY));
        if(!resume_no)
            return res.send(response(baseResponse.RESUMEID_EMPTY));


        const patchBasicResponse = await profileService.editBasicResume(
            user_no,
            resume_no
        );
    
        return res.send(patchBasicResponse);
    }

}