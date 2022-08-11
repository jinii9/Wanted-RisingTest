const jwtMiddleware = require("../../../config/jwtMiddleware");
const homeProvider = require("../../web/Home/homeProvider");
const homeService = require("../../web/Home/homeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 1
 * API Name : 메인 광고 배너 조회 API
 * [GET] /web/home/advertisments
 */
 exports.getAdvertisment = async function (req, res) {

    const advertListResult = await homeProvider.retrieveAdvertList();
    
    return res.send(response(baseResponse.HOME_ADVERT_SUCCESS, advertListResult)); 
    
}

/**
 * API No. 2
 * API Name : 커리어 인사이트 조회 API
 * [GET] /web/home/insights?InterestTagCategoryId=
 */
 exports.getInsights = async function (req, res) {
    /**
     * Query String: InterestTagCategoryId
     */    
    const InterestTagCategoryId = req.query.InterestTagCategoryId;


    const ingsightsListResult = await homeProvider.retrieveInsightsList(InterestTagCategoryId);
    
    return res.send(response(baseResponse.HOME_INSIGHTS_SUCCESS, ingsightsListResult)); 
    
}

/**
 * API No. 3
 * API Name : 3분만에 읽는 아티클 조회 API
 * [GET] /web/home/article
 */
 exports.getArticle = async function (req, res) {

    const articleResult = await homeProvider.retrieveArticle();
    
    return res.send(response(baseResponse.HOME_ARTICLE_SUCCESS, articleResult)); 
    
}

/**
 * API No. 4
 * API Name : 커리어 성장 이벤트 API
 * [GET] /web/home/growthEvent
 */
 exports.getGrowthEvent = async function (req, res) {

    const growthResult = await homeProvider.retrieveGrowth();
    
    return res.send(response(baseResponse.HOME_GROWTH_SUCCESS, growthResult)); 
    
}

/**
 * API No. 5
 * API Name : Vod API
 * [GET] /web/home/vod
 */
 exports.getVod = async function (req, res) {

    const vodResult = await homeProvider.retrieveVod();
    
    return res.send(response(baseResponse.HOME_VOD_SUCCESS, vodResult)); 
    
}