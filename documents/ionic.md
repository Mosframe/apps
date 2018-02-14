# ionic 프로젝트 설명
- 설치
    > npm install cordova ionic -g
- 프로젝트 생성
    > ionic start [projectName] [black|tabs]
- 접속
    - 데스크탑
        http://localhost:8100/
    - 모바일
        http://localhost:8100/ionic-lab
- 01.Test
    - 탭 프로젝트로 탭을 변경하는 테스트
    - 서버 시작
        > ionic serve
- 02.BlankPage
    - 빈 프로젝트로 시작하는 방법 테스트
    - 새 페이지 생성
        > ionic g page [first]
        app/app.module.ts 파일에 새 페이지 모듈 추가
    - 버튼으로 네비게이션 컨트롤 이용하기
    - 로그인페이지 만들기
        > ionic g page [login]
    - 회원가입페이지 만들기
        > ionic g page [register]
- firebase 이용
    - Angular용 설치
        > npm install firebase angularfire2 --save


