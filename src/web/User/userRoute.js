module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const {response} = require("../../../config/response");
    const baseResponse = require("../../../config/baseResponseStatus");
    //const passport = require('../../../config/passport/index.js');

    // 0. 테스트 API
    app.get('/web/test', user.getTest)

    // 쿼리스트링 test
    app.get('/web/test2', user.test2);
/////////////////////////////////////////////////////////////////////////
    /////////////////////////////
    
    // 소셜 로그인
    //var passport = require('passport');
    
    // app.get('/kakao', passport.authenticate('kakao-login'));
    // app.get('/auth/kakao/callback', passport.authenticate('kakao-login', {
    //     failureRedirect: '/',
    // }), (req, res) => {
    //     res.redirect('/');
    // });

    /////////////////////////////
    // //access 토큰
    const passport = require('passport')
    const KakaoStrategy = require('passport-kakao').Strategy
    //var resultToken = "";
    passport.use(
        'kakao-login',
        new KakaoStrategy(
            {
                clientID: 'a0c4661bb6aebfd8da2d538881724e15',
                //clientSecret: '[SECRET KEY]',
                //callbackURL: 'http://localhost:3000/auth/kakao/callback',
                callbackURL: 'https://prod.seojin.shop/auth/kakao/callback',
            },
            function (accessToken, refreshToken, profile, done) {
                result = {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    profile: profile,
                };
                console.log('KakaoStrategy', result);
                
                //resultToken = result.accessToken;
                console.log('resultToken : ' + result.accessToken);
                
                
                //exports.resultToken = result.accessToken;
                //console.log('resultToken2 : ' + resultToken)
                
                global.accessToken = result.accessToken;

                
                return done;
                //return send(response(baseResponse.LOGIN_SUCCESS, result));
                //res.send(response(baseResponse.SIGNIN_PASSWORD_EMPTY)
            },
        ),
    );
    
  
    //app.post('/users/kakao-login', user.kakaoLogin);
    app.post('/users/kakao-login', user.kakaoLogin);
    app.get('/kakao', passport.authenticate('kakao-login'));
    app.get('/auth/kakao/callback', passport.authenticate('kakao-login', { failureRedirect: '/auth', successRedirect: '/' }));



    // 1. 회원가입/로그인 이메일 체크 API
    app.post('/web/users/email', user.getUsersEmail);

    // 2. 유저 생성 (회원가입) API 
    app.post('/web/users', user.postUsers);

    // TODO: After 로그인 인증 방법 (JWT)
    // 3. 로그인 하기 API (JWT 생성)
    app.post('/web/login', user.login);

    // TODO: 자동 로그인 API (JWT 검증 및 Payload 내뱉기)
    // 3-2. JWT 검증 API
    app.get('/web/auto-login', jwtMiddleware, user.check);



    // 4. 특정 유저 전문분야 생성 API
    app.post('/web/users/:userId/specialty', jwtMiddleware, user.postSpecialty);

    // 5. 특정 유저 학교/직장 생성 API
    app.post('/web/users/:userId/schoolCompany', jwtMiddleware, user.postSchoolCompany);

    // 6. 특정 유저 관심 태그 생성 API
    app.post('/web/users/:userId/interestTag', jwtMiddleware, user.postInterestTag);
    
    /////////
    
    // 7. 특정 유저 전문분야 수정 API
    app.patch('/web/users/:userId/specialty', jwtMiddleware, user.patchSpecialty);
    
    // 8. 특정 유저 학교/직장 수정 API
    app.patch('/web/users/:userId/schoolCompany', jwtMiddleware, user.patchSchoolCompany);


    // 9. 특정 유저 탈퇴처리 API
    app.patch('/web/users/:userId/status', jwtMiddleware, user.patchUserStatus);
};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API