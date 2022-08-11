//selectSearch(connection, searchWord)

// 검색 결과 가져오기
async function selectSearch(connection, searchWord) {
    // 관련 직무 가져오기
    const selectDutyQuery = `
        SELECT CompanyDuties.no, CompanyDuties.dutyCategory_no, title, country, location, name, companyImageUrl
        FROM Companies
                INNER JOIN CompanyDuties on Companies.no = CompanyDuties.company_no
                INNER JOIN CompanyImage on Companies.no = CompanyImage.company_no
                INNER JOIN CompanyTags on Companies.no = CompanyTags.company_no
        WHERE main = 'Y' AND title LIKE '%${searchWord}%' GROUP BY name;
                  `;
    let [searchDutyRows] = await connection.query(selectDutyQuery);
    
    // 관련 회사 가져오기
    const selectCompanyQuery = `
        SELECT name, profileImageUrl, relatedWord
        FROM Companies
                INNER JOIN CompanyDuties on Companies.no = CompanyDuties.company_no
        WHERE title LIKE '%${searchWord}%' GROUP BY name;
    `;
    const [searchCompanyRows] = await connection.query(selectCompanyQuery);
    
    // 연관 직무 이름 가져오기
    const selectDutyNameQuery = `
        SELECT name
        FROM DutyCategories
        WHERE name LIKE '%${searchWord}%';
    `;
    const [searchDutyNameRows] = await connection.query(selectDutyNameQuery);

    /////////////////////////
    //console.log(searchDutyRows)
    //let result = [];
    //result.dutyName = searchDutyNameRows
    //result.company = searchCompanyRows;
    //result.duty = searchDutyRows;

    //console.log(result);


    //console.log(searchDutyRows)
    console.log(typeof(searchCompanyRows))
    let result = new Object();
    result.dutyName = searchDutyNameRows;
    result.company = searchCompanyRows;
    result.duty = searchDutyRows;
    return result;
}

module.exports = {
    selectSearch,
};
