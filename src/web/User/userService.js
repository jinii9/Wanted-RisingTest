const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리
//////////////////
exports.kakaoSocial = async function (kakaoProfile,accessToken) {
    try {
        //console.log('accessToken? ' + accessToken)
        console.log(kakaoProfile.data);
        
        userKakaoInfo = kakaoProfile.data;

        console.log(userKakaoInfo.id);
        console.log(userKakaoInfo.properties.nickname);
        console.log(userKakaoInfo.properties.profile_image);
        
        // 계정 있는지 확인
        const userIdCheck = await userProvider.userIdCheck(userKakaoInfo.id);
        console.log(userIdCheck);
        console.log(userIdCheck.length);
        if (userIdCheck.length < 1) {
            // 회원가입해주기
            const connection = await pool.getConnection(async (conn) => conn);

            const userIdResult = await userDao.insertKaKaoUsers(connection, userKakaoInfo.id, userKakaoInfo.properties.nickname, userKakaoInfo.properties.profile_image);
            console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
            connection.release();
            return response(baseResponse.SIGNUP_SUCCESS);

        }else{ // kakaoID 존재한다면, jwt 발급
            
            console.log('유저ID값 : ' + userIdCheck[0].no)
            
            //토큰 생성 Service
            let token = await jwt.sign( //(sign메소드 이용해서 jwt 생성)
            { 
                userId: userIdCheck[0].no,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            { // <options : >
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
            );           
            
            // no, kakaoId, name, profileInageUrl
            return response(baseResponse.LOGIN_SUCCESS, {'userId': userIdCheck[0].no, 'jwt': token, 'name' : userIdCheck[0].name, 'profileImageUrl' : userIdCheck[0].profileImageUrl});
            //return res.send(response(baseResponse.SIGNIN_EMAIL_SUCCESS));
        
        
            
        }
    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};




//////////////////



// 회원가입
exports.createUser = async function (email, name, phone, password, notice) {
    try {
        //console.log(email, name, phone, password, notice);
        
        // // 이메일 중복 확인
        // const emailRows = await userProvider.emailCheck(email);
        // if (emailRows.length > 0)
        //     return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [email, name, phone, hashedPassword, notice];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUsers(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SIGNUP_SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 로그인
// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (email, password) {
    try {
        // // 이메일번호 여부 확인 (실제 DB에 있는 이메일인지 조회)
        // const emailRows = await userProvider.emailCheck(email);
        // // 이메일 존재하지 않는다면 회원가입 창으로
        // if (phoneRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG); // 존재하지 않는다면 에러

        // // 이메일 존재한다면 password 입력
        // => 다 앞 API에서 확인
        console.log(password)

        // 비밀번호 확인 (비밀번호는 암호화해서 DB에 집어넣었기 때문에, 유저로부터 받은 비밀번호 다시 암호화해서 이거랑, DB에 있는 암호화 비밀번호 비교)
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [email, hashedPassword];
        console.log(hashedPassword) 
        
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams); // 이메일과 패스워드 모두 일치한 것 가져오기

        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }



        // 계정 상태 확인 (status로 계정 상태 관리되어 있음)
        const userInfoRows = await userProvider.accountCheck(email);
        console.log(userInfoRows)
        // if (userInfoRows[0].status === "INACTIVE") {
        //     return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        // } else if (userInfoRows[0].status === "DELETED") {
        //     return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        // }
        if (userInfoRows[0].status === "N") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }
        
    
        console.log(userInfoRows[0].no) // DB의 userId (클라이언트가 보내온 email과 password에 해당하는 userId 값)

        //토큰 생성 Service
        let token = await jwt.sign( //(sign메소드 이용해서 jwt 생성)
            { 
                userId: userInfoRows[0].no,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            { // <options : >
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );
        
        // 프로필 사진 가져오기
        const profileImageUrl = await userProvider.retrieveUser(userInfoRows[0].no);
        console.log('sss : '+ profileImageUrl)
        return response(baseResponse.LOGIN_SUCCESS, {'userId': userInfoRows[0].no, 'jwt': token, 'profileImageUrl': profileImageUrl}); // 로그인에서는 jwt와 동시에 어떤 유저에 대한 값인지 뱉어내도록
            // 그래야지 로그인하고나서 그 결과값 잘 저장 후, 클라이언트는 jwt를 웹의 로컬 스토리지에 저장,  id는추후에 사용하게 될 API에서 자기 자신에 대한 userId 갖고 있기 떄문에 유용하게 사용
    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 유저의 전문분야 생성
exports.createSpecialty = async function (user_no, jobCategory_no, dutyCategory_no, career, specialtyNotice) {
    try {
        // 의미적 validation
            // (값이 들어갔는지 확인하고 이미 들어가 있다면, 이미 들어간 정보이므로 error)
            const specialtyRows = await userProvider.specialtyCheck(user_no, jobCategory_no, dutyCategory_no, career, specialtyNotice); 
            console.log('check : ' + specialtyRows.length)
            if (specialtyRows.length > 0) return errResponse(baseResponse.USER_ALEADY);



        // 전문분야 관련 테이블
        const insertSpecialtyParams = [user_no, jobCategory_no, career, specialtyNotice];
        const insertDutyParams = [user_no, dutyCategory_no];
        //const insertSkillParams = [user_no, skill];
        //console.log(user_no, jobCategory_no, dutyCategory_no, career, skill, specialtyNotice)
        const connection = await pool.getConnection(async (conn) => conn);

        //console.log(skill);
        //console.log('test : ' + skill.skillName);

        const specialtyIdResult = await userDao.insertSpecialty(connection, insertSpecialtyParams);
        console.log(`추가된 유저의 전문분야 : ${specialtyIdResult[0].insertId}`)

        const dutyIdResult = await userDao.insertDuty(connection, insertDutyParams);
        console.log(`추가된 유저의 전문분야 - 직무 : ${dutyIdResult[0].insertId}`)
        
        // // 유저가 스킬 넣는 경우 (body에 skill 빼버리는 경우에 undefined로 들어감)
        // if(skill !== undefined){
        //     const skillIdResult = await userDao.insertSkill(connection, insertSkillParams);
        //     //console.log(`추가된 유저의 전문분야 - 스킬 : ${skillIdResult[0].insertId}`)
        // }

        connection.release(); // 할당 해제

        return response(baseResponse.POSTSPECIALTY_SUCCESS);

    } catch (err) {
        logger.error(`App - createSpecialty Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 유저의 학교, 회사 생성
exports.createSchoolCompany = async function (user_no, school, company) {
    try {
        // 의미적 validation
            // (값이 들어갔는지 확인하고 이미 들어가 있다면, 이미 들어간 정보이므로 error)
            const schoolRows = await userProvider.schoolCheck(user_no, school); 
            if (schoolRows.length > 0) return errResponse(baseResponse.USER_ALEADY);

            const companyRows = await userProvider.companyCheck(user_no, company); 
            if (companyRows.length > 0) return errResponse(baseResponse.USER_ALEADY);

        
        // resume테이블에 이력서 생성
        const connection = await pool.getConnection(async (conn) => conn);
        const resumeResult = await userDao.insertResume(connection, user_no);
        // 이력서 식별값
        const resumeNo = `${resumeResult[0].insertId}`;        
        console.log("이력서 식별값 : " + resumeNo)
        // 학교,회사 관련 테이블
        const insertSchoolParams = [resumeNo, user_no, school]; // resume_no : 1 (첫 생성이므로)
        const insertCompanyParams = [resumeNo, user_no, company];

        if(school !== undefined){
            const schoolIdResult = await userDao.insertSchool(connection, insertSchoolParams);
            console.log(`추가된 유저의 학교 : ${schoolIdResult[0].insertId}`)
        }
        if(company !== undefined){
            const companyIdResult = await userDao.insertCompany(connection, insertCompanyParams);
            console.log(`추가된 유저의 직장경력 : ${companyIdResult[0].insertId}`)
        }

        connection.release(); // 할당 해제

        return response(baseResponse.POSTSCHOOLCOMPANY_SUCCESS);

    } catch (err) {
        logger.error(`App - createProduct Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 유저의 관심태그 생성
exports.createInterestTag = async function (user_no, interestTag) {
    try {
        // 관심태그 관련 테이블
        const insertInterestTagParams = [user_no, interestTag];

        const connection = await pool.getConnection(async (conn) => conn);

        if(interestTag !== undefined){
            const interestTagResult = await userDao.insertInterestTag(connection, insertInterestTagParams);
            //console.log(`추가된 유저의 관심태그 : ${interestTagResult[0].insertId}`)
        }

        connection.release(); // 할당 해제

        return response(baseResponse.INTERESTTAG_SUCCESS);

    } catch (err) {
        logger.error(`App - createProduct Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

////////////////////////////////수정(patch)///////////////////////////////////////
// 유저의 전문분야 수정
exports.editSpecialty = async function (user_no, jobCategory_no, dutyCategory_no, career, specialtyNotice) {
    try {
        // 의미적 validation 필요x - 선택바가 있기 때문에
        
        // 전문분야 관련 테이블
        const updateSpecialtyParams = [jobCategory_no, career, specialtyNotice, user_no]; // jobCategory_no, career, specialtyNoticd
        const updateDutyParams = [dutyCategory_no, user_no];
        const updateSkillParams = [skill, user_no];
        //console.log(updateDutyParams)
        const connection = await pool.getConnection(async (conn) => conn);

        console.log(skill);
        //console.log('test : ' + skill.skillName);

        const editspecialtyIdResult = await userDao.updateSpecialty(connection, updateSpecialtyParams);
        console.log(`수정된 유저의 전문분야 : ${editspecialtyIdResult[0].insertId}`)
        const editdutyIdResult = await userDao.updateDuty(connection, updateDutyParams);
        console.log(`추가된 유저의 전문분야 - 직무 : ${editdutyIdResult[0].insertId}`)
        
        // 유저가 스킬 넣는 경우 (body에 skill 빼버리는 경우에 undefined로 들어감)
        // if(skill !== undefined){
            // post했던 값 다 지우고, 다시 post하기 (유동적 -> update X)
            
        //     const skillIdResult = await userDao.insertSkill(connection, insertSkillParams);
        //     //console.log(`추가된 유저의 전문분야 - 스킬 : ${skillIdResult[0].insertId}`)
        // }

        connection.release(); // 할당 해제

        return response(baseResponse.UPDATESPECIALTY_SUCCESS);

    } catch (err) {
        logger.error(`App - updateUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 유저의 학교, 회사 수정
exports.editSchoolCompany = async function (user_no, school, company) {
    try {
        // 학교,회사 관련 테이블
        const updateSchoolParams = [school, user_no]; // resume_no : 1 (첫 생성이므로)
        const updateCompanyParams = [company, user_no];

        const connection = await pool.getConnection(async (conn) => conn);

        if(school !== undefined){
            const editschoolIdResult = await userDao.updateSchool(connection, updateSchoolParams);
            console.log(`수정된 유저의 학교 : ${editschoolIdResult[0].insertId}`)
        }
        if(company !== undefined){
            const editcompanyIdResult = await userDao.updateCompany(connection, updateCompanyParams);
            console.log(`수정된 유저의 직장경력 : ${editcompanyIdResult[0].insertId}`)
        }

        connection.release(); // 할당 해제

        return response(baseResponse.UPDATESCHOOLCOMPANY_SUCCESS);

    } catch (err) {
        logger.error(`App - updateSchoolCompany Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 유저 탈퇴처리
exports.patchUserStatus = async function (user_no) {
    try{
        // 의미적 validation 
        // 삭제처리할 좋아요가 없을 때
            // DB에서 삭제처리할 좋아요 있는지 여부 확인
        // const likeRows = await likeProvider.likeCheck(user_no, companyDuty_no);
        // if(likeRows < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG); // 존재하지 않는다면 에러 

        const connection = await pool.getConnection(async (conn) => conn);

        // status 'N'으로 바꿔주기
        const deleteUserStatus = await userDao.deleteUserStatus(connection, user_no);

        connection.release();

        return response(baseResponse.DELETE_SUCCESS);
    } catch (err) {
        logger.error(`App - patchUserStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};