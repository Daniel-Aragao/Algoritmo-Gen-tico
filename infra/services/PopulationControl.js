const Population = require('../../core/Entities/Population');

const service = function(cities, distanceMatrix, routine_parameters){
    const Subject = require('../../core/Entities/Subject')(distanceMatrix);
    
    //Gerar População Inicial
    let population = Population(routine_parameters.population, cities, Subject);
    console.log(population.subjects)
    
    //Avaliação da População

    //WHILE Critério de Parada:
        //Seleção
        //Cruzamento
        //Mutação
        //Avaliação da População
        //Eliminação dos menos aptos
    // FIM

}

module.exports = service;