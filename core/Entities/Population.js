const Subject = require("./Subject");

function generatePopulation(cities, Subject, size){
    let subjects = [];

    for(let i = 0; i < size; i++){
        subject = new Subject(cities.shuffle());
        subjects.push(subject);
    }
    
    return subjects;
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

    this.Reduce = function(newSubjects){
        // criar mais um array de subjects, pegar o antigo e o parametro e juntar no novo array de forma ORDENADA
        
        let total = this.subjects.concat(newSubjects);
        total.reduce
        throw "TODO - Implementar fase do elitismo selecionando entre os novos subjects e os antigos; manter o array ordenado";
    }

    /**
     * Return the Subject with the best fitness
     */
    this.getBestFitness = function(){
        return this.subject[0];
    }
}

module.exports = Population;