const jwtMiddleware2 = require("../../../config/jwtMiddleware");
const detailProvider = require("../../web/Detail/detailProvider");
const detailService = require("../../web/Detail/detailService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 1
 * API Name : 기업 직무 디테일 조회 API
 * [GET] /web/Postingdetail/:companyDutyId
 */
 exports.getDetailList = async function (req, res) {
    /**
     * Query String: userId
     */    
     const companyDuty_no = req.params.companyDutyId;
     let user_no = req.query.userId;
     //console.log(user_no)   
     // 
     if(!user_no) user_no = 0;// 비회원용(userId : 0)
    //console.log(companyDuty_no, user_no); 
    //console.log(user_no)

    const detailResult = await detailProvider.retrieveDetail(user_no, companyDuty_no);

    return res.send(response(baseResponse.DETAIL_SUCCESS, detailResult));
}
