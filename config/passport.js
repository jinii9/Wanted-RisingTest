// const jwt = require('jsonwebtoken');
// const secret_config = require('./secret');
// const { response } = require("./response")
// const { errResponse } = require("./response")
// const baseResponse = require("./baseResponseStatus");


// const passport = require('passport')
// const KakaoStrategy = require('passport-kakao').Strategy
// const passport2 = (req, res, next) => {

//     //var resultToken = "";
//     passport.use(
//         'kakao-login',
//         new KakaoStrategy(
//             {
//                 clientID: 'a0c4661bb6aebfd8da2d538881724e15',
//                 //clientSecret: '[SECRET KEY]',
//                 callbackURL: 'http://localhost:3000/auth/kakao/callback',
//             },
//             function (accessToken, refreshToken, profile, done) {
//                 result = {
//                     accessToken: accessToken,
//                     refreshToken: refreshToken,
//                     profile: profile,
//                 };
//                 console.log('KakaoStrategy', result);
                
//                 //resultToken = result.accessToken;
//                 console.log('resultToken : ' + result.accessToken);
//                 //exports.resultToken = result.accessToken;
//                 //console.log('resultToken2 : ' + resultToken)
                
//                 return result.accessToken;
//                 //return done;
//                 //return send(response(baseResponse.LOGIN_SUCCESS, result));
//                 //res.send(response(baseResponse.SIGNIN_PASSWORD_EMPTY)
//             },
//         ),
//     );

// };

// module.exports = passport2;