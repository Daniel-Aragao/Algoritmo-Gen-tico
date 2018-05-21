const EventController = require('./EventController');
const eventEmitter = EventController.getEmitter();

let Log = {
    Config: function(){
        let generation = null;
        eventEmitter.on('populationControl.start', function(gener){
            generation = gener;
            console.log('=================Início=================')
        });

        eventEmitter.on('populationControl.stop', function(e){
            console.log("Programa finalizado. Solução encontrada: " + generation.gen.toString());
            console.log('===============Finalizado===============')
        });

        eventEmitter.on('populationControl.new.solution', function(e){
            console.log('--------------Nova-Solução--------------')
            console.log("Nova Solução: " + generation.gen.toString());
        });

        eventEmitter.on('populationControl.new.generation', function(e){
            console.log("Geração: " + generation.counter);
        });
    }
}


module.exports = Log