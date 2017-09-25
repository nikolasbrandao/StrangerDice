const TelegramBot = require(`node-telegram-bot-api`)
const dadosBot = require('./bot-info.json')

const bot = new TelegramBot(dadosBot.Token, { polling:true })


bot.on('message',(msg)=>{
    //console.log('msg:', msg)
})

var logErrorEcho = function logErrorEcho(msg){
    return function (err){
        return console.log(msg,err);
    };
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var sendEcho = (msg, match)=>{
    bot.sendMessage( msg.chat.id, match[ 1 ] )
        .then()
        .catch( logErrorEcho( 'Error:' ) );
};

var sendDices = (msg, match)=>{
    //position: 0 = caracter '/', 1 = quantidade de dados, 2 = caracter 'D', 3 = numero de faces no dado  
    let comando = match[ 0 ].split(/(\d{1,2})/); 
    let resultado = "Resultados:";
    for(let i = 1; i <= comando[1]; i++){
        let rolagem = getRandomInt(1, comando[3]);
        resultado += "\n Dado "+i+" resultado: "+rolagem;
    }

    bot.sendMessage( msg.chat.id, resultado )
        .then( console.log( comando ) )
        .catch( logErrorEcho( 'Error:' ) );
};

bot.onText( /\/echo (.*)/, sendEcho );

// Expressão regular, comando deve começar com "/"
// seguido por um numero de no maximo duas casas decimais
// um caracter "d" minusculo ou maiusculo, e finalizando
// com um numero de duas casas decimais.
bot.onText( /\/\b\d{1,2}[dD]\d{1,2}/, sendDices );