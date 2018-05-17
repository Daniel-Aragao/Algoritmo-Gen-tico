const Population = require('../../core/Entities/Population');
const Generation = require('../../core/Entities/Generation');
const Selections = require('./Selections');
const events = require('events');

const eventEmitter = new events.EventEmitter();

const service = function(cities, distanceMatrix, routine_parameters){
    const Subject = require('../../core/Entities/Subject')(distanceMatrix);
    let generation = {
        gen: new Generation(0),
        counter: 0
    };
    
    //Gerar População Inicial
    //Avaliação da População - calculo do fitness
    let population = new Population(routine_parameters.population, cities, Subject);
        
    while(continueGenerating(population, generation, routine_parameters.stop_param)){
        //Seleção
        let selections = Selections[routine_parameters.selection_algorithm](population);
        
        //Cruzamento
        let newSubjects = population.Crossover(routine_parameters.tax_crossover, selections);

        //Mutação
        //Avaliação da População - calculo do fitness
        population.Mutate(routine_parameters.tax_mutation, newSubjects);

        //Eliminação dos menos aptos
        population.Reduce(newSubjects)
    }
}

function continueGenerating(population, generation, iterations){
    let gen = generation.gen;
    
    let newSubject = population.getBestFitness();
    let oldSubject = gen.subject;

    if(oldSubject && oldSubject.fitness < newSubject.fitness){
        if(generation.counter - gen.id >= iterations){
            return false;
        }
    }else{
        generation.gen = new Generation(gen.counter, newSubject);

        eventEmitter.emit('populationControl.new.solution')
    }

    gen.counter++;

    eventEmitter.emit('populationControl.new.generation')

    return true
}

module.exports = service;