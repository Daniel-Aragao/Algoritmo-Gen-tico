var City = function(id,x,y){
    this.id = id;
    this.x = x;
    this.y = y;

    /**
     * Calculate the distance from this to the informed city
     * @param {City} city 
     */
    this.getDistance = function(city){
        return Math.sqrt(Math.pow(this.x - city.x, 2) + Math.pow(this.y - city.y,2));
    }

    this.toString = function(){
        return this.id+", "+this.x+", "+this.y
    }
}

module.exports = City;