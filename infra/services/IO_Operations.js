const fileSystem = require('fs') // https://www.w3schools.com/nodejs/nodejs_filesystem.asp
// ler o arquivo de cidades
const City = require('../../core/Entities/City')

module.exports = {
    CITRead: function(path){
        let file = fileSystem.readFileSync(path, { encoding: 'utf8' });
        let cities = [];

        file.split('\n').forEach(function(element, index){
            if(index){
                coordinates = element.split(',');
                
                x = coordinates[0];
                y = coordinates[1];

                cities.push(new City(index - 1, x, y));
            }
        });

        return cities;
    },
    /**
     * Search the file of distances and return if exists, return null if not
     * @param {String} path
     */
    CITDistancesReader: function(path){
        throw "TODO - Retornar só a string em utf8"
        return null;
    },

    /**
     * Save the matrix of the CIT file name in the distances directory
     * @param {[][]} matrix
     */
    CITDistancesWrite: function(matrix){
        dir = "../../misc/distances/";
        throw "TODO - escrever a string no formato específicado no arquivo 'ImportCitiesDistances' utilizando utf8";
    }
}