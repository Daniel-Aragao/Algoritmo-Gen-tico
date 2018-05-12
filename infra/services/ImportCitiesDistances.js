const path = require('path')
const IOops = require('./IO_Operations');

/*
FORMATO DO ARQUIVO
linha,coluna,distância
0,1,x1
0,2,y1
0,3,z1
1,0,x2
1,2,y2
1,3,y2
...

(linhas e colunas são id's das cidades, estes podem ser strings, gerando por exemplo a seguinte sequência):
0,a,x1
0,2,y1
a,0,x2
a,2,y2
...
*/
module.exports = {
    getMatrix: function(filedir){
        let distance_dir = "../../misc/distances/" + path.basename(filedir)
        let result_string = IOops.CITDistancesReader(distance_dir)
        
        if(!result_string){
            throw "TODO - Criar arquivo e retornar a matriz"
        }

        throw "TODO - ler string do arquivo e retornar a matriz"
    }
}