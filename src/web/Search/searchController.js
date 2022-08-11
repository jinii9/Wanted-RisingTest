const jwtMiddleware = require("../../../config/jwtMiddleware");
const searchProvider = require("../../web/Search/searchProvider");
const searchService = require("../../web/Search/searchService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : search API
 * [GET] /web/search?search_word=
 */
 exports.getSearch = async function (req, res) {
    /**
    * Query String: search_word
    */    
    const searchWord = req.query.search_word;

    if(!searchWord){return res.send(errResponse(baseResponse.SEARCH_WORD_EMPTY))};

    const searchResult = await searchProvider.retrieveSearch(searchWord);
    console.log("확인확인확인")
    //console.log(searchResult)
    // console.log(searchResult[0])
    return res.send(response(baseResponse.SEARCH_WORD_SUCCESS, searchResult)); 
    
}