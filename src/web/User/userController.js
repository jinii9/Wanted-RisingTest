const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../web/User/userProvider");
const userService = require("../../web/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/////////////////////////
// const passport = require('passport')
// const KakaoStrategy = require('passport-kakao').Strategy

// passport.use('kakao-login', new KakaoStrategy({
//     clientID: 'a0c4661bb6aebfd8da2d538881724e15',
//     callbackURL: 'http://localhost:3000/auth/kakao/callback',
// }, async (accessToken, refreshToken, profile, done) => {
//     console.log(accessToken);
//     console.log(profile);
// }));

/////////////////////////
var myModule = require("../../web/User/userRoute");
const axios = require('axios');

exports.kakaoLogin = async function (req, res) {
    
    //var Token = myModule.resultToken;
    console.log(accessToken);
    //console.log('확인해보자 시벌 : ' + myModule.resultToken);
    // const {accessToken} = req.body; //값 확인을 위해 body로 token 값을 받아준다.
    // console.log(accessToken);

    //     let kakaoProfile; //값을 수정해주어야 하므로 const가 아닌 let 사용
    
        try{ //axios 모듈을 이용하여 Profile 정보를 가져온다.
            
            // console.log(resultToken);
            //const {accessToken} = req.body; //값 확인을 위해 body로 token 값을 받아준다.
            //console.log(accessToken);

            let kakaoProfile; //값을 수정해주어야 하므로 const가 아닌 let 사용

                
                kakaoProfile = await axios({
                    method : 'GET',
                    url : 'https://kapi.kakao.com/v2/user/me',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                        //'Content-Type': 'application/json'
                    }
                })
                
                console.log(kakaoProfile)
                //res.send(response(baseResponse.LOGIN_SUCCESS, kakaoProfile));
                console.log("여기까지는 OK")
                const signInResponse = await userService.kakaoSocial(kakaoProfile,accessToken);

                return res.send(signInResponse);
                
                
                //return response(baseResponse.LOGIN_SUCCESS, {'userId': userInfoRows[0].no, 'jwt': token, 'profileImageUrl': profileImageUrl}); // 로그인에서는 jwt와 동시에 어떤 유저에 대한 값인지 뱉어내도록
                //return res.send(response(baseResponse.SIGNUP_PHONE_EXIST, EmailByselectPhone));
            } catch (err) {
              return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
         }
        //  res.send('성공!');
}



/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /web/test
 */
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
}

// test2 API
exports.test2 = async function (req, res) {
    console.log("test");
    /**
     * Query String: addressId
     */
    //const userId = req.params.userId;
    const selected = [req.query.selected];
    //const title = req.query.title;
    console.log(selected);
    
}

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입/로그인) : 이메일 체크 API
 * [POST] /web/users/email
 * body : email (실제 DB에 있는 유저인지 확인)
 */
exports.getUsersEmail = async function (req, res) {
    /**
     * Body: email
     */
     const {email} = req.body;

     // 빈 값 체크
    if (!email)
    return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    
    // 이메일 여부 확인 (실제 DB에 있는 이메일인지 조회)
    const emailRows = await userProvider.emailCheck(email);
    

    console.log(emailRows.length);
    // 이메일 존재하지 않는다면, 회원가입 창으로
    if (emailRows.length < 1) {
        return res.send(response(baseResponse.SIGNIN_EMAIL_NOSUCCESS))
    }else{ // 이메일 존재한다면, 비밀번호 창으로
        return res.send(response(baseResponse.SIGNIN_EMAIL_SUCCESS));
    }
    
}



/**
 * API No. 2
 * API Name : 유저 생성 (회원가입) API
 * [POST] /web/users
 */
exports.postUsers = async function (req, res) {
    // 위에서 이메일 확인했음 -> 이메일 한번 더 body에 적어주기
    /**
     * Body: email, name, phone, password, repassword, notice
     */
    const {email, name, phone, password, repassword, notice} = req.body;

    console.log("1");
    // 이미 가입된 경우 (전화번호로 체크)
    // 번호가 있다면, '이미 가입한 이력이 있어요' 뜨고, 가입된 이메일 보여주기
    const phoneRow = await userProvider.phoneCheck(phone);
    //console.log(phoneRow[0].phone);

    
    if (phoneRow.length > 0){ // 누군가가 그 번호로 가입되어 있음
        const EmailByselectPhone = phoneRow[0].email; // 이메일 가져오기
        return res.send(response(baseResponse.SIGNUP_PHONE_EXIST, EmailByselectPhone)); // 폰번호 존재한다면, 이메일 알려주기
    } else{
        // password와 repassword 같은지 확인
        console.log(password, repassword);
        if(password != repassword)
            return res.send(response(baseResponse.SIGNUP_PASSWORD_WRONG));

        const signUpResponse = await userService.createUser(
            email,
            name,
            phone,
            password,
            notice
        );
    
        return res.send(signUpResponse);

    }
    // const phoneRow = await userProvider.phoneCheck(phone);
    // console.log(phoneRow[0].phone);
    // const EmailByselectPhone = phoneRow[0].email // 이메일 가져오기
    // if (phoneRow[0].phone !== null) return res.send(response(baseResponse.SIGNUP_PHONE_EXIST, EmailByselectPhone)); // 폰번호 존재한다면, 이메일 알려주기


    // const signUpResponse = await userService.createUser(
    //     email,
    //     name,
    //     phone,
    //     password,
    //     notice
    // );

    // return res.send(signUpResponse);
};

/**
 * API No. 3
 * API Name : 로그인 하기 API (JWT 생성)
 * [POST] /web/login
 * body : email (실제 DB에 있는 유저인지 확인하고, jwt 생성할 것!)
 */
 exports.login = async function (req, res) {
    // 위에서 이메일 확인했음 -> 이메일 한번 더 body에 적어주기
    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation
    // 빈 값 체크
    if(!password) 
        return res.send(response(baseResponse.SIGNIN_PASSWORD_EMPTY));

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};

/**
 * API No. 4
 * API Name : 특정 유저 전문분야 생성 API
 * [POST] /web/users/:userId/specialty
 * body : jobCategory_no, dutyCategory_no, career, skill, specialtyNotice
 */
 exports.postSpecialty = async function (req, res) {
    /**
     * Path Variable : userId
     * Body: 
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId // jwt(req.header['x-access-token])로부터 id 가져옴
    
    const user_no = req.params.userId; 
    console.log(userIdFromJWT, user_no)
    //const {jobCategory_no, dutyCategory_no, career, skill, specialtyNotice} = req.body;
    const {jobCategory_no, dutyCategory_no, career, specialtyNotice} = req.body;

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        // 평소 하던 것처럼 형식적 validation 넣기
        if(!jobCategory_no)
            return res.send(response(baseResponse.INITIALSETTING_JOB_EMPTY));
        if(!dutyCategory_no)
            return res.send(response(baseResponse.INITIALSETTING_DUTY_EMPTY));
        if(!career)
            return res.send(response(baseResponse.INITIALSETTING_CAREER_EMPTY));
        // if(!skill)
        //     return res.send(response(baseResponse.INITIALSETTING_SKILL_EMPTY));

        const patchSpecialtyResponse = await userService.createSpecialty(
            user_no,
            jobCategory_no, 
            dutyCategory_no, 
            career, 
            //skill, 
            specialtyNotice
        );
    
        return res.send(patchSpecialtyResponse);
    }  

}

/**
 * API No. 5
 * API Name : 특정 유저 학교/직장 생성 API
 * [POST] /web/users/:userId/schoolCompany
 * body : school, company
 */
 exports.postSchoolCompany = async function (req, res) {
    /**
     * Path Variable : userId
     * Body: 
     */

    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId // jwt(req.header['x-access-token])로부터 id 가져옴
    
    const user_no = req.params.userId; 
    const {school, company} = req.body;

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        // 형식적 validation x

        const postSchoolCompanyResponse = await userService.createSchoolCompany(
            user_no,
            school,
            company
        );

        return res.send(postSchoolCompanyResponse);
    }
}

/**
 * API No. 6
 * API Name : 특정 유저 관심 태그 생성 API
 * [POST] /web/users/:userId/interestTags
 * body : interestTags
 */
 exports.postInterestTag = async function (req, res) {
    /**
     * Path Variable : userId
     * Body: interestTag
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId // jwt(req.header['x-access-token])로부터 id 가져옴
    
    const user_no = req.params.userId; 
    const {interestTag} = req.body;


    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        // 형식적 validation x

        const postInterestTagResponse = await userService.createInterestTag(
            user_no,
            interestTag
        );

        return res.send(postInterestTagResponse);
    }
}

////////////////////// 수정(patch) ////////////////////////////
/**
 * API No. 7
 * API Name : 특정 유저 전문분야 수정 API
 * [POST] /web/users/:userId/specialty
 * body : jobCategory_no, dutyCategory_no, career, specialtyNotice
 */
exports.patchSpecialty = async function (req, res) {
    /**
     * Path Variable : userId
     * Body: jobCategory_no, dutyCategory_no, career, specialtyNotice
     */
    
    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId // jwt(req.header['x-access-token])로부터 id 가져옴

    const user_no = req.params.userId; 
    console.log(userIdFromJWT, user_no)
    const {jobCategory_no, dutyCategory_no, career, skill, specialtyNotice} = req.body;


    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        // 평소 하던 것처럼 형식적 validation 넣기
        if(!jobCategory_no)
            return res.send(response(baseResponse.INITIALSETTING_JOB_EMPTY));
        if(!dutyCategory_no)
            return res.send(response(baseResponse.INITIALSETTING_DUTY_EMPTY));
        if(!career)
            return res.send(response(baseResponse.INITIALSETTING_CAREER_EMPTY));
        if(!skill)
            return res.send(response(baseResponse.INITIALSETTING_SKILL_EMPTY));

        const postSpecialtyResponse = await userService.editSpecialty(
            user_no,
            jobCategory_no, 
            dutyCategory_no, 
            career, 
            skill, 
            specialtyNotice
        );
    
        return res.send(postSpecialtyResponse);
    }

}

/**
 * API No. 8
 * API Name : 특정 유저 학교/직장 수정 API
 * [POST] /web/users/:userId/schoolCompany
 * body : school, company
 */
 exports.patchSchoolCompany = async function (req, res) {
    /**
     * Path Variable : userId
     * Body: school, company
     */

    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId // jwt(req.header['x-access-token])로부터 id 가져옴
    
    const user_no = req.params.userId; 
    const {school, company} = req.body;

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        // 형식적 validation x

        const editSchoolCompanyResponse = await userService.editSchoolCompany(
            user_no,
            school,
            company
        );

        return res.send(editSchoolCompanyResponse);
    }
};

/**
 * API No. 9
 * API Name : 특정 유저 탈퇴처리 수정 API
 * [PATCH] /web/Users/:userId/status
 * body : status
 */
 exports.patchUserStatus = async function (req, res) {
    /**
     * Path Variable : userId
     * Body: status 필요 없을듯
     */

    // jwt - userId, path variable의 productId에 해당하는 userId랑 일치하는지 비교
    const userIdFromJWT = req.verifiedToken.userId; // jwt(req.header['x-access-token])로부터 id 가져옴

    const user_no = req.params.userId; 
    console.log(userIdFromJWT, user_no)
    //const {status} = req.body;

    // 형식적 validation
    //if(!status) return res.send(errResponse(baseResponse.USER_STATUS_EMPTY)); 

    // 비교
    if(userIdFromJWT != user_no) { // jwt 유저ID와 쿼리스트링 유저ID가 같은지 확인
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const patchStatusResponse = await userService.patchUserStatus(
            user_no
        );
        return res.send(patchStatusResponse);
    }
}





///
/** 3-2. JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
 exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    const profileImageUrl = await userProvider.retrieveUser(userIdResult);
    console.log('sss : '+ profileImageUrl)
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS, {'userId': userIdResult, 'profileImageUrl': profileImageUrl})); // 로그인에서는 jwt와 동시에 어떤 유저에 대한 값인지 뱉어내도록
        // 그래야지 로그인하고나서 그 결과값 잘 저장 후, 클라이언트는 jwt를 웹의 로컬 스토리지에 저장,  id는추후에 사용하게 될 API에서 자기 자신에 대한 userId 갖고 있기 떄문에 유용하게 사용 
};