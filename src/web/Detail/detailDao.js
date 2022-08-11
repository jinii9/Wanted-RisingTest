// 디테일 리스트 get
// 회원용
async function selectDetail(connection, user_no, companyDuty_no) {
    
    // 기업 직무 디테일
    const selectDetailQuery = `
            SELECT CompanyDuties.no,
            title,
            name,
            likeCount,
            location,
            country,
            contents,
            workArea,
            relatedWord,
            deadLine,
            profileImageUrl
        FROM Companies
            INNER JOIN CompanyDuties on Companies.no = CompanyDuties.company_no
        WHERE CompanyDuties.no = ?;
        `;
    const [detailRows] = await connection.query(selectDetailQuery, companyDuty_no);
    
    // 기업 이미지들
    const selectImagesQuery = `
        SELECT companyImageUrl
        FROM CompanyImage
                INNER JOIN CompanyDuties on CompanyImage.company_no = CompanyDuties.company_no
        WHERE CompanyDuties.no = ?;
        `;
    const imagesRows = await connection.query(selectImagesQuery, companyDuty_no);    

    // 기업 태그들
    const selectTagsQuery = `
        SELECT companyTagCategory_no
        FROM CompanyTags
                INNER JOIN CompanyDuties on CompanyTags.company_no = CompanyDuties.company_no
        WHERE CompanyDuties.no = ?;
    `;
    const tagsRows = await connection.query(selectTagsQuery, companyDuty_no);
    //console.log(tagsRows[0])


    // 배열에 배열 추가하는 방법
    console.log(imagesRows[0])
    console.log('확인')
    console.log(tagsRows[0])


    ///////// 이미지들
    // 객체 안 companyTagCategory_no의 값들을 배열에 넣어주기
    const images_no_list=[];
    for(i=0; i<imagesRows[0].length; i++){
    images_no_list.push(imagesRows[0][i].companyImageUrl);
    }
    console.log(images_no_list);
    // 그리고 배열 안에 있는 객체에 key값 지정 후, 위에서 만든 배열 값 넣어주기
    //detailRows.companyImageUrl = images_no_list; 
    detailRows[0].companyImageUrl = images_no_list; 
    console.log(detailRows[0])

    ///////// 태그들
    // 객체 안 companyTagCategory_no의 값들을 배열에 넣어주기
    const tags_no_list=[];
    for(i=0; i<tagsRows[0].length; i++){
    tags_no_list.push(tagsRows[0][i].companyTagCategory_no);
    }
    console.log(tags_no_list);
    // 그리고 배열 안에 있는 객체에 key값 지정 후, 위에서 만든 배열 값 넣어주기
    //detailRows.companyImageUrl = images_no_list; 
    detailRows[0].companyTagCategory_no = tags_no_list; 
    console.log(detailRows[0])



    // // 배열에 배열 추가하는 방법    
    // imagesRows[0].push.apply(imagesRows[0],tagsRows[0]);

    // // 배열에 포함된 객체에 요소를 추가하는 방법
    // const count = imagesRows[0].push(detailRows);


    // <비회원용>
    console.log(user_no);
    if(user_no === 0) {
        return detailRows[0];

    
    } else { // <회원용>
        // 내가 좋아요/북마크 눌렀는지 확인 (user_no, companyDuty_no)
        console.log("확인 : " + user_no)
        const selectLikeByUser = `
            SELECT user_no
            FROM likeList
            WHERE user_no = ? AND companyDuty_no = ? AND status = 'Y';
        `;
        const selectBookByUser = `
            SELECT user_no
            FROM BookMarkList
            WHERE user_no = ? AND companyDuty_no = ? AND status = 'Y';
        `;

        const [likeRows] = await connection.query(selectLikeByUser,[user_no, companyDuty_no]);
        const [bookRows] = await connection.query(selectBookByUser,[user_no, companyDuty_no]);

        // 좋아요 확인
        const likeCheck = new Object();
        if(likeRows.length > 0) {
            likeCheck['likeCheck'] = 'Y';
            console.log(likeCheck) 
        } else {
            likeCheck['likeCheck'] = 'N';
            console.log(likeCheck)           
        }
        // 북마크 확인
        const bookCheck = new Object();
        if(bookRows.length > 0) {
            bookCheck['bookCheck'] = 'Y';
            console.log(bookCheck) 
        } else {
            bookCheck['bookCheck'] = 'N';
            console.log(bookCheck)           
        }
        //console.log(likeCheck.likeCheck);
        //console.log(bookCheck.bookCheck);
        //console.log(detailRows[0])
        detailRows[0].likeCheck = likeCheck.likeCheck;
        detailRows[0].bookMarkCheck = bookCheck.bookCheck; 
        // const count1 = imagesRows[0].push(likeCheck);
        // const count2 = imagesRows[0].push(bookCheck);
        console.log(detailRows[0])
        
        return detailRows[0];
    }

    

}

module.exports = {
    selectDetail,
};