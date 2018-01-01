/**
 * tree.js
 *
 * @author : https://github.com/Mosframe
 */

class Tree {

    // 생성자

    constructor () {

        this.leaves     = [];
        this.branches   = [];

        // 나뭇잎들 무작위 생성
        for( var i=0; i<100; ++i ) {
            this.leaves.push( new Leaf() );
        }

        // 루트 나무가지 생성
        var root = new Branch( null );
        this.branches.push(root);

        // 주변의 나무잎을 향해 나무가지를 만들어 연결한다.
        var current = root;
        var found = false;
        while(!found) {

            // 주변에 나무잎을 찾는다.
            for( var i=0; i<this.leaves.length; ++i ) {
                var d = p5.Vector.dist( current.pos, this.leaves[i].pos );
                if( d < maxDist ) {
                    found = true;
                }
            }
            // 나무잎을 없으면 나무가지를 생성한다.
            if( !found ) {
                var newBranch = new Branch( current );
                this.branches.push(newBranch);
                current = newBranch;
            }
        }
    }

    // 드로잉

    draw () {

        for( var i=0; i<this.leaves.length; ++i ) {
            this.leaves[i].draw();
        }

        for( var i=0; i<this.branches.length; ++i ) {
            var weight = map(i,0,this.branches.length,6,0);
            this.branches[i].draw( weight );
        }

    }

    // 성장

    grow () {

        for( var i=0; i<this.leaves.length; ++i ) {
            var leaf = this.leaves[i];

            // 나뭇잎과 가장 가까운 가지를 찾는다.

            var closestBranch = null;
            var record = 100000;
            for( var j=0; j<this.branches.length; ++j ) {
                var branch = this.branches[j];
                var d = p5.Vector.dist( leaf.pos, branch.pos );
                if( d < minDist ) {
                    leaf.reached = true;
                    closestBranch = null;
                    break;
                }
                else
                if( d > maxDist ) {
                }
                else
                if( closestBranch == null || d < record ) {
                    closestBranch = branch;
                    record = d;
                }
            }

            // 나무 가지의 방향을 나무잎쪽으로 변경한다.

            if( closestBranch != null ) {
                var newDir = p5.Vector.sub( leaf.pos, closestBranch.pos )
                newDir.normalize();
                closestBranch.dir.add(newDir);
                ++closestBranch.childCount;
            }
        }

        // 가지와 연될된 나뭇잎들을 제거한다.

        for( var i=this.leaves.length-1; i>=0; --i ) {
            if( this.leaves[i].reached ) {
                this.leaves.splice(i,1);
            }
        }

        // 나뭇가지들의 생성할 자식수만큼 자식들을 만든다.

        for( var i=this.branches.length-1; i>=0; --i ) {
            var branch = this.branches[i];
            if( branch.childCount > 0 ) {
                branch.dir.div( branch.childCount + 1 );
                var rand = p5.Vector.random2D();
                rand.setMag(0.3);
                branch.dir.add(rand);
                branch.dir.normalize();
                var newBranch = new Branch( branch );
                this.branches.push( newBranch );
            }
            branch.reset();
        }
    }
}
