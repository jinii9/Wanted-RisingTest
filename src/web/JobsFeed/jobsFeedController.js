const jwtMiddleware = require("../../../config/jwtMiddleware");
const jobsFeedProvider = require("../../web/JobsFeed/jobsFeedProvider");
const jobsFeedService = require("../../web/JobsFeed/jobsFeedService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 1
 * API Name : 채용 광고 배너 조회 API
 * [GET] /web/jobsFeed/advertisments
 */
 exports.getAdvertisment = async function (req, res) {
    
    const advertListResult = await jobsFeedProvider.retrieveAdvertList();
    
    return res.send(response(baseResponse.HOME_ADVERT_SUCCESS, advertListResult)); 
    
}

/**
 * API No. 2
 * API Name : 태그별 회사 조회 API
 * [GET] /web/jobsFeed/companyByTag
 */
 exports.getCompanyByTag = async function (req, res) {


    const companyByTagResult = await jobsFeedProvider.retrieveCompanyByTag();
    //console.log('확인')
    console.log(companyByTagResult[0][0]);
    //console.log(companyByTagResult[1][1]);
    return res.send(response(baseResponse.JOPSFEED_TAG_SUCCESS, [companyByTagResult[0][0],companyByTagResult[1]])); 
    
}

/**
 * API No. 3
 * API Name : 요즘 뜨는 포지션 조회 API
 * [GET] /web/jobsFeed/famousPosition
 */
exports.getFamusPosision = async function (req, res) {
    console.log('확인');
    const positionResult = await jobsFeedProvider.retrievePosition();
    console.log(positionResult);
    return res.send(response(baseResponse.JOPSFEED_POSITION_SUCCESS, positionResult));
}


