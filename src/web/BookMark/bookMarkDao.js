// 북마크 status 조회
async function selectBookMarkStatus(connection, user_no, companyDuty_no) {
    console.log(user_no, companyDuty_no)
    
    const selectBookMarkListQuery = `
        SELECT user_no, status
        FROM BookMarkList
        WHERE user_no = ? AND companyDuty_no = ?;
    `;
    const [bookMarkRows] = await connection.query(selectBookMarkListQuery, [user_no, companyDuty_no]);
    //console.log('확인2')
    return bookMarkRows;
}

// 북마크 status 수정
async function updateBookMarkStatus(connection, user_no, companyDuty_no) {
    const updateBookMarkListQuery = `
        UPDATE BookMarkList
        SET status = 'Y'
        WHERE user_no = ? AND companyDuty_no = ?;
    `;
    const [bookMarkRows] = await connection.query(
        updateBookMarkListQuery,
        [user_no, companyDuty_no]
    );
    return bookMarkRows;
}

// 북마크 리스트 생성
async function createBookMarkStatus(connection, user_no, companyDuty_no) {
    const createBookMarkListQuery = `
        INSERT INTO BookMarkList(user_no, companyDuty_no)
        VALUES (?, ?);
    `;
    const [insertBookMarkRows] = await connection.query(
        createBookMarkListQuery,
        [user_no, companyDuty_no]
    )
    return insertBookMarkRows;
}

// 북마크 삭제처리
async function deleteBookMarkStatus(connection, user_no, companyDuty_no) {
    const deleteBookMarkListQuery = `
        UPDATE BookMarkList
        SET status = 'N'
        WHERE user_no = ? AND companyDuty_no = ?;
    `;
    const [deleteBookMarkRows] = await connection.query(
        deleteBookMarkListQuery,
        [user_no, companyDuty_no]
    );
    return deleteBookMarkRows;
}

// 북마크 리스트 조회
async function selectBookMarkList(connection, user_no) {
    
    const selectBookMarkListQuery = `
        SELECT CompanyDuties.no, title, country, location, name, companyImageUrl
        FROM Companies
                INNER JOIN CompanyDuties on Companies.no = CompanyDuties.company_no
                INNER JOIN CompanyImage on Companies.no = CompanyImage.company_no
                INNER JOIN BookMarkList on CompanyDuties.no = BookMarkList.companyDuty_no
        WHERE main = 'Y' AND BookMarkList.user_no = ? AND BookMarkList.status = 'Y';
    `;
    const [bookMarkListRows] = await connection.query(selectBookMarkListQuery, user_no);
    //console.log('확인2')
    return bookMarkListRows;
}


module.exports = {
    selectBookMarkStatus,
    updateBookMarkStatus,
    createBookMarkStatus,
    deleteBookMarkStatus,
    selectBookMarkList,
}