// 좋아요 status 조회
async function selectLikeStatus(connection, user_no, companyDuty_no) {
    console.log(user_no, companyDuty_no)
    
    const selectLikeListQuery = `
        SELECT user_no, status
        FROM likeList
        WHERE user_no = ? AND companyDuty_no = ?;
    `;
    const [likeRows] = await connection.query(selectLikeListQuery, [user_no, companyDuty_no]);
    //console.log('확인2')
    return likeRows;
}

// 좋아요 status 수정
async function updateLikeStatus(connection, user_no, companyDuty_no) {
    const updateLikeListQuery = `
        UPDATE likeList
        SET status = 'Y'
        WHERE user_no = ? AND companyDuty_no = ?;
    `;
    const [likeRows] = await connection.query(
        updateLikeListQuery,
        [user_no, companyDuty_no]
    );

    console.log('확인 : ' + companyDuty_no);
    // 좋아요 누르면 companyDuties테이블의 likeCount 하나 늘어나게
    const updateLikeCountQuery = `
        UPDATE CompanyDuties
        SET likeCount = likeCount + 1
        WHERE no = ?;
    `;
    console.log('확인 : ' + companyDuty_no);
    const updateLikeCount = await connection.query(updateLikeCountQuery, companyDuty_no);

    return likeRows;
}

// 좋아요 리스트 생성
async function createLikeStatus(connection, user_no, companyDuty_no) {
    const createLikeListQuery = `
        INSERT INTO likeList(user_no, companyDuty_no)
        VALUES (?, ?);
    `;
    const [insertLikeRows] = await connection.query(
        createLikeListQuery,
        [user_no, companyDuty_no]
    );
    //console.log('확인 : ' + companyDuty_no);
    // 좋아요 누르면 companyDuties테이블의 likeCount 하나 늘어나게
    const updateLikeCountQuery = `
        UPDATE CompanyDuties
        SET likeCount = likeCount + 1
        WHERE no = ?;
    `;
    //console.log('확인 : ' + companyDuty_no);
    const updateLikeCount = await connection.query(updateLikeCountQuery, companyDuty_no);

    return insertLikeRows;
}

// 기업 직무 likeCount +1 해주기
// updateLikeCount(connection, companyDuty_no
// 하트 수 +1 증가
async function updateCompanyLikeCount(connection, companyDuty_no) {
    const updateLikeCountQuery = `
      UPDATE CompanyDuties
      SET likeCount = likeCount + 1
      WHERE no = ?
    `;
    const updateLikeCountRow = await connection.query(updateLikeCountQuery, companyDuty_no);
    return updateLikeCountRow[0];
  }



// 좋아요 삭제처리
async function deleteLikeStatus(connection, user_no, companyDuty_no) {
    const deleteLikeListQuery = `
        UPDATE likeList
        SET status = 'N'
        WHERE user_no = ? AND companyDuty_no = ?;
    `;
    const [deletelikeRows] = await connection.query(
        deleteLikeListQuery,
        [user_no, companyDuty_no]
    );

    console.log('확인 : ' + companyDuty_no);
    // 좋아요 누르면 companyDuties테이블의 likeCount 하나 빠지게
    const updateLikeCountQuery = `
        UPDATE CompanyDuties
        SET likeCount = likeCount - 1
        WHERE no = ?;
    `;
    const updateLikeCount = await connection.query(updateLikeCountQuery, companyDuty_no);

    return deletelikeRows;
}

// 좋아요 리스트 조회
async function selectLikeList(connection, user_no) {
    
    const selectLikeListQuery = `
        SELECT CompanyDuties.no, title, country, location, name, companyImageUrl
        FROM Companies
                INNER JOIN CompanyDuties on Companies.no = CompanyDuties.company_no
                INNER JOIN CompanyImage on Companies.no = CompanyImage.company_no
                INNER JOIN likeList on CompanyDuties.no = likeList.companyDuty_no
        WHERE main = 'Y' AND likeList.user_no = ? AND likeList.status = 'Y';
    `;
    const [likeListRows] = await connection.query(selectLikeListQuery, user_no);
    //console.log('확인2')
    return likeListRows;
}


module.exports = {
    selectLikeStatus,
    updateLikeStatus,
    createLikeStatus,
    deleteLikeStatus,
    selectLikeList,
    updateCompanyLikeCount,
}