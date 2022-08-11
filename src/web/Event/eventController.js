const jwtMiddleware = require("../../../config/jwtMiddleware");
const eventProvider = require("../../web/Event/eventProvider");
const eventService = require("../../web/Event/eventService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 이벤트 조회 API
 * [GET] /web/event?InterestTagCategoryId=
 */
 exports.getEvent = async function (req, res) {
    /**
     * Query String: InterestTagCategoryId
     */    
    const InterestTagCategoryId = req.query.InterestTagCategoryId;
    const page_idx = req.query.page_idx; // 보여줄 페이지 숫자
    const size = req.query.size; // 보여줄 개수


    const eventResult = await eventProvider.retrieveEvent(InterestTagCategoryId, page_idx, size);
    
    console.log("길이:" + eventResult.length);
    if(eventResult.length === 0) {
        return res.send(errResponse(baseResponse.PAGING_END));
    }else{
        return res.send(response(baseResponse.EVENT_SUCCESS, eventResult)); 
    }
}