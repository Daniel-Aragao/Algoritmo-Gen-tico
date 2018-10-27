const Subject = require('./Subject');

let Generation = function(id, subject){
    this.id = id;
    this.subject = subject;

}

Generation.prototype.toString = function(){
    return "Geracao: " + this.id + " Fitness:" + this.subject.fitness.toFixed(2);
}

module.exports = Generation