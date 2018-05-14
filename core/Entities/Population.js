const Subject = require("./Subject");

function generatePopulation(cities, Subject, size){
    let subjects = [];

    for(let i = 0; i < size; i++){
        subject = Subject(cities.shuffle());
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
}

module.exports = Population;