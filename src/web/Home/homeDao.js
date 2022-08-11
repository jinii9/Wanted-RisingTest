// 홈-메인배너 리스트 get
async function selectAdvert(connection) {
    const selectAdvertListQuery = `
                  SELECT no, title, contents, advertImageUrl, advertUrl 
                  FROM Advertisements
                  WHERE status = 'Y';
                  `;
    const [advertRows] = await connection.query(selectAdvertListQuery);
    return advertRows;
}

// 홈 인사이트 리스트 get
async function selectInsights(connection, InterestTagCategoryId) {
    const selectInsightsListQuery = `
                  SELECT title, writer, contents, insightsImageUrl, insightsUrl
                  FROM CareerInsights
                  WHERE status = 'Y' AND interestTagCategory_no = ?;
                  `;
    const [insightsRows] = await connection.query(selectInsightsListQuery, InterestTagCategoryId);
    return insightsRows;
}

// 3분만에 읽는 원티드 아티클 리스트 get
async function selectArticle(connection) {
    const selectArticleQuery = `
        SELECT Events.no, title,
        eventImageUrl, eventUrl
        FROM Events
        WHERE eventCategory_no = 6;
    `;
    const [articleRows] = await connection.query(selectArticleQuery);
    //console.log(articleRows)

    const selectArticleInterestTagQuery = `
        SELECT Events.no,interestTagCategory_no
        FROM Events INNER JOIN EventInterestTags on Events.no = EventInterestTags.event_no
        WHERE eventCategory_no = 6;
    `;
    const [articleInterestTagRows] = await connection.query(selectArticleInterestTagQuery);
    //console.log(articleInterestTagRows)
    //console.log(articleRows[i].no)
   
   

    console.log('길이 : ' + articleInterestTagRows.length)
    let tags_no_list = [];
    
    for(i=0; i<articleRows.length; i++){
        //articleRows[i].interesTagCategory_no = tags_no_list;
        
        for(j=0; j<articleInterestTagRows.length; j++){
            //console.log('아티클 넘버 : ' + articleRows[i].no)
            //console.log('아티클 넘버와 같은지 :  ' + articleInterestTagRows[j].no)
            //console.log('아티클 넘버 같으면 넣을 : ' + articleInterestTagRows[j].interestTagCategory_no)
            if(articleRows[i].no === articleInterestTagRows[j].no){
                tags_no_list.push(articleInterestTagRows[j].interestTagCategory_no)
            }
            //articleRows[i].interesTagCategory_no = articleInterestTagRows[j].interestTagCategory_no;
            //console.log(articleRows[i].interesTagCategory_no); 
        }
        articleRows[i].interesTagCategory_no = tags_no_list;
        tags_no_list = [];
    }
    //console.log(tags_no_list);
    
    //articleRows[0].interesTagCategory_no = tags_no_list; 
    //console.log(articleRows[0])


    return articleRows;
}

// 커리어 성장 이벤트 리스트 가져오기 - 이벤트 중에서 관심태그가 3 (회사생활)
async function selectGrowth(connection) {
    const selectGrowthQuery = `
        SELECT Events.no, eventCategory_no, title, onlineCheck,
        eventImageUrl, eventUrl
        FROM Events INNER JOIN EventInterestTags on Events.no = EventInterestTags.event_no
        WHERE interestTagCategory_no = 3;
    `;
    const [growthRows] = await connection.query(selectGrowthQuery);
    return growthRows;
}

// vod
async function selectVod(connection) {
    const selectVodQuery = `
        SELECT no, writer, title, detailTitle, vodImageUrl, vodUrl, playTime
        FROM Vods;
    `;
    const [vodRows] = await connection.query(selectVodQuery);
    return vodRows;
}


module.exports = {
    selectAdvert,
    selectInsights,
    selectArticle,
    selectGrowth,
    selectVod,
};
