const jwtMiddleware = require("../../../config/jwtMiddleware");
const jobPostingProvider = require("../../web/JobPosting/jobPostingProvider");
const jobPostingService = require("../../web/JobPosting/jobPostingService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 1
 * API Name : 채용중인 직무 조회 API
 * [GET] /web/jobPostingList
 */
 exports.getJobPosting = async function (req, res) {

    //const user_no = req.query.user_no;
    //const jobCategoryId = req.query.jobCategoryId;
    const jobCategoryId = req.query.jobCategoryId;
    const dutyCategoryIds = req.query.dutyCategoryIds; //필수
    const country = req.query.country; //필수
    const locations = req.query.locations; //필수 + all 고려
    const years = req.query.years; //필수 + 전체 고려
    const skill_tags = req.query.skill_tags;
    const job_sort = req.query.job_sort; //필수
    const user_tags = req.query.user_tags;
    
    // 포스트맨 params에 체크 표시 빼면 undefined로 나옴!!!
    // if(!user_tags){
    //     console.log('test');
    // } else{ console.log('test2')}
    

    const jobPostingListResult = await jobPostingProvider.retrievejobPostingList(jobCategoryId, dutyCategoryIds, country, locations, years, skill_tags, job_sort, user_tags);
    //console.log(jobPostingListResult)
    return res.send(response(baseResponse.JOPOSTINGLIST_SUCCESS, jobPostingListResult)); 
    
}
