const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");
////////////////////////////////
// 소셜로그인 관련

// 카카오 userId 있는지 체크 
exports.userIdCheck = async function (kakaoId) {
  const connection = await pool.getConnection(async (conn) => conn); 
  const checkResult = await userDao.selectKaKaoId(connection, kakaoId); 
  
  console.log('kakaoId : ' + kakaoId)
  console.log('checkResult : ' + checkResult)
  connection.release(); 
  return checkResult;
};

/////////////////////////////////




// 폰번호 있는지 체크
exports.phoneCheck = async function (phone) {
    const connection = await pool.getConnection(async (conn) => conn); 
    const phoneCheckResult = await userDao.selectUserPhone(connection, phone); 
    connection.release(); 
    //console.log(phoneCheckResult);
    return phoneCheckResult;
};

// 이메일 있는지 체크
exports.emailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn); 
    const emailCheckResult = await userDao.selectUserEmail(connection, email); 
    connection.release(); 
    return emailCheckResult;
};

// 로그인 - 비밀번호 체크
exports.passwordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    console.log(passwordCheckResult[0])
    connection.release();
    return passwordCheckResult[0];
  };

  // 로그인 - 이메일로 status 체크
  exports.accountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectUserAccount(connection, email);
    connection.release();
  
    return userAccountResult;
  };

  // 프로필 사진 가져오기;
  exports.retrieveUser = async function (userId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const profieImageUrlResult = await userDao.selectprofileImageUrl(connection, userId);
    //console.log(profieImageUrlResult[0].profileImageUrl)
    connection.release();
  
    return profieImageUrlResult[0].profileImageUrl; 
  
  }

/////
// 전문분야 이미 생성됐는지 체크
exports.specialtyCheck = async function (user_no, jobCategory_no, dutyCategory_no, career, specialtyNotice) {
  const connection = await pool.getConnection(async (conn) => conn);
  const specialtyCheckResult = await userDao.selectSpecialtyCheck(connection, user_no, jobCategory_no, dutyCategory_no, career, specialtyNotice);
  connection.release();

  return specialtyCheckResult;
};

// 학교 이미 생성됐는지 체크
exports.schoolCheck = async function (user_no, school) {
  const connection = await pool.getConnection(async (conn) => conn);
  const schoolCheckResult = await userDao.selectSchoolCheck(connection, user_no, school);
  connection.release();

  return schoolCheckResult;
};

// 기업경력 이미 생성됐는지 체크
exports.companyCheck = async function (user_no, company) {
  const connection = await pool.getConnection(async (conn) => conn);
  const companyCheckResult = await userDao.selectCompanyCheck(connection, user_no, company);
  connection.release();

  return companyCheckResult;
};

