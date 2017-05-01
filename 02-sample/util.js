// -----------------------------------------------------------------------------
// 유틸리티
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 2 박스가 충돌 테스트
// -----------------------------------------------------------------------------
exports.testCollisionRect2 = function( rect1, rect2 ) {
    return rect1.x <= rect2.x+rect2.width
        && rect2.x <= rect1.x+rect1.width
        && rect1.y <= rect2.y+rect2.height
        && rect2.y <= rect1.y+rect1.height;
}
