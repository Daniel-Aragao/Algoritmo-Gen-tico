const City = require('./City')

var city_distance_map = null;

/**
 * Sum the distance to run from the start city, passing throught all the other cities and return to the beginning
 * @param {City[]} cities 
 */
function getFitness(cities){
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
 * @param {City[]} cities 
 */
function mutate(cities){
    a = getRandomArbitrary(0, cities.length);
    b = a;

    while(b == a){
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
function mating(male, female){
    throw "TODO - implementar PMX";
}

let Subject = function(cities, mutate){
    this.cities = cities;
    this.fitness = getFitness(cities);

    if(mutate){
        mutate(cities)
    }
    /**
     * Apply the mating algorithm PMX and return two resulting Subjects in a Array
     * @param {Subject} subject 
     */
    this.mating = function(female){
        return mating(this, female);
    }

    this.toString = function(){
        return this.fitness.toString();
        // return this.cities.toString();
    }
}

// Subject.prototype.toString = 

/**
 * 
 * @param {[][]} city_distance_map 
 */
module.exports = function(distanceMatrix){
    if(!distanceMatrix){
        throw ReferenceError("city_distance_map can't be null on Subject importing");
    }

    city_distance_map = distanceMatrix;

    return Subject;
}