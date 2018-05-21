const City = require('./City')

var city_distance_map = null;

/**
 * Sum the distance to run from the start city, passing throught all the other cities and return to the beginning
 * @param {City[]} cities 
 */
function getFitness(cities) {
    let total = 0;
    let index;
    // console.log(city_distance_map);
    for (index = 0; index < cities.length - 1; index++) {
        const cityOrigin = cities[index];
        const cityDestiny = cities[index + 1];

        total += city_distance_map[cityOrigin.id][cityDestiny.id];
        // console.log(city_distance_map[cityOrigin.id][cityDestiny.id])
    }

    total += city_distance_map[cities[index].id][cities[0].id];

    return total;
}

/**
 * 
 * @param {Number} min 
 * @param {Number} max 
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * 
 * @param {Number} min 
 * @param {Number} max 
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @param {Number} numrows 
 * @param {Number} numcols
 * @param {Number} initial
 */
Array.matrix = function (numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}

/**
 * 
 * @param {City[]} cities 
 */
function mutate(cities) {
    a = getRandomArbitrary(0, cities.length);
    b = a;

    while (b == a) {
        b = getRandomArbitrary(0, cities.length);
    }

    c = cities[a];
    cities[a] = cities[b];
    cities[b] = c;
}
/**
 * Apply the mating algorithm PMX and return two resulting Subjects in a Array
 * @param {Subject} male 
 * @param {Subject} female 
 */
function PMX(male, female) {
    var offspring1 = [];
    var offspring2 = [];

    var init = getRandomInt(0, (male.cities.length - 1));
    var end = getRandomInt(init, (male.cities.length - 1));
    var map = Array.matrix(end - init + 1, 2, -1);
    var M = 0;
    var F = 1;

    for (i = init; i <= end; i++) {
        offspring1[i] = female.cities[i];
        offspring2[i] = male.cities[i];
        map[i - init][M] = male.cities[i];
        map[i - init][F] = female.cities[i];
    }

    // Cruzamento 
    // completes the offspring array from 0 to the beginning of the cut array

    for (w = 0; w < init; w++) {
        // sets index to standard
        var index1 = -1;
        var index2 = -1;

        

        // Search for an equal value of the male array in the cut of the female array. Gets the index of the position in case it finds 
        for (i = 0; i < map.length; i++) {
            if (male.cities[w] == map[i][F]) {
                index1 = i;
                break;
            }
        }

        // Search for an equal value of the female array in the cut of the male array. Gets the index of the position in case it finds 
        for (i = 0; i < map.length; i++) {
            if (female.cities[w] == map[i][M]) {
                index2 = i;
                break;
            }
        }

        // sets the auxiliar variables to the value of the index
        var aux1 = index1; 
        var aux2 = index2;

        console.log("Tamanho corte -1: " + map.length-1);
        console.log("Aux 1 = " + aux1);
        console.log("Aux 2 = " + aux2);

        // if index is different from standard it runs 
        while (index1 >= 0) {

            // Search the corresponding index of the male cut array in the female cut array 
            for (i = 0; i < map.length; i++) {

                //Goes to the following index in case it finds an equal 
                if (map[aux1][M] == map[i][F]) {
                    if (i = 0 && aux1 > init) {
                        aux1 = init
                    } else {
                        if (index1 > init && aux1 == index1 - 1) {
                            aux1 = aux1 + 2;
                        } else {
                            aux1 = aux1 + 1;
                        }
                        break;
                    }
                }
                //sets the new value of the offspring after the array has been completly read
                if (i + 1 == map.length) {
                    index1 = -1;
                    offspring1[w] = map[aux1][M];
                }
            }
        }

        // if index is different from standard it runs 
        while (index2 >= 0) {
            // Search the corresponding index of the female cut array in the male cut array 
            for (i = 0; i < map.length; i++) {
                //Goes to the following index in case it finds an equal 
                if (map[aux2][F] == map[i][M]) {
                    if (i = 0 && aux2 > init) {
                        aux2 = init;

                    } else {
                        if (index2 > init && aux2 == index2 - 1) {
                            aux2 = aux2 + 2;
                        } else {
                            aux2 = aux2 + 1;
                        }
                        break;
                    }
                }
                //sets the new value of the offspring after the array has been completly read
                if (i + 1 == map.length) {
                    index2 = -1;
                    offspring2[w] = map[aux2][F];
                }
            }
        }

        //sets the same value to the offspring if no value is found in the female cut array
        if (aux1 < 0) {
            offspring1[w] = male.cities[w];
        }

        //sets the same value to the offspring if no value is found in the male cut array
        if (aux2 < 0) {
            offspring2[w] = female.cities[w];
        }

    }

    // completes the offspring array from the end of the cut array to the end of the parent array
    for (w = end + 1; w < male.cities.length; w++) {

        // sets index to standard
        var index1 = -1;
        var index2 = -1;

        // Search for an equal value of the male array in the cut of the female array. Gets the index of the position in case it finds 
        for (i = 0; i < map.length; i++) {
            if (male.cities[w] == map[i][F]) {
                index1 = i;
                break;
            }
        }

        // Search for an equal value of the female array in the cut of the male array. Gets the index of the position in case it finds 
        for (i = 0; i < map.length; i++) {
            if (female.cities[w] == map[i][M]) {
                index2 = i;
                break;
            }
        }

        // sets the auxiliar variables to the value of the index
        var aux1 = index1;
        var aux2 = index2;

        // if index is different from standard it runs 
        while (index1 >= 0) {

            // Search the corresponding index of the male cut array in the female cut array 
            for (i = 0; i < map.length; i++) {

                //Goes to the following index in case it finds an equal 
                if (map[aux1][M] == map[i][F]) {
                    if (i = 0 && aux1 > init) {
                        aux1 = init
                    } else {
                        if (index1 > init && aux1 == index1 - 1) {
                            aux1 = aux1 + 2;
                        } else {
                            aux1 = aux1 + 1;
                        }
                        break;
                    }
                }
                //sets the new value of the offspring after the array has been completly read
                if (i + 1 == map.length) {
                    index1 = -1;
                    offspring1[w] = map[aux1][M];
                }
            }
        }

        // if index is different from standard it runs 
        while (index2 >= 0) {

            // Search the corresponding index of the female cut array in the male cut array 
            for (i = 0; i < map.length; i++) {

                //Goes to the following index in case it finds an equal 
                if (map[aux2][F] == map[i][M]) {
                    if (i = 0 && aux2 > init) {
                        aux2 = init
                    } else {
                        if (index2 > init && aux2 == index2 - 1) {
                            aux2 = aux2 + 2;
                        } else {
                            aux2 = aux2 + 1;
                        }
                        break;
                    }
                }
                //sets the new value of the offspring after the array has been completly read
                if (i + 1 == map.length) {
                    index2 = -1;
                    offspring2[w] = map[aux2][F];
                }
            }
        }

        //sets the same value to the offspring if no value is found in the female cut array
        if (aux1 < 0) {
            offspring1[w] = male.cities[w];
        }

        //sets the same value to the offspring if no value is found in the male cut array
        if (aux2 < 0) {
            offspring2[w] = female.cities[w];
        }
    }

    descendant1 = new Subject (offspring1);
    descendant2 = new Subject (offspring2);
    descendants = [descendant1, descendant2];
    
    return descendants;
    
}

let Subject = function (cities) {
    this.cities = cities;
    this.fitness = getFitness(cities);

    this.mutate = function () {
        mutate(this.cities)
    }
    /**
     * Apply the mating algorithm PMX and return two resulting Subjects in a Array
     * @param {Subject} subject 
     */
    this.crossOver = function (female) {
        return PMX(this, female);
    }

    this.toString = function () {
        return this.fitness.toString();
        // return this.cities.toString();
    }
}

/**
 * 
 * @param {[][]} city_distance_map 
 */
module.exports = function (distanceMatrix) {
    if (!distanceMatrix) {
        throw ReferenceError("city_distance_map can't be null on Subject importing");
    }

    city_distance_map = distanceMatrix;

    return Subject;
}