/**
 * Returns half of population size couples of subjects
 * @param {Population} population 
 */
let Roulette = function(population){
    let tuples = []
    let total = 0;
    let proportion = 0;
    let subjects_percents = [];

    population.subjects.forEach(subject => {
        total += 1/subject.fitness;
    });

    proportion = 100/total;

    population.subjects.forEach(subject => {
        subjects_percents.push({
            percent: proportion * (1/subject.fitness),
            subject: subject
        });
    });

    for(let i = 0; i < population.size/2; i++){
        let male = pick_up(subjects_percents);
        let female = pick_up(subjects_percents);
        
        while (male == female){
            female = pick_up(subjects_percents);
        }

        tuples.push([male, female]);
    }

    return tuples;
}

function pick_up(subjects_percents){
    let cursor = Math.random()*100;
    let accum = 0;
    let bigger_subject = null;

    for(let i = 0; i < subjects_percents.length; i++){
        let item = subjects_percents[i];
        bigger_subject = item.subject;

        accum += item.percent;

        if(accum > cursor){
            break;
        }
    }

    return bigger_subject;
}

module.exports = {
    Roleta: Roulette
}