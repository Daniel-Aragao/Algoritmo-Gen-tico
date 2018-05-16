Number.prototype.getRandomInt = function(max) {
    let min = this;
    
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

Array.prototype.shuffle = function(){
    var result = [];
    var runned_indexes = [-1];
    
    for(let i = 0; i < this.length; i++){
        let includIn = -1;
        
        while(runned_indexes.findIndex(e => e == includIn) > -1){
            includIn = (0).getRandomInt(this.length);
        }

        runned_indexes.push(includIn);

        result[includIn] = this[i];
    }
    return result;
}

Array.prototype.toString = function(){
    let result = "["

    this.forEach(function(e){
        result += ", " + e.toString();
    });
    result = result.replace(', ', '');
    return result += "]";
}