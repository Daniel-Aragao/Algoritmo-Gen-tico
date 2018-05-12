const PopulationControl = require('./infra/services/PopulationControl')
const IOops = require('./infra/services/IO_Operations');
const CitiesDistances = require('./infra/services/ImportCitiesDistances');

parameters = {
    file: './misc/input/21CIT.txt',
    population: 5,
    tax_crossover: 0.75,
    tax_mutation: 0.1,
    stop_condition: 'not-better',
    stop_param: '40',
    selection_algorithm: 'roleta',
    population_selection: 'elitismo'
}

let cities = IOops.CITRead(parameters.file);
let distanceMatrix = CitiesDistances.getMatrix(parameters.file);
// IOops.CITDistancesWrite(distanceMatrix);

PopulationControl(cities, distanceMatrix, parameters)