const electron = require('electron');
const { ipcRenderer } = electron;

ipcRenderer.on('new.generation', function(e, counter){
    geracao.innerText = counter;
});

ipcRenderer.on('new.solution', function(e, generation, optimum){
    solution.innerText = generation.id + " com o fitness: " + generation.subject.fitness.toFixed(2);
    acerto.innerText = ((optimum/generation.subject.fitness)* 100).toFixed(2) + "%";

    let elements = extractElements(generation);
    loadGraph(elements)
});

function extractElements(generation){
    let cities = generation.subject.cities;
    let elements = [];
    
    for(let i=0; i < cities.length; i++){
        let city = cities[i];

        elements.push({
            data: {
                id: city.id,
                color: 'red'
            }
        })

        if(i != 0){
            source = cities[i - 1];
        }else{
            source = cities[cities.length - 1];
        }
        target = city

        elements.push({
            data: {
                id: source.id + "_" + target.id,
                source: source.id,
                target: target.id
            }
        })
    }

    return elements;
}

function loadGraph(elements){

     cy = cytoscape({
        container: document.getElementById('graph-container'), // container to render in
        elements: elements,
        style: [
            {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(id)'
            }
            },

            {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle'
            }
            }
        ],

        layout: {
            name: 'cose',
        }
    });
    cy.animate({
        center: {
            eles: cy.container()
        }
        }, {
        duration: 500
    });

    let nodelist = cy.nodes();
    nodelist[0].style('background-color', 'white')
    nodelist[nodelist.length - 1].style('background-color', 'black')

}
// [ // list of graph elements to start with
//     { // node a
//     data: { id: 'a' }
//     },
//     { // node b
//     data: { id: 'b' }
//     },
//     { // edge ab
//     data: { id: 'ab', source: 'a', target: 'b' }
//     }
// ],