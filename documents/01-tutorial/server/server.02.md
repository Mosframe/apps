# Http 정적파일 서비스하기

## 파일 통신 ( Express )
클라이언트에서 서버에 파일을 요청하면 클라이언트에 파일을 전송해 주는 역활
```
    player.png
    monster.png
    map.png
    ...
```

## 패키지 통신 ( Socket.io )
클라이언트에서 서버에 데이터를 전송한다.
```
    각종 입력 데이터들
```
서버에서 클라이언트로 데이터를 전송한다.
```
    몬스터 위치정보들
```

## 웹 서비스 시작하기
```
    domain  : mywebsite.com
    port    : 2000
    path    : /client/assets/index.html
```

1. [Express를 이용한 기본 코드 작성](../../../server/01-tutorial/02/app.js)
2. [index.html파일을 생성한다.](../../../server/01-tutorial/02/client/assets/index.html)
3. 서비스 실행
```
    $ node app.js
```
4. 브라우저에서 접속
```
    http://localhost:2000
```
5. 정적 이미지 파일 요청하기
```
    /client/assets/images/bullet.png 파일을 넣는다.
```
6. 브라우저를 다음 URL에 접속한다.
```
    http://localhost:2000/client/images/player.png
```


