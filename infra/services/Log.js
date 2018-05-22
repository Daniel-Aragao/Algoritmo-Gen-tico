const EventController = require('./EventController');
const eventEmitter = EventController.getEmitter();

let Log = {
    Config: function(){
        let generation = null;
        eventEmitter.on('populationControl.start', function(gener){
            generation = gener;
            console.log('=================Inicio=================')
        });

        eventEmitter.on('populationControl.stop', function(e){
            console.log("Programa finalizado. Solucao encontrada: " + generation.gen.toString());
            console.log('===============Finalizado===============')
        });

        eventEmitter.on('populationControl.new.solution', function(e){
            console.log('--------------Nova-Solucao--------------')
            console.log("Nova Solucao: " + generation.gen.toString());
        });

        eventEmitter.on('populationControl.new.generation', function(e){
            console.log("Geracao: " + generation.counter);
        });
    }
}


module.exports = Log