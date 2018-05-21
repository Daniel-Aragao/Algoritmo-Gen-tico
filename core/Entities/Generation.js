const Subject = require('./Subject');

let Generation = function(id, subject){
    this.id = id;
    this.subject = subject;

    this.toString = function(){
        return this.id + " " + subject.fitness;
    }
}

module.exports = Generation