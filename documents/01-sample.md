# HTML5 + Javascript로 게임 클라이언트 제작 학습
---

- 참고 : http://rainingchain.com/tutorial/html5

---

## 1. 캔버스에 게임의 기본 구성요소(Input,Update,Draw) 제작
01. [Cavas 이해하기](./client/client.01.md)
02. [캔버스에 텍스트형 플레이어와 적군 그리기](../../client/assets/01-tutorial/01/index.03.html)
03. [캔버스안에서 플레이어, 적군 이동하기](../../client/assets/01-tutorial/01/index.04.html)
04. [박스형태의 플레이어, 적군 생성](../../client/assets/01-tutorial/01/index.04.html)
05. [무작위 적군 생성하기](../../client/assets/01-tutorial/01/index.05.html)
06. [마우스로 플레이어 컨트롤 하기](../../client/assets/01-tutorial/01/index.06.html)

---

## 2. 서바이벌 슈팅 게임 만들기
01. [무작위로 서로 다른 크기를 갖는 적군 생성.](../../client/assets/01-tutorial/02/index.01.html)
02. [4초마다 적군 추가 생성.](../../client/assets/01-tutorial/02/index.02.html)
03. [캔버스 안에서 사선으로 이동하는 적군](../../client/assets/01-tutorial/02/index.03.html)
04. [플레이어 HP 구현](../../client/assets/01-tutorial/02/index.04.html)
05. [적군과 충돌하면 HP 1씩 감소](../../client/assets/01-tutorial/02/index.05.html)
06. [HP가 0이되면 시간을 기록하고 재시작](../../client/assets/01-tutorial/02/index.06.html)
07. [실시간 점수 기록 표시 : 경과시간을 점수로 환산](../../client/assets/01-tutorial/02/index.07.html)
08. [강화아이템 무작위 생성](../../client/assets/01-tutorial/02/index.08.html)
09. [강화아이템 획득하면 강화점수 획득](../../client/assets/01-tutorial/02/index.09.html)
10. [일정시간마다 무작위 방향으로 플레이어 탄환 발사](../../client/assets/01-tutorial/02/index.10.html)
11. [탄환과 충돌한 적군 죽이기](../../client/assets/01-tutorial/02/index.11.html)
12. [탄환에 생명력을 추가하여 일정시간이 지나면 자동 파괴한다.](../../client/assets/01-tutorial/02/index.12.html)
13. [강화 아이템을 2종류로 구분하여 점수를 다르게 획득한다.](../../client/assets/01-tutorial/02/index.13.html)
14. [플레이어 공격 속도 속성 추가](../../client/assets/01-tutorial/02/index.14.html)
15. [강화 아이템을 점수획득과 공격속도 증가 아이템으로 분류](../../client/assets/01-tutorial/02/index.15.html)
16. [탄환 발사 속도 연산 효율적으로 개선](../../client/assets/01-tutorial/02/index.16.html)
17. [마우스 좌 클릭할때 플레이어가 공격을 하도록 한다.](../../client/assets/01-tutorial/02/index.17.html)
18. [키보드로 플레이어 이동 컨트롤 하기](../../client/assets/01-tutorial/02/index.18.html)
19. [탄환을 마우스커서가 있는 방향으로 발사](../../client/assets/01-tutorial/02/index.19.html)
20. [마우스 우클릭으로 3연발 발사](../../client/assets/01-tutorial/02/index.20.html)
21. [방사형 무기 발사](../../client/assets/01-tutorial/02/index.21.html)

---

## 3. 설계구조 최적화
01. [공격함수와 특수공격 함수를 만들어 재사용이 가능하도록 수정](../../client/assets/01-tutorial/03/index.01.html)
02. [모든 객체들의 구조를 Entity로 통일시킴 ( 객체지향 프로그램 )](../../client/assets/01-tutorial/03/index.02.html)
03. [Entity로 모든 객체를 상속관계로 정리함](../../client/assets/01-tutorial/03/index.03.html)
04. [Entity update함수 정리](../../client/assets/01-tutorial/03/index.04.html)
05. [Entity 멤버함수들 정리](../../client/assets/01-tutorial/03/index.05.html)
06. [충돌 체크함수도 Entity 멤버함수로 정리](../../client/assets/01-tutorial/03/index.06.html)
07. [Entity > Actor > (Player,Enemy) 으로 상속되도록 처리함 ( 다형성과 상속 )](../../client/assets/01-tutorial/03/index.07.html)
08. [update함수를 오버라이딩을 이용하여 개선](../../client/assets/01-tutorial/03/index.08.html)

---

## 4. 그래픽 리소스 적용
01. [entities를 별도의 소스 파일로 분리시킴](../../client/assets/01-tutorial/04/index.01.html)
02. [객체들을 박스에서 이미지로 변경](../../client/assets/01-tutorial/04/index.02.html)
03. [이미지를 각각 객체 사이즈에 맞게 조정](../../client/assets/01-tutorial/04/index.03.html)
04. [배경 이미지 그리기](../../client/assets/01-tutorial/04/index.04.html)

---

## 5. 스크롤맵 사용
01. [플레이어 중심으로 맵과 엔티티들 스크롤하기](../../client/assets/01-tutorial/05/index.01.html)
02. [여러개의 맵을 관리하기 위해 맵 객체 생성](../../client/assets/01-tutorial/05/index.02.html)
03. [캐릭터 중심 맵 스크롤 구현](../../client/assets/01-tutorial/05/index.03.html)
04. [적군의 총알에 충돌하면 HP가 감소되도록 함](../../client/assets/01-tutorial/05/index.04.html)
05. [스크롤에 의해 변화된 플레이어 탄환의 방향 보정](../../client/assets/01-tutorial/05/index.05.html)
06. [적들은 이동하지 않도록 엔티티를 최적화함](../../client/assets/01-tutorial/05/index.06.html)
07. [적들이 플레이어를 따라오도록 한다](../../client/assets/01-tutorial/05/index.07.html)
08. [적군이 플렝이어의 방향으로 총알을 발사하도록 함](../../client/assets/01-tutorial/05/index.08.html)
09. [게임일시정지 기능 추가(단축키:p)](../../client/assets/01-tutorial/05/index.09.html)
10. [적들도 HP를 갖도록 수정](../../client/assets/01-tutorial/05/index.10.html)
11. [적군 2종류로 확장](../../client/assets/01-tutorial/05/index.11.html)
        박쥐 : 공격속도가 느리고 생명력이 강함
        벌   : 공격속도가 빠르고 생명력이 약함
12. [각종 전역함수들 오브젝트에 종속시킴](../../client/assets/01-tutorial/06/index.12.html)
13. [플레이어가 마우스를 누르고 있으면 총알 자동 발사](../../client/assets/01-tutorial/06/index.13.html)
14. [몬스터 채력바 구현](../../client/assets/01-tutorial/06/index.14.html)

---

## 6. 에니메이션 적용
01. [액터 이미지들을 스프라이트 이미지로 사용하기](../../client/assets/01-tutorial/06/index.01.html)
02. [액터의 공격방항에 따라서 스프라이트 4방향처리](../../client/assets/01-tutorial/06/index.02.html)
03. [액터 스프라이트 에니메이션 (이동) 구현](../../client/assets/01-tutorial/06/index.03.html)
04. [플레이어는 이동할때만 이동에니메이션 처리](../../client/assets/01-tutorial/06/index.04.html)

---

## 7. 맵 오브젝트 충돌 처리
01. [총알 배경오브젝트와 충돌처리](../../client/assets/01-tutorial/07/index.01.html)
02. [액터들 이동시 배경오브젝트와 충돌처리](../../client/assets/01-tutorial/07/index.02.html)
03. [맵에디터로 제작된 데이터(json)을 활용하여 충돌영역 설정하기](../../client/assets/01-tutorial/07/index.03.html)
04. [이동하는 액터들을 이동속도 변수로 이동로직을 최적화함](../../client/assets/01-tutorial/07/index.04.html)
05. [액터의 충돌영역을 4방향별로 지정하여 충돌처리한다.](../../client/assets/01-tutorial/07/index.05.html)
06. [액터가 벽에 충돌할때 바운딩처리](../../client/assets/01-tutorial/07/index.06.html)

---

## 8. 인벤토리
01. [인벤토리와 아이템 추가](../../client/assets/01-tutorial/08/index.01.html)



---
