const jwt = require('jsonwebtoken');
const secret_config = require('./secret');
const { response } = require("./response")
const { errResponse } = require("./response")
const baseResponse = require("./baseResponseStatus");
// 비회원용 고려 jwtMiddleware

const jwtMiddleware2 = (req, res, next) => {
    console.log('2로 잘 들어가나?')
    // read the token from header or url (토큰 존재하는지)
    const token = req.headers['x-access-token'] || req.query.token; // header에 있는거 가져와서 넣어주기 || Query String에 토큰 넣어주는 방법 고려한 것
    // token does not exist
    if(!token) { //존재하지 않는다면
        return 0
        //return res.send(errResponse(baseResponse.TOKEN_EMPTY))
    }

    // create a promise that decodes the token (실제 검증 과정 - 토큰이 유효한 토큰인지)
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret_config.jwtsecret , (err, verifiedToken) => { // 토큰이 유효한지 확인 (이때, 당연히 secret key 필요)
                if(err) reject(err); // 성공 못할 시
                resolve(verifiedToken) // 성공할 시 - 해당 토큰을 verifiedToken으로 넘겨줌
            })
        }
    );

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE))
    };
    // process the promise
    p.then((verifiedToken)=>{ // p = promise에 대해 추가적 로직 수행 
        //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
        req.verifiedToken = verifiedToken; // - 검증 완료된 verifiedToken을 다시 담아서 next() 수행
        next();
    }).catch(onError)
};

module.exports = jwtMiddleware2;