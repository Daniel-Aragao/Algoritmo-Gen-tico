const Subject = require('./Subject');

let Generation = function(id, subject){
    this.id = id;
    this.subject = subject;

    this.toString = function(){
        return "Geracao: " + this.id + " Fitness:" + subject.fitness;
    }
}

module.exports = Generation