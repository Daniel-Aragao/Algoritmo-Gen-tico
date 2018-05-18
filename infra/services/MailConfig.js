const nodemailer = require('nodemailer');
const EventController = require('./EventController');
const IOops = require('./IO_Operations');

const eventEmitter = EventController.getEmitter();

let auth = IOops.getEmailAuth();

if(auth){
    var mailOptions = {
        from: 'danielfilhoce@edu.unifor.br',
        to: 'danielfilhoce@gmail.com',
        subject: 'Aplicação finalizada',
        text: 'O algoritmo genético terminou de rodar'
    };
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: auth
    });
}

let mailConfig = function(){
    
    eventEmitter.on('populationControl.stop', function(){
        if(auth){
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }else{
            console.log('Configure e-mail "misc/emailconfig" file in this format: "address@provider;password" ')
        }
    });
}


module.exports = mailConfig;