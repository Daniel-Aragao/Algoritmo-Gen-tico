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
 * @param {City[]} cities 
 */
function mutate(cities) {
    a = (0).getRandomArbitrary(cities.length);
    b = a;

    while (b == a) {
        b = (0).getRandomArbitrary(cities.length);
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

    var init = (0).getRandomInt(male.cities.length - 1);
    var end = (init).getRandomInt(male.cities.length - 1);
    var M = 0;
    var F = 1;

    for (i = init; i <= end; i++) {
        offspring1[i] = female.cities[i];
        offspring2[i] = male.cities[i];
    }

    // Cruzamento 
    // completes the offspring array from 0 to the beginning of the cut array

    for (w = 0; w < init; w++) {
        // sets index to standard
        var index1 = -1;
        var index2 = -1;



        // Search for an equal value of the male array in the cut of the female array. Gets the index of the position in case it finds 
        for (i = init; i <= end; i++) {
            if (male.cities[w] == female.cities[i]) {
                index1 = i;
                break;
            }
        }

        // Search for an equal value of the female array in the cut of the male array. Gets the index of the position in case it finds 
        for (i = init; i <= end; i++) {
            if (female.cities[w] == male.cities[i]) {
                index2 = i;
                break;
            }
        }

        // sets the auxiliar variables to the value of the index
        var aux1 = index1;
        var aux2 = index2;

        var x = 0; // counter

        // if index is different from standard it runs 
        while (index1 >= 0) {


            // Search the corresponding index of the male cut array in the female cut array 
            for (i = init; i <= end; i++) {

                //Goes to the following index in case it finds an equal 
                if (male.cities[aux1] == female.cities[i]) {
                    if (x = 0 && aux1 > init) {
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
                if (i + 1 > end) {
                    index1 = -2;
                    offspring1[w] = male.cities[aux1];
                }
            }
            x++;
        }

        // if index is different from standard it runs
        x = 0;
        while (index2 >= 0) {

            // Search the corresponding index of the female cut array in the male cut array 
            for (i = init; i <= end; i++) {
                //Goes to the following index in case it finds an equal 
                if (female.cities[aux2] == male.cities[i]) {
                    if (x = 0 && aux2 > init) {
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
                if (i + 1 > end) {
                    index2 = -2;
                    offspring1[w] = male.cities[aux1];
                }
            }
            x++;

        }
        //sets the same value to the offspring if no value is found in the female cut array
        if (aux1 == -1) {
            offspring1[w] = male.cities[w];
        }

        //sets the same value to the offspring if no value is found in the male cut array
        if (aux2 == -1) {
            offspring2[w] = female.cities[w];
        }
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // completes the offspring array from the end of the cut array to the end of the parent array
    for (w = end + 1; w < male.cities.length; w++) {
        // sets index to standard
        var index1 = -1;
        var index2 = -1;



        // Search for an equal value of the male array in the cut of the female array. Gets the index of the position in case it finds 
        for (i = init; i <= end; i++) {
            if (male.cities[w] == female.cities[i]) {
                index1 = i;
                break;
            }
        }

        // Search for an equal value of the female array in the cut of the male array. Gets the index of the position in case it finds 
        for (i = init; i <= end; i++) {
            if (female.cities[w] == male.cities[i]) {
                index2 = i;
                break;
            }
        }

        // sets the auxiliar variables to the value of the index
        var aux1 = index1;
        var aux2 = index2;

        var x = 0; // counter

        // if index is different from standard it runs 
        while (index1 >= 0) {

            // Search the corresponding index of the male cut array in the female cut array 
            for (i = init; i <= end; i++) {

                //Goes to the following index in case it finds an equal 
                if (male.cities[aux1] == female.cities[i]) {
                    if (x = 0 && aux1 > init) {
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
                if (i + 1 > end) {
                    index1 = -2;
                    offspring1[w] = male.cities[aux1];
                }
            }
            x++;
        }

        // if index is different from standard it runs
        x = 0;
        while (index2 >= 0) {

            // Search the corresponding index of the female cut array in the male cut array 
            for (i = init; i <= end; i++) {
                //Goes to the following index in case it finds an equal 
                if (female.cities[aux2] == male.cities[i]) {
                    if (x = 0 && aux2 > init) {
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
                if (i + 1 > end) {
                    index2 = -2;
                    offspring1[w] = male.cities[aux1];
                }
            }
            x++;

        }
        //sets the same value to the offspring if no value is found in the female cut array
        if (aux1 == -1) {
            offspring1[w] = male.cities[w];
        }

        //sets the same value to the offspring if no value is found in the male cut array
        if (aux2 == -1) {
            offspring2[w] = female.cities[w];
        }
        
    }

    let c =offspring2.findIndex(function(e){
        return e == null || e == undefined
    })

    let t = offspring1.findIndex(function(e){
        return e == null || e == undefined
    })

    if(c != -1 || t != -1){
        throw new Error("wtf " + c + t)
    }

    descendant1 = new Subject(offspring1);
    descendant2 = new Subject(offspring2);
    descendants = [descendant1, descendant2];

    return descendants;
}

let Subject = function (cities) {
    this.cities = cities;
    this.fitness = getFitness(cities);
    
    this.mutate = function () {
        mutate(this.cities)
        this.fitness = getFitness(cities);        
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