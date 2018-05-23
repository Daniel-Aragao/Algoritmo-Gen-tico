require('./infra/services/Utils');

const PopulationControl = require('./infra/services/PopulationControl');
const IOops = require('./infra/services/IO_Operations');
const CitiesDistances = require('./infra/services/ImportCitiesDistances');
const mailConfig = require('./infra/services/MailConfig');
const Log = require('./infra/services/Log');
const viewController = require('./view/controller');


//mailConfig()
Log.Config();
viewController.Config(Start)


// parameters = {
//     file: './misc/input/30CIT.txt',
//     population: 200,
//     tax_crossover: 0.75,
//     tax_mutation: 0.1,
//     stop_condition: 'not-better',
//     stop_param: '40',
//     selection_algorithm: 'Roleta',
//     population_selection: 'Elitismo'
// }
// Start(parameters);

// executar assíncronamente após inicializar tela principal do electron, possubilitando a alteração dos parâmetros por meio da interface
function Start(parameters){
    let cities = IOops.CITRead(parameters.file);
    let distanceMatrix = CitiesDistances.getMatrix(cities, parameters.file);
    
    PopulationControl(cities, distanceMatrix, parameters);
}