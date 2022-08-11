// 광고 배너 조회
async function selectAdvert(connection) {
    const selectAdvertListQuery = `
                  SELECT no, title, contents, advertImageUrl, advertUrl 
                  FROM Advertisements
                  WHERE status = 'Y';
                  `;
    const [advertRows] = await connection.query(selectAdvertListQuery);
    return advertRows;
}

// 태그별 기업 조회
async function selectcompanyByTag(connection) {
    // tag 랜덤 돌릴 것 : 1~4
    var randnum1 = createRandNum(1,4);
    var randnum2 = createRandNum(1,4);
    while (randnum1 === randnum2){
        randnum2 = createRandNum(1,4);
    }
    
    console.log(randnum1,randnum2);
    
    let tagNumparams = [randnum1,randnum2]; 

    const electcompanyByTagQuery = `
        SELECT CompanyTags.companyTagCategory_no, Companies.name, companyImageUrl, profileImageUrl, relatedWord
        From Companies
                INNER JOIN CompanyImage ON Companies.no = CompanyImage.company_no
                INNER JOIN CompanyTags ON Companies.no = CompanyTags.company_no
        WHERE main = 'Y' AND CompanyTagCategory_no = ?
        ORDER BY rand();
        `;
    const electcompanyByTagRows = [];
    electcompanyByTagRows[0] = await connection.query(electcompanyByTagQuery, tagNumparams[0]);
    electcompanyByTagRows[1] = await connection.query(electcompanyByTagQuery, tagNumparams[1]);

    
    return [electcompanyByTagRows[0],electcompanyByTagRows[1]];
}

// 요즘 뜨는 포지션 조회
async function selectPosition(connection) {
    const selectPositionQuery = `
        SELECT CompanyDuties.no, CompanyDuties.dutyCategory_no, title, country, location, name, companyImageUrl, likeCount
        FROM Companies
                INNER JOIN CompanyDuties on Companies.no = CompanyDuties.company_no
                INNER JOIN CompanyImage on Companies.no = CompanyImage.company_no
        WHERE main = 'Y'
        ORDER BY likeCount DESC limit 4;
    `;
    const [positionRows] = await connection.query(selectPositionQuery);
    return positionRows;
}

function createRandNum(min,max) {
    var ntemp = Math.floor(Math.random() * (max-min+1)) + min;
    return ntemp;
}

module.exports = {
    selectAdvert,
    selectcompanyByTag,
    selectPosition,

};
