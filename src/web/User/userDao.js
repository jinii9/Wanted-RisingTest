//const { specialtyCheck } = require("./userProvider");


////////////////////////////////////
// 소셜 로그인
// 유저 Id 있는지 확인 
//selectKaKaoId(connection, kakaoId)
async function selectKaKaoId(connection, kakaoId) {
    const selectUserPhoneQuery = `
                  SELECT no, kakaoId, name, profileImageUrl
                  FROM Users 
                  WHERE kakaoId = ?;
                  `; // 그 전화번호 가진 어떤 유저가 있다면
    const [kakaoRows] = await connection.query(selectUserPhoneQuery, kakaoId); // 여기에 넘겨줘서, (phone은 ?에 들어감) 존재한다면, phoneRows배열에 들어감
    return kakaoRows;
}


// 카카오로 회원가입
//insertKaKaoUsers(connection, userKakaoInfo.id, userKakaoInfo.properties.nickname, userKakaoInfo.properties.profile_image);
async function insertKaKaoUsers(connection, kakaoId, nickname, profileImage) {
    console.log('회원가입 시 ID : ' + kakaoId)
    const insertUserInfoQuery = `
            INSERT INTO Users(name, profileImageUrl, kakaoId)
            VALUES (?, ?, ?);
        `;
    
        const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        [nickname, profileImage, kakaoId]
    );

    return insertUserInfoRow;
}
/////////////////////////////////////




// 유저 생성
async function insertUsers(connection, insertUserInfoParams) {
    const defaultProfileImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu1h9GZH18sUSO-8P_coFOJehZ1KkPo-CUJ2816jM_kaQoascDIj3vWzaBt2wx3X1Wwz8&usqp=CAU";
    insertUserInfoParams.push(defaultProfileImageUrl);
    const insertUserInfoQuery = `
            INSERT INTO Users(email, name, phone, password, notice, profileImageUrl)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
    
        const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// 전화번호로 회원 조회
async function selectUserPhone(connection, phone) {
    const selectUserPhoneQuery = `
                  SELECT phone, email
                  FROM Users 
                  WHERE phone = ?;
                  `; // 그 전화번호 가진 어떤 유저가 있다면
    const phoneRow = await connection.query(selectUserPhoneQuery, phone); // 여기에 넘겨줘서, (phone은 ?에 들어감) 존재한다면, phoneRows배열에 들어감
    // console.log('test')
    // console.log(phoneRow)
    //console.log(phoneRow[0])
    // console.log('끝')
    return phoneRow[0];
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
    const selectUserPhoneQuery = `
                  SELECT phone, email
                  FROM Users 
                  WHERE email = ?;
                  `; // 그 전화번호 가진 어떤 유저가 있다면
    const [emailRows] = await connection.query(selectUserPhoneQuery, email); // 여기에 넘겨줘서, (phone은 ?에 들어감) 존재한다면, phoneRows배열에 들어감
    return emailRows;
}

// 로그인 - 비밀번호 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
    console.log(selectUserPasswordParams)
    const selectUserPasswordQuery = `
          SELECT email, name, password
          FROM Users
          WHERE email = ? AND password = ?;`;
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );
    console.log(selectUserPasswordRow)
    return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
    const selectUserAccountQuery = `
          SELECT status, no
          FROM Users 
          WHERE email = ?;`;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow[0];
}

// 프로필 이미지 사진 가져오기
async function selectprofileImageUrl(connection, userId) {
    const selectprofileImageUrlQuery = `
          SELECT profileImageUrl, no
          FROM Users 
          WHERE no = ?;`;
    const selectprofileImageUrlRow = await connection.query(
        selectprofileImageUrlQuery,
        userId
    );
    return selectprofileImageUrlRow[0];
}

//
/// 전문분야 이미 생성되었는지 체크
async function selectSpecialtyCheck(connection, user_no, jobCategory_no, dutyCategory_no, career, specialtyNotice) {
    console.log('확인')
    console.log(jobCategory_no, dutyCategory_no)
    
    const selectSpecialtyQuery = `
        SELECT UserSpecialties.user_no
        FROM UserSpecialties
        INNER JOIN UserDuties on UserSpecialties.user_no = UserDuties.user_no
        WHERE UserSpecialties.user_no = ? AND jobCategory_no = ? AND career = ? AND specialtyNotice = ? AND dutyCategory_no = ?;
                  `;
    const [specialtyRows] = await connection.query(selectSpecialtyQuery, [user_no, jobCategory_no, career, specialtyNotice, dutyCategory_no]);
    //console.log(specialtyRows)
    return specialtyRows;
}
//
// 유저 전문 분야 생성
async function insertSpecialty(connection, insertSpecialtyParams) { // user_no, jobCategory_no, career, specialtyNotice
    const insertSpecialtyQuery = `
            INSERT INTO UserSpecialties(user_no, jobCategory_no, career, specialtyNotice)
            VALUES (?, ?, ?, ?);
        `;
    const insertSpecialtyRow = await connection.query(
        insertSpecialtyQuery,
        insertSpecialtyParams
    );

    return insertSpecialtyRow;
}

// 유저 전문분야 - 직무 생성
async function insertDuty(connection, insertDutyParams) { // user_no, dutyCategory_no
    const insertDutyQuery = `
            INSERT INTO UserDuties(user_no, dutyCategory_no)
            VALUES (?, ?);
        `;
    const insertDutyRow = await connection.query(
        insertDutyQuery,
        insertDutyParams
    );

    return insertDutyRow;
}

// 유저 전문분야 - 스킬 생성
async function insertSkill(connection, insertSkillParams) { // user_no, dutyCategory_no
    
    console.log(insertSkillParams);
    console.log(insertSkillParams[1][0].skillName);
  

    const insertSkillQuery = `
            INSERT INTO UserSkills(user_no, name)
            VALUES (?, ?);
        `;

    //////////
    const values = [];
    const insertSkillRow = [];
    for(i=0; i<insertSkillParams[1].length; i++){
        values[i] = [insertSkillParams[0], insertSkillParams[1][i].skillName];
        console.log('values : ' + values[i]);

        insertSkillRow[i] = await connection.query(
            insertSkillQuery,
            values[i]
        );
    }
    /////////

    return insertSkillRow;
}

//
/// 학교 이미 생성되었는지 체크
async function selectSchoolCheck(connection, user_no, school) {
    const selectSchoolQuery = `
        SELECT UserSchools.user_no
        FROM UserSchools
        WHERE user_no = ? AND schoolName = ?;
                  `;
    const [schoolRows] = await connection.query(selectSchoolQuery, [user_no, school]);
    return schoolRows;
}
/// 기업경력 이미 생성되었는지 체크
async function selectCompanyCheck(connection, user_no, company) {
    const selectCompanyQuery = `
        SELECT user_no
        FROM UserCompanyCareers
        WHERE user_no = ? AND companyName = ?;
                  `;
    const [companyRows] = await connection.query(selectCompanyQuery, [user_no, company]);
    return companyRows;
}

////////// 이력서 생성
async function insertResume (connection, user_no) {
    // 동시에 이력서 생성
    const insertResumeQuery = `
        INSERT INTO resumes(user_no, main, resumeName)
        VALUES (?, 'Y', 1);
    `;
    const insertResumeRow = await connection.query(
        insertResumeQuery,
        user_no
    );
    return insertResumeRow;
}
//
// 유저 학교 생성
async function insertSchool(connection, insertSchoolParams) { // user_no, school
    const insertSchoolQuery = `
            INSERT INTO UserSchools(resume_no, user_no, schoolName)
            VALUES (?, ?, ?);
        `;

    const insertSchoolRow = await connection.query(
        insertSchoolQuery,
        insertSchoolParams
    );

    return insertSchoolRow;
}

// 유저 직장경력 생성
async function insertCompany(connection, insertCompanyParams) { // user_no, school
    const insertCompanyQuery = `
            INSERT INTO UserCompanyCareers(resume_no, user_no, companyName)
            VALUES (?, ?, ?);
        `;
    const insertCompanyRow = await connection.query(
        insertCompanyQuery,
        insertCompanyParams
    );

    return insertCompanyRow;
}

// 유저 관심태그 생성
async function insertInterestTag(connection, insertInterestTagParams) { // user_no, interestTagCategory_no

    console.log(insertInterestTagParams);
    console.log(insertInterestTagParams[1][0].interestTagCategory_no);

    const insertinterestTagQuery = `
            INSERT INTO UserInterestTags(user_no, interestTagCategory_no)
            VALUES (?, ?);
        `;

    //////////
    const values = [];
    const insertInterestTagRow = [];
    for(i=0; i<insertInterestTagParams[1].length; i++){
        values[i] = [insertInterestTagParams[0], insertInterestTagParams[1][i].interestTagCategory_no];
        console.log('values : ' + values[i]);

        insertInterestTagRow[i] = await connection.query(
            insertinterestTagQuery,
            values[i]
        );
    }
    /////////

    return insertInterestTagRow;
}


////////////////////////////수정(patch)///////////////////////////////
// 유저 전문 분야 수정
async function updateSpecialty(connection, updateSpecialtyParams) { // user_no, jobCategory_no, career, specialtyNotice
    const updateSpecialtyQuery = `
            UPDATE UserSpecialties
            SET jobCategory_no = ?, career = ?, specialtyNotice = ?
            WHERE user_no = ?;
        `;
    const updateSpecialtyRow = await connection.query(
        updateSpecialtyQuery,
        updateSpecialtyParams
    );

    return updateSpecialtyRow;
}

// 유저 전문분야 - 직무 수정
async function updateDuty(connection, updateDutyParams) { // user_no, dutyCategory_no
    const updateDutyQuery = `
            UPDATE UserDuties
            SET dutyCategory_no = ?
            WHERE user_no = ?;
        `;
    const updateDutyRow = await connection.query(
        updateDutyQuery,
        updateDutyParams
    );

    return updateDutyRow;
}

// 유저 학교 수정
async function updateSchool(connection, updateSchoolParams) { // user_no, school
    const updateSchoolQuery = `
            UPDATE UserSchools
            SET schoolName = ?
            WHERE user_no = ? AND resume_no = 1;
        `;
    const updateSchoolRow = await connection.query(
        updateSchoolQuery,
        updateSchoolParams
    );

    return updateSchoolRow;
}

// 유저 직장경력 수정
async function updateCompany(connection, updateCompanyParams) { // company, user_no
    const updateCompanyQuery = `
            UPDATE UserCompanyCareers
            SET companyName = ?
            WHERE user_no = ? AND resume_no = 1;
        `;
    const updateCompanyRow = await connection.query(
        updateCompanyQuery,
        updateCompanyParams
    );

    return updateCompanyRow;
}

// 유저 탈퇴처리
async function deleteUserStatus(connection, user_no) {
    const deleteUserQuery = `
        UPDATE Users
        SET status = 'N'
        WHERE no = ?;
    `;
    const [deleteUserRows] = await connection.query(
        deleteUserQuery,
        user_no
    );


    return deleteUserRows;
}


module.exports = {
    insertUsers,
    selectUserPhone,
    selectUserEmail,
    selectUserPassword,
    selectUserAccount,
    selectprofileImageUrl,
    insertSpecialty,
    insertDuty,
    insertSkill,
    insertSchool,
    insertCompany,
    insertInterestTag,
    updateSpecialty,
    updateDuty,
    updateSchool,
    updateCompany,
    selectSpecialtyCheck,
    selectSchoolCheck,
    selectCompanyCheck,
    insertResume,
    deleteUserStatus,
    selectKaKaoId,
    insertKaKaoUsers,
};
  