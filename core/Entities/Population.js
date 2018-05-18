//const Subject = require("./Subject");

function generatePopulation(cities, Subject, size){
    let subjects = [];

    for(let i = 0; i < size; i++){
        subject = new Subject(cities.shuffle());
        subjects.push(subject);
    }
    
    subjects.sort(sortInterface);    
    return subjects;
}

function sortInterface(a,b){
    if(a.fitness < b.fitness){
        return -1;
    }else if(a.fitness > b.fitness){
        return 1;
    }else{
        return 0;
    }
}

/**
 * A representation of the list of subjects. You can find here
 * functions to treat and modify the population acording to
 * the commands from PopulationControl, the controller.
 * 
 * @param {Subject[]} subjects 
 * @param {Subject} generateInitialPopulation 
 */
let Population = function (size, cities, Subject){
    this.size = size;

    this.subjects = generatePopulation(cities, Subject, size);

    this.firstSubject = cities;

    /**
     * Apply the crossover method implemented by the subjects and return these new elements
     * @param {Number} tax 
     * @param {Array} selections 
     */
    this.Crossover = function(tax, selections){
        let result = []

        selections.forEach(tuple => {
            let male = tuple[0];
            let female = tuple[1];

            result = result.concat(male.crossOver(female));
        });

        return result;
    }

    /**
     * Apply the informated tax and mutate if the tax result suceed
     * @param {Number} tax 
     * @param {[]} newSubjects 
     */
    this.Mutate = function(tax, newSubjects){
        newSubjects.forEach(subject => {
            if(Math.random() <= tax){
                subject.mutate()
            }
        });
    }

    /**
     * reload the internal subjects array to the right population size 
     * @param {Subject[]} newSubjects 
     */
    this.Reduce = function(newSubjects){
        let total = this.subjects.concat(newSubjects);

        total.sort(sortInterface);

        this.subjects = total.slice(0, this.size);
    }

    /**
     * Return the Subject with the best fitness
     */
    this.getBestFitness = function(){
        return this.subjects[0];
    }
}

module.exports = Population;