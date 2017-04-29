# 캔버스(Canvas) 좌표 구조

 ![CANVAS](./images/canvas-axis.jpg)

1. 간단한 캔버스 만들기
client/assets/01-index.html
```html
<canvas id="ctx" width="500" height="500" style="border:1px solid #000000;"></canvas>
```
- 결과

 ![결과](./images/01-index-01.png)
2. 캔버스에 텍스트 그리기
client/assets/01-index.html
```html
<canvas id="ctx" width="500" height="500" style="border:1px solid #000000;"></canvas>
<script>
    var ctx = document.getElementById("ctx").getContext("2d");
    ctx.fillText('Hello World',200,200);
</script>
```
- 결과

 ![결과](./images/01-index-02.png)
