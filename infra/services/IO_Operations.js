const fileSystem = require('fs') // https://www.w3schools.com/nodejs/nodejs_filesystem.asp
// ler o arquivo de cidades
const City = require('../../core/Entities/City')

module.exports = {
    CITRead: function(path){
        let file = fileSystem.readFileSync(path, { encoding: 'utf8' });
        let cities = [];

        file.split('\n').forEach(function(element, index){
            if(index){
                coordinates = element.split(' ');
                
                x = coordinates[0];
                y = coordinates[1];

                cities.push(new City(index - 1, x, y));
            }
        });

        return cities;
    },
    /**
     * Search the file of distances and return a string array of lines if exists, return null if not
     * @param {String} path
     */
    CITDistancesReader: function(path){
        if(!fileSystem.existsSync(path)){
            return null;
        }

        let file = fileSystem.readFileSync(path, { encoding: 'utf8' });
        return file.split('\n');
    },

    /**
     * Save the matrix of the CIT file name in the distances directory
     * @param {{}} matrix
     */
    CITDistancesWrite: function(str, file){
        fileSystem.writeFileSync(file, str);
    },

    getEmailAuth: function(){
        let path = 'misc/emailconfig';

        if(!fileSystem.existsSync(path)){
            return null;
        }
        
        let text = fileSystem.readFileSync(path, { encoding: 'utf8' }).split(';');
        let auth = {
            user: text[0],
            pass: text[1]
          }
        return ;
    }
}