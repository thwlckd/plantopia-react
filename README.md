## 🌱 플랜토피아 (Plantopia: plant + utopia) 
- 슬기로운 식물 관리의 시작 
- 🚗 https://plant-utopia.vercel.app/

## 🌵 프로젝트 주제 및 기획 <a href="https://github.com/thwlckd/plantopia-react/files/12520115/7._.pptx">PPT 발표 자료</a>
![image](https://github.com/thwlckd/plantopia-react/assets/101177511/d1f4d634-d524-4740-86f4-2b40ab1f3b70)
![image](https://github.com/thwlckd/plantopia-react/assets/101177511/5a7b07de-70b8-4d9c-9f82-1e89840157dd)
![image](https://github.com/thwlckd/plantopia-react/assets/101177511/bdebcf6a-9ae8-4fd7-b552-97f6bab967e0)
![image](https://github.com/thwlckd/plantopia-react/assets/101177511/7f7a7e70-b8bd-4c40-b252-b8168a5f9049)

## 🌿 기술 스택
![image](https://github.com/thwlckd/plantopia-react/assets/101177511/1f090dd1-ebcb-4ee7-b8d3-ad87824b5e24)

## 🪴 팀원 소개
![image](https://github.com/thwlckd/plantopia-react/assets/101177511/1697303f-6daf-483a-9a87-2a5da886e336)

### ✔️ 담당 파트
- 이상혁
  - 내 식물 페이지
  - 내 식물 등록, 조회, 수정, 삭제(CRUD)
  - toast, alert 공통화
- 박창협
  - 식물도감 페이지, 로그인/마이페이지
  - [식물 open api](https://nongsaro.go.kr/portal/ps/psn/psnj/openApiLst.ps?menuId=PS65428&pageIndex=1&pageSize=&sLclasCode=&sText=%EC%8B%A4%EB%82%B4%EC%A0%95%EC%9B%90%EC%9A%A9+%EC%8B%9D%EB%AC%BC) 활용 식물 데이터 파싱(파이썬 bs4, pandas → json 파일 → firestore)
  - 로딩 컴포넌트, 404 페이지
  - code splitting, routes 작업
- 엄태호
  - 메인페이지, 캘린더 페이지
  - 헤더 푸터 레이아웃
  - OpenWeatherMap 기반 날씨 api 활용
- 이다혜
  - 다이어리 페이지
  - 다이어리 등록, 조회, 수정, 삭제(CRUD)
  - 디자인(figma)

## 🪧 팀 컨벤션
### ✔️ 코드 컨벤션
|종류|컨벤션|
|---|---|
|변수(일반)|카멜 케이스(camelCase)|
|변수(스키마)|파스칼 케이스(PascalCase)|
|함수|카멜 케이스(camelCase)|
|파일|카멜 케이스(camelCase)|
|폴더|카멜 케이스(camelCase)|
|컴포넌트|파스칼 케이스(PascalCase)|
|스타일|스네이크 케이스(snake_case)|
|아이디|카멜 케이스(camelCase)|
|이미지 파일명|스네이크 케이스(snake_case)|
|TS 타입 (interface, type alias)|파스칼 케이스(PascalCase)|

### ✔️ 커밋 컨벤션
|종류|설명|
|---|---|
|Feat|새로운 기능 추가|
|Fix|버그 수정 또는 typo|
|Remove|파일을 삭제하는 작업만 수행하는 경우|
|Add|처음 파일 올릴 때 / 라이브러리 추가, page 추가 등|
|Refactor|코드 리팩토링|
|Design|UI 작업, 스타일 작업|
|Chore|잡일 / 파일 이동, 변수명 변경, 들여쓰기(가독성) 등|
|Merge|merge, PR(Pull Request)|
|!HOTFIX|긴급한 패치나 수정 작업|


## 🎯 Git Flow 전략
```
master
├── develop
│   ├── feature/main
│   ├── feature/dict
│   ├── feature/diary
│___│___refactor/user
```
(브랜치역할)/(기능명) 브랜치 생성, 작업 후 dev에 PR

## 🎨 협업 툴

- [Figma](https://www.figma.com/file/NpxLwqcttC04Tx25FNU0Z2): 와이어프레임, 디자인
- [Notion](https://hyub.notion.site/ede7d2e7f3a042c3b8481fc31abd192f?pvs=4) : 팀 페이지, 프로젝트 일정/현황 관리, 스크럼/문서 정리
- [Gitlab](https://kdt-gitlab.elice.io/sw_track/class_05/web_2_project/team07/front-end) : Project Repository
- Gather, Discord: 팀 커뮤니케이션
- Elice 강의실(Zoom 대용): 담당 코치님들의 오피스아워(코칭)
