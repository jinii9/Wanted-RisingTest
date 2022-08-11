const jwtMiddleware = require("../../../config/jwtMiddleware");
const resumeProvider = require("../../web/Resume/resumeProvider");
const resumeService = require("../../web/Resume/resumeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 1
 * API Name : 이력서 생성 API
 * [POST] /web/resume/:userId
 * body : 받는게 너무너무너무너무 많아..
 */
exports.postResume = async function (req, res) {
    /**
     * Path Variable : userId
     * Body:
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴
    
    const user_no = req.params.userId; 
    console.log(userIdFromJWT, user_no)
    
    const {introduction, company_career, school, link, writing_status} = req.body;
    
    //console.log(introduction, company_career, school, link, writing_status);
    
    // 형식적 validation
    if(!introduction) return res.send(errResponse(baseResponse.RESUME_INTRODUCTION_EMPTY)); 
    if(introduction.length < 5) return res.send(errResponse(baseResponse.RESUME_INTRODUCTION_EROOR_TYPE)); 

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const postResumeResponse = await resumeService.createResume(
            user_no,
            introduction,
            company_career,
            school,
            link,
            writing_status
        );
        return res.send(postResumeResponse);
    }
}

/**
 * API No. 2
 * API Name : 이력서 내용 조회 API
 * [POST] /web/resume/:userId
 */
 exports.getResume = async function (req, res) {
    /**
     * Path Variable : userId
     * Body:
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴
    
    const user_no = req.params.userId; 
    const resume_no = req.params.resumeId;
    console.log(userIdFromJWT, user_no)


    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        
        const postResumeResponse = await resumeProvider.getResume(
            user_no,
            resume_no
        );

        if(postResumeResponse===0) {
            return res.send(response(baseResponse.RESUME_ALREADYDELETE));
        }else {
        return res.send(response(baseResponse.GETRESUME_SUCCESS, postResumeResponse));
        }
        
    }
}

/**
 * API No. 3
 * API Name : 이력서 내용 수정 API
 * [PATCH] /web/resume/:userId/:resumeId
 */
 exports.patchResume = async function (req, res) {
    /**
     * Path Variable : userId
     * Body: 받는게 너무너무너무너무 많아..
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴
    
    const user_no = req.params.userId; 
    const resume_no = req.params.resumeId;
    const {introduction, company_career, school, link, writing_status} = req.body;
    //console.log('없을 때 : ' + introduction)
    console.log(userIdFromJWT, user_no)
    
    // 형식적 validation
    if(!introduction) return res.send(errResponse(baseResponse.RESUME_INTRODUCTION_EMPTY)); 
    if(introduction.length < 5) return res.send(errResponse(baseResponse.RESUME_INTRODUCTION_EROOR_TYPE)); 

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {

        // // 이미 삭제된 이력서입니다.
        // const resumeStatus = await resumeProvider.statusCheck(user_no, resume_no);
        // console.log(resumeStatus[0].status)
        // if (resumeStatus[0].status === 'N') { 
        //     console.log("삭제된 이력서")
        //     res.send(errResponse(baseResponse.RESUME_ALREADYDELETE)); // status=N이라면 에러
        
        // } else {

            const patchResumeResponse = await resumeService.patchResume(
                user_no,
                resume_no,
                introduction,
                company_career,
                school,
                link,
                writing_status
            );
            if(patchResumeResponse===0) {
                return res.send(response(baseResponse.RESUME_ALREADYDELETE));
            }else {
                return res.send(response(baseResponse.PATCHRESUME_SUCCESS));
            }
        //}
    }
}

/**
 * API No. 4
 * API Name : 이력서 삭제처리 API
 * [PATCH] /web/resume/:userId/:resumeId/status
 */
 exports.patchResumeStatus = async function (req, res) {
    /**
     * Path Variable : userId
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴
    
    const user_no = req.params.userId; 
    const resume_no = req.params.resumeId;
    //console.log('없을 때 : ' + introduction)
    console.log(userIdFromJWT, user_no)
    

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {

            const patchResumeResponse = await resumeService.patchResumeStatus(
                user_no,
                resume_no
            );
            if(patchResumeResponse===0) {
                return res.send(response(baseResponse.RESUME_ALREADYDELETE));
            }else {
                return res.send(patchResumeResponse);
            }
    }
}

/**
 * API No. 5
 * API Name : 이력서 리스트 조회 API
 * [POST] /web/resume/:userId/:resumeId
 */
 exports.getResumeList = async function (req, res) {
    /**
     * Path Variable : userId
     * Body:
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴
    
    const user_no = req.params.userId; 
    console.log(userIdFromJWT, user_no)


    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const postResumeResponse = await resumeProvider.getResumeList(
            user_no
        );
        return res.send(response(baseResponse.GETRESUMELIST_SUCCESS, postResumeResponse));
    }
}