const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const jobPostingDao = require("./jobPostingDao");


exports.retrievejobPostingList = async function(jobCategoryId, dutyCategoryIds, country, locations, years, skill_tags, job_sort, user_tags){
    //console.log(jobCategoryId, dutyCategoryIds, country, locations, years, skill_tags, job_sort, user_tags)
    const connection = await pool.getConnection(async (conn) => conn);
    // // 값 하나일 경우 - dutyCategoryIds, skill_tags
    // if(!Array.isArray(dutyCategoryIds)){
    //     dutyCategoryIds=[dutyCategoryIds]
    // }
    // if(!Array.isArray(user_tags)){
    //     user_tags=[user_tags]
    // }



    // // locations를 location과 workArea로 분리
    // let words = [];
    // let location = [];
    // let workArea = [];

    // // 값 하나일 때
    // if(locations){
    //     if(!Array.isArray(locations)){
    //         words = locations.split('.');
    //         location[0] = words[0],
    //         workArea[0] = words[1] 
    //     }else {
    //         for(i=0; i<locations.length; i++){
    //             words = locations[i].split('.'); //words[0]=서울 words[1]=강남구
    //             location[i] = words[0];
    //             workArea[i] = words[1];
    //             words = [];
    //         }
    //     }
    // }
    // console.log("확인")
    // //console.log(locations)
    // console.log(location)
    // console.log(workArea)

    const jobPostingResult = await jobPostingDao.selectjobPosting(connection, jobCategoryId, dutyCategoryIds, country, locations, years, skill_tags, job_sort, user_tags);
    
    connection.release();
    
    //console.log('jobPostingResult : ' + jobPostingResult);
    //console.log(jobPostingResult)
    return jobPostingResult;
    };