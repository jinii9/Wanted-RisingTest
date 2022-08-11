// 프로필 조회
async function selectProfile(connection, user_no) {
    
    const selectProfileQuery = `
        SELECT name, email, phone, profileImageUrl
        FROM Users
        WHERE no = ?;
    `;
    const [ProfileRows] = await connection.query(selectProfileQuery, user_no);
    return ProfileRows;
}

// 프로필-기본이력서 조회
async function selectProfileResume(connection, user_no) {
    
    const selectProfileResumeQuery = `
        SELECT resumes.no as resumeNo, schoolName,
        case
            when majorDegree IS NULL then '전공 미입력'
            else majorDegree
            end as major,
            companyName,
            case
            when UserCompanyCareers.departmentPosition IS NULL then '직책 미입력'
            else departmentPosition
            end as position,
            introduction
        FROM  resumes
        INNER JOIN UserSchools on resumes.no = UserSchools.resume_no
        INNER JOIN UserCompanyCareers on resumes.no = UserCompanyCareers.resume_no
        WHERE resumes.user_no = ? AND main = 'Y' AND resumes.status = 'Y'
        LIMIT 1;
    `;
    const [ProfileResumeRows] = await connection.query(selectProfileResumeQuery, user_no);
    return ProfileResumeRows;
}

// 프로필-전문분야 조회
async function selectProfileSpecialty(connection, user_no) {
    
    // 직군 조회
    const selectJobQuery = `
        SELECT jobCategory_no, career
        FROM UserSpecialties
        WHERE user_no = ?;
    `;
    const [ProfileJobRows] = await connection.query(selectJobQuery, user_no);
    
    // 직무 조회
    const selectDutyQuery = `
        SELECT dutyCategory_no
        FROM UserDuties
        WHERE user_no = ?;
    `;
    const [ProfileDutyRows] = await connection.query(selectDutyQuery, user_no);    
    console.log(ProfileJobRows);
    console.log(ProfileDutyRows);
    
    // 객체 안 ProfieDuty의 값들을 배열에 넣어주기
    const ProfileDuty_list = [];
    for(i=0; i<ProfileDutyRows.length; i++){
        ProfileDuty_list.push(ProfileDutyRows[i].dutyCategory_no);
    }
    console.log(ProfileDuty_list);
    // 그리고 배열 안에 있는 객체에 key값 지정 후, 위에서 만든 배열 값 넣어주기
    ProfileJobRows[0].dutyCategory_no = ProfileDuty_list;

    // 배열에 배열 추가하는 방법
    //const count = ProfileJobRows.push(ProfileDutyRows);


    return ProfileJobRows;
}


//// 수정
// 유저 프로필 수정
async function updateProfile(connection, updateProfileParams) { // name, email, phone, user_no
    const updateProfileQuery = `
            UPDATE Users
            SET name = ?, email = ?, phone = ?
            WHERE no = ?;
        `;
    const updateProfileRow = await connection.query(
        updateProfileQuery,
        updateProfileParams
    );

    return updateProfileRow;
}

// 기본 이력서 선택 수정
async function updateBasicResume(connection, user_no, resume_no) { 
    // 이외에 다른 resume은 main을 'N'으로 바꿔주기
    // 이력서들 main을 모두 'N'으로 바꿔주기
    const updateMainQuery = `
        UPDATE resumes
        SET main = 'N'
        WHERE user_no = ?
    `
    const updateMainRow = await connection.query(updateMainQuery, user_no); 
    
    const updateBasicQuery = `
            UPDATE resumes
            SET main = 'Y'
            WHERE user_no = ? AND no = ?;
        `;
    const updateBasicRow = await connection.query(
        updateBasicQuery,
        [user_no, resume_no]
    );



    return updateBasicRow;
}

module.exports = {
    selectProfile,
    selectProfileResume,
    selectProfileSpecialty,
    updateProfile,
    updateBasicResume,
}