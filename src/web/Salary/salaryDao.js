// 직군별 연봉 리스트 get
async function selectSalary(connection, jobCategory_no, dutyCategory_no) {
    console.log(jobCategory_no, dutyCategory_no)
    const selectSalaryQuery = `
        SELECT Salaries.no, jobCategory_no, dutyCategory_no, career, price
        FROM  Salaries INNER JOIN DutyCategories on Salaries.dutyCategory_no =  DutyCategories.no
        WHERE jobCategory_no = ? AND Salaries.dutyCategory_no = ?;
    `;
    const [salaryRows] = await connection.query(selectSalaryQuery, [jobCategory_no, dutyCategory_no]);
    return salaryRows;
}

// 연봉 업그레이드 포지션 조회
async function selectPosition(connection) {
    const selectPositionQuery = `
        SELECT CompanyDuties.no, title, country, location, name, companyImageUrl
        FROM Companies
                INNER JOIN CompanyDuties on Companies.no = CompanyDuties.company_no
                INNER JOIN CompanyImage on Companies.no = CompanyImage.company_no
                INNER JOIN CompanyTags on Companies.no = CompanyTags.company_no
        WHERE main = 'Y' AND companyTagCategory_no = 1
        LIMIT 8;
    `;
    const [positionRows] = await connection.query(selectPositionQuery);
    return positionRows;
}

module.exports = {
    selectSalary,
    selectPosition,

};
