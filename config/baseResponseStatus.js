module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },
    SIGNIN_EMAIL_SUCCESS : { "isSuccess": true, "code": 1001, "message":"이메일이 존재합니다. 로그인으로 이동합니다."},
    SIGNIN_EMAIL_NOSUCCESS : { "isSuccess": false, "code": 3003, "message": "이메일이 존재하지 않습니다. 회원가입으로 이동합니다." },
    SIGNUP_SUCCESS : { "isSuccess": true, "code": 1003, "message":"회원가입 성공" },
    LOGIN_SUCCESS : { "isSuccess": true, "code": 1004, "message":"로그인 성공" },

    DELETE_SUCCESS : { "isSuccess": true, "code": 1033, "message":"유저 탈퇴처리 성공" },

    POSTSPECIALTY_SUCCESS : { "isSuccess": true, "code": 1007, "message":"전문분야 생성 성공" },
    POSTSCHOOLCOMPANY_SUCCESS : { "isSuccess": true, "code": 1008, "message":"학교/직장 생성 성공" },
    INTERESTTAG_SUCCESS : { "isSuccess": true, "code": 1009, "message":"관심태그 생성 성공" },
    UPDATESPECIALTY_SUCCESS : { "isSuccess": true, "code": 1013, "message":"전문분야 수정 성공" },
    UPDATESCHOOLCOMPANY_SUCCESS : { "isSuccess": true, "code": 1014, "message":"학교/직장 수정 성공" },
    POSTLIKE_SUCCESS : { "isSuccess": true, "code": 1015, "message":"좋아요 생성/수정 성공" },
    PATCHLIKE_SUCCESS : { "isSuccess": true, "code": 1016, "message":"좋아요 삭제처리 성공" },
    GETLIKELIST_SUCCESS : { "isSuccess": true, "code": 1017, "message":"좋아요 리스트 조회 성공" },
    POSTBOOKMARK_SUCCESS : { "isSuccess": true, "code": 1018, "message":"북마크 생성/수정 성공" },
    PATCHBOOKMARK_SUCCESS : { "isSuccess": true, "code": 1019, "message":"북마크 삭제처리 성공" },
    GETBOOKMARKLIST_SUCCESS : { "isSuccess": true, "code": 1020, "message":"북마크 리스트 조회 성공" },

    HOME_ADVERT_SUCCESS : { "isSuccess": true, "code": 1005, "message":"광고배너 불러오기 성공" },
    HOME_INSIGHTS_SUCCESS : { "isSuccess": true, "code": 1006, "message":"선택한 관심태그의 인사이트 불러오기 성공" },
    HOME_ARTICLE_SUCCESS : { "isSuccess": true, "code": 1033, "message":"3분만에 읽는 아티클 조회 성공" },
    
    HOME_GROWTH_SUCCESS : { "isSuccess": true, "code": 1034, "message":"커리어 성장 이벤트 조회 성공" },
    HOME_VOD_SUCCESS : { "isSuccess": true, "code": 1037, "message":"개발자 위한 VOD 조회 성공" },

    JOPOSTINGLIST_SUCCESS : { "isSuccess": true, "code": 1010, "message":"채용중인 직무 조회 성공" },
    
    JOPSFEED_TAG_SUCCESS : { "isSuccess": true, "code": 1011, "message":"태그별 기업 조회 성공" },
    JOPSFEED_POSITION_SUCCESS : { "isSuccess": true, "code": 1012, "message":"요즘 뜨는 포지션 조회 성공" },
    
    DETAIL_SUCCESS : { "isSuccess": true, "code": 1021, "message":"기업 직무 디테일 조회 성공" },

    PROFILE_SUCCESS : { "isSuccess": true, "code": 1022, "message":"프로필 조회 성공" },
    PROFILE_RESUME_SUCCESS : { "isSuccess": true, "code": 1023, "message":"프로필-기본이력서 조회 성공" },
    PROFILE_SPECIALTY_SUCCESS : { "isSuccess": true, "code": 1024, "message":"프로필-전문분야 조회 성공" },
    PATCHPPROFILE_SUCCESS : { "isSuccess": true, "code": 1025, "message":"프로필 수정 성공" },
    PATCHBASICRESUME_SUCCESS : { "isSuccess": true, "code": 1035, "message":"기본 이력서 변경 성공" },
    

    POSTRESUME_SUCCESS : { "isSuccess": true, "code": 1026, "message":"이력서 생성 성공" },
    GETRESUME_SUCCESS : { "isSuccess": true, "code": 1027, "message":"이력서 조회 성공" },
    PATCHRESUME_SUCCESS : { "isSuccess": true, "code": 1028, "message":"이력서 수정 성공" },
    DELETERESUME_SUCCESS : { "isSuccess": true, "code": 1029, "message":"이력서 삭제처리 성공" },
    GETRESUMELIST_SUCCESS : { "isSuccess": true, "code": 1030, "message":"이력서 리스트 조회 성공" },

    EVENT_SUCCESS : { "isSuccess": true, "code": 1031, "message":"이벤트 리스트 조회 성공" },
    
    SALARY_SUCCESS : { "isSuccess": true, "code": 1032, "message":"직무별 연봉 조회 성공" },
    SALARY_POSITION_SUCCESS : { "isSuccess": true, "code": 1036, "message":"연봉 업그레이드 포지션 조회 성공" },
    
    SEARCH_WORD_SUCCESS : { "isSuccess": true, "code": 1040, "message":"검색 성공" },
    
    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2002, "message":"올바른 이메일 형식을 입력해주세요." },
    SIGNUP_PASSWORD_WRONG : { "isSuccess": false, "code": 2003, "message": "비밀번호가 일치하지 않습니다." },
    SIGNUP_PHONE_EXIST : { "isSuccess": false, "code": 2004, "message": "이미 가입한 이력이 있어요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2005, "message": "비밀번호를 입력 해주세요." },
    INITIALSETTING_JOB_EMPTY : { "isSuccess": false, "code": 2019, "message": "직군을 입력 해주세요." },
    INITIALSETTING_DUTY_EMPTY : { "isSuccess": false, "code": 2020, "message": "직무를 입력 해주세요." },
    INITIALSETTING_CAREER_EMPTY : { "isSuccess": false, "code": 2021, "message": "경력을 입력 해주세요." },
    INITIALSETTING_SKILL_EMPTY : { "isSuccess": false, "code": 2022, "message": "스킬을 입력 해주세요." },

    LIKE_COMPANYDUTYNO_EMPTY : { "isSuccess": false, "code": 2023, "message": "기업의 직무 식별값을 입력 해주세요." },
    
    
    //SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    //SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"이름을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 20자리를 입력해주세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    
    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "유저 식별값을 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    RESUMEID_EMPTY : { "isSuccess": false, "code": 2028, "message": "이력서 식별값을 입력해주세요." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    PROFILE_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2024, "message": "이름을 입력해주세요." },
    PROFILE_PHONE_EMPTY : { "isSuccess": false, "code": 2025, "message": "전화번호를 입력해주세요." },
    
    RESUME_INTRODUCTION_EMPTY : { "isSuccess": false, "code": 2026, "message": "간단 소개글을 입력해주세요." },
    RESUME_INTRODUCTION_EROOR_TYPE : { "isSuccess": false, "code": 2027, "message": "글자 수가 부족합니다." },

    SEARCH_WORD_EMPTY : { "isSuccess": false, "code": 2038, "message":"검색할 단어를 입력해주세요." },
    
    // Response error
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3001, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3002, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },
    
    USER_ALEADY : { "isSuccess": false, "code": 3003, "message": "이미 기입된 정보입니다." },
    
    PAGING_END : { "isSuccess": false, "code": 3004, "message": "마지막 페이지입니다." },
    
    RESUME_ALREADYDELETE : { "isSuccess": false, "code": 3005, "message":"삭제된 이력서입니다." },
    
    LIKE_ALREADYEXIST : { "isSuccess": false, "code": 3006, "message":"좋아요가 이미 추가되었습니다." },
    LIKE_ALREADYDELETE : { "isSuccess": false, "code": 3007, "message":"좋아요가 이미 삭제되었습니다." },
    BOOK_ALREADYEXIST : { "isSuccess": false, "code": 3008, "message":"북마크가 이미 추가되었습니다." },
    BOOK_ALREADYDELETE : { "isSuccess": false, "code": 3009, "message":"북마크가 이미 삭제되었습니다." },
    //SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    //SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },
    
        //LIKE_DELETE_EMPTY : { "isSuccess": false, "code": 3003, "message":"좋아요 삭제처리할 기업의 직무가 없습니다." },
    

    //SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
    
}
