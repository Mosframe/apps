# 프로젝트 폴더 구조

```js
app.js
package.json
node_modules
    express
    socket.io
server
    serverFile1.js
    serverFile2.js
client
    js
        clientFile1.js
        clientFile2.js
        sharedFile1.js
        sharedFile2.js
    images
        myImage1.png
        myImage2.png
    index.html
```

# NodeJS 설치
- Node.js : https://nodejs.org/en/
- node와 npm 설치 버전 확인
```node
    $ node -v
    v7.7.1
    $ npm -v
    4.1.2
```
- 프로젝트 초기화
```node
    $ npm init
    name: (Unicon) unicon
    version: (1.0.0)
    description: 게임서버
    entry point: (index.js) app.js
    test command:
    git repository: (ssh://...../_git/Unicon)
    keywords:
    author: mosframe
    license: (ISC)
    ....
    Is this ok? (yes)
```
- package.json 파일이 생성된다.
- 기본 패키지를 설치한다.
```node
    $ npm install
```
- Express를  설치한다.
```node
    $ npm install --save express
```
- Socket.io를 설치한다.
```node
    $ npm install --save socket.io
```
- app.js 파일을 생성한다.
```js
   console.log('Hello world');
```