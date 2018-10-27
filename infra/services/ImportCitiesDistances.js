const City = require('../../core/Entities/City');
const path = require('path')
const IOops = require('./IO_Operations');

/*
*/

/**
 * Create the city distances file and return the string.
 * FORMATO DO ARQUIVO
 * linha,coluna,distância
 * 0,1,x1 \n 
 * 0,2,y1 \n 
 * 0,3,z1 \n 
 * 1,0,x2 \n 
 * 1,2,y2 \n 
 * 1,3,y2 \n 
 * ...
 * 
 * (linhas e colunas são id's das cidades, estes podem ser strings, gerando por exemplo a seguinte sequência):
 * 0,a,x1 \n 
 * 0,2,y1 \n 
 * a,0,x2 \n 
 * a,2,y2 \n 
 * ...
 * @param {City[]} cities 
 */
function makeDistanceMatrix(cities, filedir){
    let matrix = {};
    let str = "";

    cities.forEach(city1 => {
        matrix[city1.id] = {};

        cities.forEach(city2 => {
            if(city1.id != city2.id){
                let d = city1.getDistance(city2);

                matrix[city1.id][city2.id] = d;                
                str += city1.id + "," + city2.id + "," + d + '\n';
            }else{
                matrix[city1.id][city2.id] = 0;                
                str += city1.id + "," + city2.id + "," + 0 + '\n';
            }
        });
    });

    IOops.CITDistancesWrite(str, filedir)

    return matrix;
}

module.exports = {
    getMatrix: function(cities, filedir){
        let distance_dir = "misc/distances/" + path.basename(filedir)
        let lines = IOops.CITDistancesReader(distance_dir)
        
        if(!lines){
            console.log('ImportCitiesDistances.js => Creating distance matrix');
            return makeDistanceMatrix(cities, distance_dir);
        }
        
        console.log('ImportCitiesDistances.js => Importing distance matrix');

        let matrix = {}
        lines.forEach(lineStr => {
            if(lineStr){
                let lineArray = lineStr.split(',');
                
                let city1 = lineArray[0];
                let city2 = lineArray[1];
                let distance = lineArray[2];
                
                if(!matrix[city1]){
                    matrix[city1] = {};
                }
                
                matrix[city1][city2] = Number(distance);
            }
        });

        return matrix
    }
}