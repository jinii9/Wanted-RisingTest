const e = require("express");

// 이벤트 리스트 get
async function selectEvent(connection, InterestTagCategoryId, page_idx, size) {
    let string = `NOT EventInterestTags.interestTagCategory_no IS NULL`;
    //let string2 = ""
    console.log(page_idx, size);
    let start_idx = size * (page_idx-1);
    if(InterestTagCategoryId != 0){

        string = `interestTagCategory_no = ${InterestTagCategoryId}`;
        //string2 = `interestTagCategory_no = ${InterestTagCategoryId}`;
    } 
    



 
    const selectEventQuery = `
        SELECT Events.no, title, eventCategory_no, onlineCheck,
            CONCAT(startDate, ' ~ ', endDate) as date,
            eventImageUrl, eventUrl
        FROM Events INNER JOIN EventInterestTags on Events.no = EventInterestTags.event_no
        WHERE ${string}
        GROUP BY Events.no
        ORDER BY Events.no DESC
        LIMIT ${start_idx},${size};
        `;
    const [eventRows] = await connection.query(selectEventQuery);

    //
    const selectInterestTagQuery = `
    SELECT Events.no,interestTagCategory_no
    FROM Events INNER JOIN EventInterestTags on Events.no = EventInterestTags.event_no
    `;
    const [interestTagRows] = await connection.query(selectInterestTagQuery);

    ////
    console.log('길이 : ' + eventRows.length)
    let tags_no_list = [];
    
    for(i=0; i<eventRows.length; i++){
        //articleRows[i].interesTagCategory_no = tags_no_list;
        
        for(j=0; j<interestTagRows.length; j++){
            //console.log('아티클 넘버 : ' + articleRows[i].no)
            //console.log('아티클 넘버와 같은지 :  ' + articleInterestTagRows[j].no)
            //console.log('아티클 넘버 같으면 넣을 : ' + articleInterestTagRows[j].interestTagCategory_no)
            if(eventRows[i].no === interestTagRows[j].no){
                tags_no_list.push(interestTagRows[j].interestTagCategory_no)
            }
 
        }
        eventRows[i].interesTagCategory_no = tags_no_list;
        tags_no_list = [];
    }





    console.log(eventRows);
    return eventRows;

}

module.exports = {
    selectEvent,
};