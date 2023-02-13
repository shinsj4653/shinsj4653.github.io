---
date: '2023-02-13'
title: 'UMC Project - Potshe'
categories: ['NodeJS', 'UMC']
summary: 'UMC 방학 프로젝트를 진행하면서 어려웠던 점, 혹은 새로 알게된 점 정리'
thumbnail: './images/thumbnail-nodejs.png'
---
2023년 1월부터 2월, 총 두 달 동안 진행한 프로젝트를 하면서 어려웠던 점, 혹은 새로 알게된 점을 정리해보았다.

# Potshe 프로젝트 소개
[POINT SHARE -> "POTSHE"](https://www.notion.so/POINT-SHARE-POTSHE-7f817965198e4d019c6692b8ec974ca5?pvs=4)    

해루질을 좋아하는 사람들이 주 타켓층인 프로젝트이다.  
해루질을 하면서 느낀 점을 공유하고, 해루질을 하면서 느낀 점을 토대로 해루질을 할 수 있는 장소 즉, `포인트`를 공유할 수 있는 서비스이다.  

# 역할
백엔드 개발자로써 프로젝트를 진행하였다. 메인 기술 스택은 `NodeJS`이다.

# Trouble Shooting & New Knowledge
## 1. gitignore 작동 안됨
aws s3 기능이나 카카오 맵 API를 사용하기 위해 필요한 키 값들을 `secret.js`에 저장을 해주었다. git에 보이면 안되는 정보들이기 때문에 .gitignore 에 추가를 해주었지만, 커밋을 하려고 보면 untracked files에 secret.js가 자꾸만 떴다.
[.gitignore가 작동하지 않을때 대처법](https://jojoldu.tistory.com/307)  
git의 캐시가 문제가 되는 것이므로, 아래 명령어로 캐시 내용을 전부 삭제 후 다시 add All 해서 커밋하면 된다고 한다.
```bash
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```

## 2. AWS S3 버킷 생성
AWS S3 버킷을 생성하고, 버킷에 이미지를 업로드하는 기능을 구현하였다.  
유저의 프로필 이미지, 그리고 포인트 등록을 위해 업로드하는 이미지들을 아마존 AWS의 S3 버킷에 저장을 하기로 하였다.  
[Multer-S3를 이용한 이미지 업로드](https://velog.io/@shitaikoto/Node-Multer-S3-aws-sdk)  
  
AWS S3 버킷에 이미지 파일을 저장하고, DB엔 그 버킷의 이미지 경로(이미지 주소)를 저장하고, 서버는 이 경로로 클라이언트로 응답하는 방식이다. 이렇게 하면 PC의 성능을 고려하지 않아도 되며, 사용한 만큼 비용을 지불하는 것으로 보다 쾌적하게 백엔드를 구성할 수 있는 장점이 존재한다.  
`Multer-S3`와 `AWS-SDK` 모듈을 사용하여 구현을 하였다.  
### 구현
AWS에서 할당받은 Access Key와 Secret Key를 secret.js 에 저장을 해주었다.
```javascript
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'YOUR BUCKET NAME',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});
module.exports = upload;
```
이 파일의 `upload`라는 함수가 실행되면 설정한 이름의 Bucket에 파일을 업로드 할 수 있다.  
위의 upload 담당 코드를 프로젝트에선 `imageUploader`라는 js 파일에 따로 저장을 하여 config 디렉토리에 넣어주었다.  
```javascript
// user
app.post("/app/users", imageUploader.single("image"), user.createUserProfile);

// points
app.post("/app/points", imageUploader.array("images", 5), point.postPoints);
```
이처럼, imageUploader를 `미들웨어`로 사용한 점이 인상깊었다. 그리고, imageUploader에 single, 혹은 array 로 이미지를 업로드할 수 있는 개수를 설정할 수 있다는 점이 편리했다.  
클라이언트에서 이미지를 업로드하고, 서버로 페이로드에 `폼데이터` 형식으로 담아 보내면, 서버단에서 저장된 이미지의 메타데이터를 `req.file`로 받을 수 있었다.  

## 3. multer-s3 Error
```javascript
cannot find Module ‘@aws-sdk/abort-controller’
```
multer-s3 모듈을 설치하고, 코드를 작성하였는데, 위와 같은 에러가 발생하였다.  
에러가 발생한 이유는 multer-s3와 aws-sdk의 버전이 같지 않았기 때문이다.  
[Can’t find Module ‘@aws-sdk/abort-controller’ 오류 해결 방법](https://grahams.tistory.com/416)  
위의 블로그를 참고하여 에러를 해결할 수 있었다.  
aws-sdk 패키지를 삭제한 후에, multer-s3와 같은 버전으로 재설치를 하니 오류가 해결되었다.  
```bash
npm uninstall aws-sdk
npm install aws-sdk@2.0.0
```

## 4. AccessControlListNotSupported: The bucket does not allow ACLs  
[The bucket does not allow ACLs](https://fun-coding-study.tistory.com/324)  
버킷의 ACL(Access Control List) 가 비활성화되어 있어서 이와 같은 오류가 발생한 것이었다.  
객체 소유권 메뉴에 들어가서, ACL 비활성화됨(권장) 에서 ACL 활성화됨으로 바꿔주면 된다.  

## 5. 한 칼럼을 리스트로 뽑기
하나의 포인트에는 여러 이미지가 존재할 수 있다. 1 : N의 관계이기 때문에 Points 테이블과 Points_images 테이블을 따로 설계하였다.  
SQL에서는 LIST 형태를 저장할 수 없으므로, 클라이언트에서 getPoints 를 하면, 여러 이미지들의 경로를 쉼표로 구분한 하나의 문자열 형태로 return 해주기로 하였다. 이걸 위해서 `GROUP_CONCAT` 를 사용하였다.  
[[ Mysql ] 한컬럼을 리스트로 뽑기(with GROUP BY , GROUP_CONCAT)](https://kithub.tistory.com/entry/Mysql-%ED%95%9C%EC%BB%AC%EB%9F%BC%EC%9D%84-%EB%A6%AC%EC%8A%A4%ED%8A%B8%EB%A1%9C-%EB%BD%91%EA%B8%B0with-GROUP-BY-GROUPCONCAT)  
```sql
select p.user_id, p.point_id, p.title, p.content, p.point_type, p.creature, p.point_date as point_date, p.location, 
count(upl.point_id) as likes, u.nickname, u.image_url as user_img_url, imgList as point_image_list, ll.latitude, ll.longitude
          from Points as p left outer join (
              select point_id
              from User_point_likes
          ) as upl on p.point_id = upl.point_id
                           left join (
              select user_id, nickname, image_url
              from Users
          ) as u on p.user_id = u.user_id
                           left join (
              select point_id, group_concat(image_url) as imgList
              from Point_images
              group by point_id
          ) as pi on pi.point_id = p.point_id
                           left join (
              select point_id, latitude, longitude
              from Map_points
          ) as ll on ll.point_id = p.point_id
          group by p.point_id
          LIMIT ?, 10
```
LEFT JOIN와 GROUP_CONCAT, GROUP BY를 사용하여, 한 포인트에 여러 이미지가 존재할 경우, 이미지들의 경로를 쉼표로 구분한 문자열을 반환하도록 하였다.  

## 6. JOIN 할 때, 데이터가 없을 경우 0으로 표시해주는 Query문
[Join 할 때 데이터가 없을 경우 0으로 표시하는 쿼리(Outer join)](https://blogger.pe.kr/231)  
Points가 얼마만큼의 좋아요를 받았는지 알기 위해서 User_point_likes 테이블과 JOIN을 하였다. 그러나, 만약, 좋아요를 한 번도 받지 않은 포인트가 있다면, 해당 포인트는 User_point_likes 테이블에 존재하지 않기 때문에, JOIN이 되지 않는다. 이런 경우를 대비하여, `OUTER JOIN`을 사용해야 한다.  
OUTER JOIN 할 때 데이터가 있는 테이블에 WHERE 절로 조건을 주면 안되고, `SUB QUERY` 를 써서 FROM 절에서 걸러낸 데이터셋에 OUTER JOIN 을 걸어야 한다.  

## 7. Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
[Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client](https://cocoon1787.tistory.com/714)  
이 에러는 서버가 클라이언트에게 2개 이상의 응답을 보내려고 할 때 발생하는 오류이다. if 문으로 응답을 작성하고 다음 else문으로 해서 응답을 작성해야하는데 else 문을 작성하지 않아서 이와 같은 오류가 발생하였다.
```javascript
exports.postPoints = async function (req, res) {
  /**
   * Body : userId, title, content, point_type, location, creature, point_date
   */
  const { title, content, point_type, location, creature, point_date } =
    req.body;
  const userId = "c0997af2-96ff-11ed-931f-069e6ea2831c"; //테스트할때 사용 아직 jwt 부분 없어서.. jwt 부분에 user_id 정보 남기기*/req.verifiedToken.userId;

  //빈 값 체크
  if (!title) return res.send(response(baseResponse.POINT_TITLE_EMPTY));
  else if (!content)
    return res.send(response(baseResponse.POINT_CONTENT_EMPTY));
  else if (!point_type)
    return res.send(response(baseResponse.POINT_TYPE_EMPTY));
  else if (!location)
    return res.send(response(baseResponse.POINT_LOCATION_EMPTY));
  else if (!creature)
    return res.send(response(baseResponse.POINT_CREATURE_EMPTY));
  else if (!point_date)
    return res.send(response(baseResponse.POINT_DATE_EMPTY));

  const postPointResponse = await pointService.createPoint(
    userId,
    title,
    content,
    point_type,
    location,
    creature,
    point_date
  );

  console.log(postPointResponse);
  let isAddressComplete = false;
  //location으로 위도, 경도 정보 반환
  fetch(
    "https://dapi.kakao.com/v2/local/search/address.json?query=" +
      encodeURIComponent(location),
    {
      method: "GET",
      // headers: { Authorization: "KakaoAK 1831916d0f1ff0ab48b353121f57f96e" },
      headers: {Authorization: `KakaoAK ${secret_config["kakaomap-secret-key"]}`}
    }
  )
    .then((res) => res.json())
    .then((data) => {
      //map_result = JSON.stringify(data, null, '\t')

      //const location_result = JSON.stringify(data, null, '\t')
      const location_result = data;
      console.log("inside result");
      console.log(location_result);
      if (
        data.documents.length === 0 ||
        !data ||
        data === undefined ||
        data === "undefined"
      ) {
        console.log("location data error!");
        return res.send(errResponse(baseResponse.MAP_LOCATION_NOT_EXIST));
      } else {
        const lat = location_result.documents[0].y; // 위도
        const long = location_result.documents[0].x; // 경도

        pointService.createPointLocation(
          postPointResponse.result.pointId,
          lat,
          long
        );
        isAddressComplete = true;
      }
    })
    .catch((error) => console.error("Error:", error));

  console.log("req.files", req.files);
  // 사용자가 포인트 등록할 때, image 까지 업로드 했을 경우에만
  if (req.files.length > 0) {
    req.files.map((item) => {
      pointService.createPointImg(
        postPointResponse.result.pointId,
        item.location
      );
    });
  }

  return res.send(response(baseResponse.POINT_ADD_SUCCESS));
};
```
pointController.js의 postPoints 함수 부분이다.  
위 코드에서는, 사용자가 포인트를 등록할 때, 이미지를 업로드하지 않을 수도 있기 때문에, req.files의 길이를 체크하여, 이미지가 있을 경우에만, 이미지를 업로드하는 로직을 작성하였다.
