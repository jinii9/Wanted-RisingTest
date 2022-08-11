# wanted_server_jini

## 2022-07-16 진행사항

- EC2 인스턴스 구축

- dev / prod 서버 구축

- SSL 구축

- RDS 데이터베이스 구축

- ERD 설계 - 10%

  

## 2022-07-17 진행사항

- ERD 설계 - 65% 

- **프론트엔드와 API 연결 테스트 먼저 해볼 것**

  - API 명세서 리스트업 - 10%
  - 현재 회원가입 api 구현중

  

- <클라이언트 개발자와의 회의록>

  - API 테스트할 list
    - 회원가입
    - 메인매너
    - 3분만에 읽는 Wanted+ 아티클
    - 나에게 필요한 커리어 인사이트

  

- ERD 설계 이슈
  - 원티드에서 프로필 - 이력서 연결되어 있음

    - 연결 잘 고려해서 테이블 짤 것
    - 프로필 : 기본 이력서(이력서와 연결) / 전문분야 설정(프로필에서만 설정가능)
    - 기본 이력서 기입 시, 이력서(번호) 새로 생성

  - 이런 카테고리 목록들을 굳이 DB에 저장할 필요가 있을까? 프론트에서 저 선택 목차를 만들면, 유저가 선택한 것만 DB에 넣는 것이 더 효율적이지 않을까? 

    <img src="https://user-images.githubusercontent.com/69418829/179406132-89216108-1b7c-4216-a36a-78558d3d258c.png" alt="image" style="zoom: 25%;" />
    <img src="https://user-images.githubusercontent.com/69418829/179406152-403a6763-a4f5-46b3-a4c8-f6e8fa029f07.png" alt="image" style="zoom: 43%;" />
    
    

## 2022-07-18 진행사항

- 서브도메인으로 데이터 잘 들어가는지 확인

- API 명세서 리스트업 - 40%

- 회원가입/로그인 이메일 체크 API - 100%

- 유저생성 API (회원가입) API - 100%

- 로그인 API - 100%

  

- PM2 이슈

  - node, npm 버전 에러 발생

    ```
    sudo npm cache clean -f
    
    sudo npm install -g n
    
    sudo n latest
    ```


- node.js 이슈

  - 54.242.55.82/app/users를 post하면, DB에 추가되지 않음

    ⇒ 54.242.55.82:3000/app/users

    (이유는 잘 모르겠지만, 54.242.55.82/app/users를 post하면, DB에 추가되고

    이후에, 54.242.55.82:3000/app/users를 post하면, 아까 54.242.55.82/app/users로 post했던 DB값이 result로 쭉 나옴)

  - app 폴더 외에 web 폴더를 만들고 포트를 연결하니, 계속 오류

    - error: internal/modules/cjs/loader.js:883 : https://selfish-developer.com/entry/error-internalmodulescjsloaderjs883 참고

    ⇒ 경로가 안쪽에서 꼬인거 같음 (결국 원인을 모르겠음)

    ⇒ 우분투에 api-server-node-js-final를 수정한 후 넣어주기! (나는 api-server-node-js-final2 파일 새로 생성)



## 2022-07-19 진행사항

- API 명세서 리스트업 30개 이상 완료

- ERD - 100% (이력서 부분은 다시 수정이 필요할수도)

- API 4개 작성
  - 메인 광고 배너 조회 API
  - 커리어 인사이트 조회 API (+필터링 기능)
  - 특정 유저 전문분야 생성 API
  - 특정 학교/직장 생성 API
  
- 더미데이터
  - 홈 - 광고 배너
  - 커리어 인사이트 카테고리 => (초반설정)관심태그 카테고리
  - 홈 - 커리어 인사이트
  - 직군 카테고리
  - 직무 카테고리

- ERD 변경

  - 커리어 인사이트 카테고리 -> (초반설정)관심태그 카테고리

    : 초반 설정에 관심태그 카테고리와 홈에 커리어 인사이트 카테고리가 동일함을 발견하여 수정

  - 채용공고 관련 테이블

  - 회원가입 후, '초기설정'과 '이력서' 부분 연결되어 있음 =>  이력서 테이블 수정 



- <클라이언트 개발자와의 회의록> 
  - 로그인할 때, 프로필 사진 넣어주기
  - 로그인하고 초기설정 시, patch 3개 넣기
  - 채용공고 시. URL 이름 다시 고려
  - 채용공고 페이지에 페이징 넣기



- API 이슈

  - 웹에서 각 카테고리 페이지마다 (메인 홈, 채인공고 페이지, 직군별 연봉, 이력서…) URL 구분해주는게 좋을까? => 구분해주었음

  - 다음과 같이 한 화면에 있을 때, 이걸 3개 API로 나눠서 Get 해줘도 되는지? => 3개로 나눠줌

    - 특정 유저 프로필 조회 API / 특정 유저 기본 이력서 조회 API / 특정 유저 전문분야 조회 API 

      <img src="https://user-images.githubusercontent.com/69418829/179763302-53a0aa65-ff9a-47a7-9ab9-54e0f2d2907a.png" alt="image" style="zoom:50%;" />

- node.js 이슈
  - 쿼리스트링 파라미터를 배열로 전달하는 방법 : https://webisfree.com/2017-03-28/쿼리스트링-파라미터를-배열로-전달하는-방법은-어떤게-있을까요
  - dev 서버 안돌아가면, express.js랑 baseResponseStatus.js 파일 고쳤는지 꼭 확인할 것!!!



## 2022-07-20 진행사항

- 특정 유저 관심태그 생성 API
- 채용중인 직무 조회 API
  - workArea 필터링을 제외하고, 필터링 기능 모두 완료 
    - dutyCategoryIds, country, location, years, skill_tags, job_sort, user_tags
    - workArea와 location 더미데이터 통한 테스트 후, workArea 수정할 것
- 더미데이터
  - company 관련 테이블 더미 데이터 넣기
    - 회사 정보
    - 회사가 채용중인 직무들
    - 그 외의 것들
- ERD 수정
  - 기업 관련(채용공고 관련) 테이블 전체적 틀 수정



- <클라이언트 개발자와의 회의록> 
  - 인사이트 더미데이터 8개 채워주기
  - 인사이트 조회 때, writer 프로필 사진 데이터
  - 로그인 시, 프로필 이미지 데이터



- API 이슈

  - 예를 들어, 유저가 원하는 만큼 해시태그를 고르면, 그에 맞게 get 해줘야하는데, 내가 쿼리문에서 하드코딩 하지 않고, 어떻게 유저가 원하는 수만큼 늘려서 쿼리문에 넣어서 get 해줄 수 있을까

    => javascript 문법을 제대로 숙지하지 못한 상태에서 템플릿에 맞춰서만 하다보니 기능을 수행시키기 어려웠음. props, 화살표 함수, map 함수를 이용하여 이슈 해결. 이때, string을 담는 변수를 만들어 조건에 따라 변수에 쿼리문을 작성하였고 이들을(쿼리문들을) 합쳐서 후에 DB와 연결시켰다.
    
    

## 2022-07-21 진행사항

- 론트 개발자가 부탁한 것 완료
  - 더미 데이터의 필터 파라미터 종류 정리 O
  - api에 jwt 적용 O
  - 로그인 시, 프로필 사진 적용 O
  - 태그 필터링에 맞춰서 랜덤 API O
  - 기업 더미 데이터 O
  - 직업별 연봉 조회 API X
- jwt 적용 + validation
  - 특정 유저 전문분야 생성 API
  - 특정 유저 학교/직장 생성 API
  - 특정 유저 관심 태그 생성 API
- API 생성
  - 채용-메인 광고 배너 조회 API
  - 채용-태그별 회사 조회 API (랜덤으로)



- ububtu 이슈

  - 모듈 에러

    ![image](https://user-images.githubusercontent.com/69418829/180222193-c1ce754b-321a-4c11-8460-7cf1bd71dffb.png)

    ⇒ 우분투에서

    git clone url주소

    jini9

    토큰 입력

    git pull origin maste

    

- node.js 이슈

  - return해올 때, 2개 값을 받고 싶다면 ⇒ return [companyByTagResult[0],companyByTagResult[1]];

    ```javascript
    companyByTagResult = await jobsFeedDao.selectcompanyByTag(connection);
    return [companyByTagResult[0],companyByTagResult[1]];
    ```

    ⇒ (jobsFeedProvder부분 코드)

  - 포스트맨으로 get해올 때, 가끔 이게 뜨는데 이게 뭔지 모름.

  <img width="229" alt="image" src="https://user-images.githubusercontent.com/69418829/180222300-09cc08b1-80f7-4012-9d92-acf4f4565ae2.png">

  ⇒ 이런식으로 배열 맞춰서 저 부분은 빼서 get 해줬음.

```return [companyByTagResult[0],companyByTagResult[1][0]];
return [companyByTagResult[0],companyByTagResult[1][0]];
```



## 2022-07-22 진행사항

- API 생성
  - 특정 유저 전문분야 수정 API
  - 특정 유저 학교/직장 수정 API
  - 요즘 뜨는 포지션 조회 API
  - 특정 유저 좋아요 생성/수정 API
  - 특정 유저 좋아요 조회 API
  - 특정 유저 좋아요 삭제 처리 API
- 현재 북마크 기능 구현중



## 2022-07-23 진행사항

- API 생성
  - 특정 유저 북마크 생성 API
  - 특정 유저 북마크 조회 API
  - 특정 유저 북마크 삭제처리 API
  - 회사가 채용중인 직무 detail 조회 API
  - (프로필) 특정 유저 프로필 조회 API
  - (프로필) 특정 유저 기본 이력서 조회 API
  - (프로필) 특정 유저 전문분야 조회 API
  - (프로필) 특정 유저 프로필 정보 수정 API
- API 수정
  
  - 특정 유저 전문분야 생성 API, 특정 유저 학교/직장 생성 API => 의미적 validation 추가 
- ERD 수정
  
- likeList, bookMarkList 테이블 생성 및 다른 테이블 조금 수정(DataGrip 보고 나중에 ERD 수정할 것)
  
- <프론트 개발자와의 회의록>

  - 좋아요, 북마크 => jwt 적용 X

  - 자동로그인

  - 유저의 skill 관련 어떻게 다룰 것인지

    

- 이슈
  - https://jiwondh.github.io/2017/01/15/trouble-1/ ⇒ send 쪽에 ‘)’ 같은거 잘 썼는지 확인
  - https://www.delftstack.com/ko/howto/javascript/javascript-append-to-object/ ⇒ 배열에 포함된 객체에 요소를 추가하는 방법 (+배열에 배열 추가하는 방법)
  - 접근할 수 없는 코드가 있습니다 ⇒ return 하면, 그 다음 아래에 코드 쓸 수 x
  - 포스트맨할 때, Cannot GET ⇒ 오류 없이 이게 뜨면, 분명히 Route, Controller, Provider, Service. Dao 중 연결되는 코드 부분에 철자를 잘못 썼을 확률 up



## 2022-07-24 진행사항

- <프론트 개발자와의 회의록>

  - 의미적 validation 관련
  - 이력서 관련 API 생성
  - 자동로그인 API
  - 디테일페이지 로고 넣어주기
  - 챠용공고 필터링 다시
- API 생성
  - 자동로그인 API
  - 이력서 생성 API
  - 이력서 내용 조회 API
  - 이력서 내용 수정 API



- API 수정

  - 기업 직무 디테일 조회 API 보낼 때, key값 하나에 묶어서 값 들어가게 수정
  - 특정유저 전문분야 조회 API 

  

- 이슈

  - 내가 여태 patch가 아니라 put 식으로 정보들을 수정했다(patch라 적고 포스트맨에 모든 정보를 다 넣어서 수정했음)는 것을 알게 됐다. 상황을 잘 고려하고 판단해서 patch를 쓸지 put을 쓸지 생각할 것

    - put / patch : https://tecoble.techcourse.co.kr/post/2020-08-17-put-vs-patch/
    - put / patch - 동적 쿼리 : https://www.inflearn.com/questions/117477 / https://im-first-rate.tistory.com/37

    => put은 전체 값을 넣어서 수정해야 하고, patch는 수정할 값만 넣어서 수정이 가능 (ex) introduction

    - put일 때 , DB에 이미 값이 있다면, update / 값이 없다면 create를 하는데,,, create를 하기 위해서는 정보들이 모두 필요하기 떄문에 patch일 때는 사용을 안한다(patch일 때는 update만) 

    - node.js에서는 patch 시, 값을 다 받게 되면, (introduction)은 ‘undefined’이므로,

      undefined면 수정을 안하고, undefined가 아니라면 수정하는 식으로 코드를 짜야함. => 이때 각 상황에 맞게 다 쿼리문을 짜주는게 아니라 동적쿼리를 이용할 것

      ```
      -- 기본적인 SELECT 구문
      SET @sql = N'SELECT * FROM #MEMBER WHERE 1=1 ';
       
      -- IF 절로 예외처리
      IF ISNULL(@num, 0) > 0 BEGIN
          SET @sql = @sql + ' AND num = @num ';
      END
      ```

      출처: https://im-first-rate.tistory.com/37 [웃으면 1류다:티스토리]

      ex) 프로필 사진, 이름, 이메일 중에서 유저는 이름을 patch하고자 하지만, 코드상에서 일일히 하드코딩을 해주지 않는 이상 오류가 남

      ​	=> 따라서

      ​			UPDATE 테이블명

      ​			SET ${__string__}

      ​		이 부분을 string 변수같은걸 지정해줘서

      ​		조건에 따라 condition = "넣고자하는 쿼리문"

      ​		string += condition 

      ​		=> 대충 이런식으로 (나중에 직접 코딩해보고 설명 보충 예정)

    

  - 이력서 내용 조회 API를 하다가 

    - 이력서 경력 수정(put) 시 질문!
      	2개 경력 생성(쿠팡, 삼성) -> 다 지우고, 1개 새로 경력 생성(카카오) -> 결과적으로, 카카오만 DB에 남아있어여함 
        	이럴 때는 delete를 하고 새로 생성? (내가 한 방법)

    

## 2022-07-25 진행사항

- API 생성
  - 이력서 삭제처리 API
  - 이력서 리스트 조회 API
  - 이벤트 리스트 조회 API + 페이징
- API 수정
  - 유저 학교, 직장경력 생성 API 수정 (resume=1 지우기)
  - 이력서 생성 API 수정 (resumeName 추가 위해 resume 개수 가져오기)
  - 이력서 내용 조회에 resumeName 추가 (아직 이력서 내용 수정에는 resumeName 못함)
- 직무 디테일 조회에 좋아요/북마크 체크 유무 수정
  - 좋아요/북마크 삭제처리
  - 포지션 조회에 no 추가
  - !!!채용중인 직무 조회 API __필터링__ 수정!!!
- 앞으로 해야할 것

  - put과 헷갈린 patch 다시 적용해보기
  - 직무별 연봉 카테고리
- ERD 추가
  - 이벤트 카테고리 관련 테이블 추가
- 이벤트 더미데이터 추가



-  쿼리문 이슈

  - ex) Events- 해당 EventInterestTags들(여러개) INNER JOIN → Tag들만 다른 똑같은 레코드값 여러개 ⇒ group by

    ```mysql
    SELECT Events.no, interestTagCategory_no, title, eventCategory_no, onlineCheck,
    CONCAT(startDate, ' ~ ', endDate),
           eventImageUrl, eventUrl
    FROM Events INNER JOIN EventInterestTags on Events.no = EventInterestTags.event_no
    GROUP BY Events.no;
    ```

-  페이징 이슈

  - 페이징(페이지네이션) : 오프셋 기반 - __커서 기반__

    보통 프론트에서 (마지막 인덱스, 보여줄 개수)를 보내줌

     

## 2022-07-26 진행사항

- API 생성

  - 직군별 연봉 조회 API
  - 특정 유저 정보 탈퇴처리 API
  - 3분만에 읽는 아티클 조회 API

- ERD 수정

  - 직군별 연봉 관련 테이블 추가

- API 수정

  - 이벤트 리스트 조회 - 관심태그 하나가 아니라 포스팅에 해당하는 관심태그들 싹 다 조회

- 앞으로 해야할 것
  - API들 validation 점검

  
  
- <프론트엔드 개발자와 회의록> (=수정할 리스트)

  - 회원가입 API 때, 유저 프로필 사진 기본이미지로 넣기 (=> text는 DB의 default값이 안되므로 서버에서 넣어줘야함) - 100%
  - 페이징 result가 비어있으면 메세지 - 100%
  - // validation
    이력서 내용 수정,삭제 - 이력서 idx를 아무거나 넣어도 수정,삭제이 성공된다고 뜸
    이력서 no로 삭제를 했는데, 삭제한 이력서 no로 조회를 하면 이력서 상세 조회가 나온다
  - 삭제처리를 했는데 리스트 조회 시, 삭제한것도 나옴 - 100%
  - 이력서 내용 조회 때 linkUrl이 object형으로 온다 - 100%
  - 프론트엔드 직무 '검색' 시, 관련 쭈루룩 API 만들기
  - 채용중인 직무 조회 시, 뒤에 쓰레기값 버리기 < 배열 잘 해서 - 100%
  - 이력서 삭제처리 시, body에 status 없애기
  - 초기 회원가입 후 이력서 리스트 조회 시, 기본 이력서의 resume_name null로 안나오게 처리



## 2022-07-27 진행사항

- API 생성

  - API 40개 이상 생성 - 100%
  - 특정 유저 기본 이력서 선택 수정 API
  - 연봉 업그레이드 포지션 조회 API
  - 직장인을 위한 VOD 조회 API
  - 검색 조회 API
  - (수정) : 채용중인 직무 조회 - 한국 => country:한국, locations:전국 으로 입력할 수 있게 수정
- validation 체크 
- ERD 수정

  - VOD 관련 테이블 생성
- 해야할 것

  - 전문분야 수정 API 생성 
  - (코드 오류 체크)
  - 데이터그립에 바로바로 넣었던 속성들 ERD에도 넣어두기
- 2차 피드백 시, 물어볼 점 정리
- 트랜잭션 처리 넣기



## 2022-07-28 진행사항

- API 생성
  - 소셜 회원가입 및 로그인 API 생성 (+수정)
  - 트랜잭션
  - 좋아요 API 수정(기업 likeCount + 1)