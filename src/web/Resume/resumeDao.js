// 이력서 name 넣기 위해 해당 유저의 이력서 수 가져오기 + 1
async function selectResumeCount(connection, user_no) {

    const createResumeQuery = `
        SELECT count(user_no) as resumeCount FROM resumes WHERE user_no = ? AND status = 'Y';
    `;
    const insertResumeRows = await connection.query(createResumeQuery, user_no);
    console.log(insertResumeRows[0]);
    return insertResumeRows[0][0].resumeCount;
}

// 이력서 생성
async function createResume(connection, user_no, resumeName, introduction, link, writing_status) { // user_no, resumeName, introduction, link, writing_status
    console.log('확인')
    // 이력서 생성 시 기본 이력서(resumeName = 1)가 없다면, 이력서 생성 시, main = Y로 바꿔주기
    const getMainQuery = `
        SELECT count(user_no) as resumeCount FROM resumes WHERE user_no = ? AND status = 'Y' AND main = 'Y';
    `;
    const MainRows = await connection.query(getMainQuery, user_no);
    console.log(MainRows)
    console.log(MainRows[0][0].resumeCount);
    
    let main = 'Y'; 
    
    if(MainRows[0][0].resumeCount > 0) {main = 'N';}  
    console.log(main);
    // resumes 테이블에 넣을 데이터
    // resumeParams = [user_no, introduction, link, writing_status];
    //console.log(link[0].link_Url)

    const createResumeQuery = `
        INSERT INTO resumes(user_no, resumeName, introduction, linkUrl, writingStatus, main)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const insertResumeRows = await connection.query(createResumeQuery, [user_no, resumeName, introduction, link[0].link_Url, writing_status, main]);
    return insertResumeRows;
}

// 나머지 이력서 관련 테이블에 생성
async function createResumeRest (connection, user_no, resumeNo, company_career, school){
    // UserCompanyCareers 테이블에 넣을 데이터
    // careerParams = [user_no, resumeNo, company_career];
    //console.log(company_career)
    for(i=0; i<company_career.length; i++){

    
        const name = company_career[i][0].name;
        const position = company_career[i][1].position;
        const start = company_career[i][2].start;
        const end = company_career[i][3].end;
        const working = company_career[i][4].working;

        const createCareerQuery = `
            INSERT INTO UserCompanyCareers(user_no, resume_no, companyName, departmentPosition, joinDate, workDate, working)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const [insertCareerRows] = await connection.query(
            createCareerQuery,
            [user_no, resumeNo, name, position, start, end, working]
        );
    }    

    // YserSchools 테이블에 넣을 데이터
    //schoolParams = [user_no, resumeNo, school];
    console.log(school)
    for(i=0; i<school.length; i++){
        const schoolName = school[i][0].name;
        const major = school[i][1].major;
        const contents = school[i][2].contents;
        const schoolStart = school[i][3].start;
        const schoolEnd = school[i][4].end;
        const attending = school[i][5].attending;
        
        //console.log(school[1].major)
        //console.log(school[1])
        
        const createSchoolQuery = `
            INSERT INTO UserSchools(user_no, resume_no, schoolName, majorDegree, contents, admissionDate, graduateDate, Attending)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const [insertSchoolRows] = await connection.query(
            createSchoolQuery,
            [user_no, resumeNo, schoolName, major, contents, schoolStart, schoolEnd, attending]
        );
    }

    return ;

}



// 이력서 status get 
async function selectStatus(connection, user_no, resume_no) { 
    const selectStatusQuery = `
                  SELECT status 
                  FROM resumes 
                  WHERE user_no = ? AND no = ?;
                  `;
    const [statusRow] = await connection.query(selectStatusQuery, [user_no, resume_no]);
    return statusRow;
  }


// 이력서 내용 조회
async function selectResume(connection, user_no, resume_no) {
    // 유저 정보 + introduction
    const selectIntro = `
        SELECT resumes.no, CONCAT(name, ' ', CONCAT(resumeName)) as resume_name,
               email, phone, introduction, linkUrl
        FROM Users
        INNER JOIN resumes on Users.no = resumes.user_no
        WHERE Users.no = ? AND resumes.no = ?;
    `;
    const introRows = await connection.query(selectIntro, [user_no, resume_no]);
    // 유저의 기업 경력
    const selectCareer = `
        SELECT companyName, departmentPosition, joinDate, workDate, working
        FROM UserCompanyCareers
        WHERE user_no = ? AND resume_no = ?;
    `;
    const careerRows = await connection.query(selectCareer, [user_no, resume_no]);
    // 유저의 학력
    const selectSchool = `
        SELECT schoolName, majorDegree, admissionDate, graduateDate, Attending
        FROM UserSchools
        WHERE user_no = ? AND resume_no = ?;    
    `;
    const schoolRows = await connection.query(selectSchool, [user_no, resume_no]);

    //console.log(introRows[0]);
    //console.log(careerRows[0]);
    
    console.log('바뀐후');
    introRows[0][0].company_career = careerRows[0];
    introRows[0][0].school = schoolRows[0];
    
    console.log(introRows[0][0])



    return introRows[0][0];
}

// 이력서 내용 수정
// updateResume(connection, user_no, resume_no, introduction, company_career, school, link, writing_status
async function updateResume(connection, user_no, resume_no, introduction, company_career, school, link, writing_status) {
    // 유저 정보 + introduction update
    console.log(link[0].link_Url)
    const updateIntroQuery = `
        UPDATE Users INNER JOIN resumes on Users.no = resumes.user_no
        SET introduction = ?, linkUrl = ?, writingStatus = ?
        WHERE Users.no = ? AND resumes.no = ?; 
    `;
    const introRows = await connection.query(updateIntroQuery, [introduction, link[0].link_Url, writing_status, user_no, resume_no]);
    
    
    /////////////////////////////////여기서부터 delete하고, update가 아닌 create//////////////////////////////////////////////////
    // 유저의 기업 경력
        // 해당 이력서의 전에 했던 경럭 행들 삭제하고
        const deleteCareer = `
            DELETE FROM UserCompanyCareers
            WHERE user_no = ? AND resume_no = ?;
        `;
        const deleteCareerRows = await connection.query(deleteCareer, [user_no, resume_no]);
    // 유저의 학력
        // 해당 이력서의 전에 했던 경럭 행들 삭제하고
        const deleteSchool = `
            DELETE FROM UserSchools
            WHERE user_no = ? AND resume_no = ?;
        `;
        const deleteSchoolRows = await connection.query(deleteSchool, [user_no, resume_no]);
        
        // 새로 받은 값 생성
    const createResume = await createResumeRest(connection, user_no, resume_no, company_career, school);


    return createResume;
}

// 이력서 삭제처리
async function updateResumeStatus(connection, user_no, resume_no) {

    const deleteResumeQuery = `
        UPDATE resumes
        SET status = 'N'
        WHERE user_no = ? AND no = ?
    `;
    const deleteResumeRows = await connection.query(deleteResumeQuery, [user_no, resume_no]);
    return deleteResumeRows;
}

// 이력서 리스트 조회
async function selectResumeList(connection, user_no) {
    // 유저 정보 + introduction
    const selectResumeList = `
        SELECT  resumes.no,
                case
                    when main = 'N' then ''
                    else '매치업 이력서'
                    end as basic_resume,
            CONCAT(name, ' ', CONCAT(resumeName)) as resume_name,
            DATE_FORMAT(resumes.updatedAt,'%Y.%c.%d') as date,
            case
                when writingStatus = 'WRITING' then '작성 중'
                else '작성 완료'
                end as writing_status
        FROM resumes INNER JOIN Users on resumes.user_no = Users.no
        WHERE user_no = ? AND resumes.status = 'Y'
        ORDER BY resumes.updatedAt;
    `;
    const resumeListRows = await connection.query(selectResumeList, user_no);


    return resumeListRows[0];
}

module.exports = {
    selectResumeCount,
    createResume,
    createResumeRest,
    selectResume,
    updateResume,
    updateResumeStatus,
    selectResumeList,
    selectStatus,
}