const electron = require('electron');
const url = require('url');
const path = require('path');
const EventController = require('../infra/services/EventController');

const {app, BrowserWindow, Menu, ipcMain} = electron;
const eventEmitter = EventController.getEmitter();

let mainWindow;
let parametersWindow;
let Start = null;

let Config = function(start){
    Start = start;
    process.env.NODE_ENV = 'production';

    app.on('ready', function(){
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            title: "Algoritmo Genético"
        });

        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'mainWindow.html'),
            protocol: 'file:',
            slashes:true
        }));

        const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

        Menu.setApplicationMenu(mainMenu);
        
        mainWindow.on('closed', function(){
            app.quit();
        });
    });

    // Quint app when closed
}

ipcMain.on('parametros:confirmed', function(e, item){
    parameters = {...parameters, ...item};
    console.log(item);
    parametersWindow.close();
});



function createParameterWindow(){
    // Create new window
    parametersWindow = new BrowserWindow({
        width: 500,
        // height: 200,
        title: 'Parametros'
        // ,frame: false
    });
    
    // Load html file into the window
    parametersWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'paremetersWindow.html'),
        protocol: 'file:',
        slashes:true
    }));

    // Garbage Collection handle
    parametersWindow.on('closed', function(){
        parametersWindow = null;
    });

    // parametersWindow.appParameters = {parameters}
    setTimeout(() => {
        parametersWindow.webContents.send('paremeters:init', parameters);        
    }, 1000);
}

let parameters = {
    file: './misc/input/30CIT.txt',
    population: 200,
    tax_crossover: 0.75,
    tax_mutation: 0.1,
    stop_condition: 'not-better',
    stop_param: '40',
    selection_algorithm: 'Roleta',
    population_selection: 'Elitismo'
}

const mainMenuTemplate = [
    {
        label:'Parametros',
        accelerator: 'p',
        click(){
            createParameterWindow();
        }
    },
    {
        label:'Iniciar',
        accelerator: 'i',
        click(){
            Start(parameters);
        }
    }
]

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin'? 'Command+I' : 'f12',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}

let generation = null;

eventEmitter.on('populationControl.start', function(gener){
    generation = gener;
});

eventEmitter.on('populationControl.stop', function(e){
    // console.log("Programa finalizado. Solucao encontrada: " + generation.gen.toString());
    // console.log('===============Finalizado===============')
});

eventEmitter.on('populationControl.new.solution', function(e){
    // console.log('--------------Nova-Solucao--------------')
    // console.log("Nova Solucao: " + generation.gen.toString());
    mainWindow.webContents.send('new.solution', generation.gen);    
});

eventEmitter.on('populationControl.new.generation', function(e){
    mainWindow.webContents.send('new.generation', generation.counter);    
});

module.exports = {
    Config
}