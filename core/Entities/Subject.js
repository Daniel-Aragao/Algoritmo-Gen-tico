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
    let i = (0).getRandomInt(male.cities.length);
    let j = i;
    
    while(j == i){
        j = (0).getRandomInt(male.cities.length);
    }


    let offspring1 = (new Array(i)).concat(female.cities.slice(i,j));
    let offspring2 =   (new Array(i)).concat(male.cities.slice(i,j));

    function c(offspring, father, mother){
        let missing = mother.cities.subtract(offspring);

        missing.forEach(item => {
            let aux = item;
            let index = father.cities.findIndex(function(e){
                return e.id == item.id
            });
    
            while(i <= index && index < j){
                item = offspring[index];
                index = father.cities.findIndex(function(e){
                    return e.id == item.id
                });
            }

            if(index == -1){throw new Error("wtf?" + father.cities.toString())}
            offspring[index] = aux
        });
        
        let nullindex = offspring.findIndex(function(e){return e == null || e == undefined})
        if(nullindex != -1){
            throw new Error("failure in crossover on index: " + nullindex);
        }
        
    }

    c(offspring1, male, female)
    c(offspring2, female, male)
    
    let descendant1 = new Subject(offspring1);
    let descendant2 = new Subject(offspring2);
    let descendants = [descendant1, descendant2];
    
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