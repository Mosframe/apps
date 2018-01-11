/**
 * ga.js
 *
 * @author : https://github.com/Mosframe
 */


// 구간별 거리 비율 계산

function calculateFitness () {

    var currentRecord = Infinity;

    for( var i=0; i<population.length; ++i ) {
        var d = calcDistance(cities, population[i]);
        if( d < recordDistance ) {
            recordDistance = d;
            bestEver = population[i];
        }
        if( d < currentRecord ) {
            currentRecord = d;
            currentBest = population[i];
        }
        //fitness[i] = 1 / (d+1);
        fitness[i] = 1 / (pow(d, 8) + 1);
    }
}

// 피트니스 노말라이즈

function normalizeFitness () {

    var sum = 0;
    for( var i=0; i<fitness.length; ++i ) {
        sum += fitness[i];
    }
    for( var i=0; i<fitness.length; ++i ) {
        fitness[i] = fitness[i] / sum;
    }
}

// 다음 파플레이션 할당

function nextGeneration () {

    var newPopulation = [];
    for( var i=0; i<population.length; ++i ) {
        var orderA = pickOne( population, fitness );
        var orderB = pickOne( population, fitness );
        var order = crossOver(orderA, orderB);
        mutate(order, 0.01);
        newPopulation[i] = order;
    }

    population = newPopulation;
}

// 무작위로 오더 리스트를 얻는다.

function pickOne( list, prob ) {

    var index = 0;
    var r = random(1);
    while(r>0) {
        r = r - prob[index];
        ++index;
    }
    --index;
    return list[index].slice();
}

// 두 배열값을 교차 시킴

function crossOver( orderA, orderB ) {

    var start   = floor(random(orderA.length));
    var end     = floor(random(start+1, orderA.length));
    var neworder= orderA.slice(start, end);

    for (var i = 0; i < orderB.length; i++) {
        var city = orderB[i];
        if (!neworder.includes(city)) {
            neworder.push(city);
        }
    }
    return neworder;
}

// 오더 리스트를 무작위로 변조 시킨다.

function mutate ( order, mutationRate ) {

    for( var i=0; i<totalCities; ++i ) {
        if( random(1) < mutationRate ) {
            var indexA = floor(random(order.length));
            var indexB = (indexA + 1) % totalCities;
            swap(order, indexA, indexB);
        }
    }
}