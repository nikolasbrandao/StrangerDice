const TelegramBot = require(`node-telegram-bot-api`)
//const dadosBot = require('./bot-info.json')

const bot = new TelegramBot(process.env.api_key, { polling:true })


bot.on('message',(msg)=>{
    //console.log('msg:', msg)
})

var logErrorEcho = function logErrorEcho(msg){
    return function (err){
        return console.log(msg,err);
    };
};

var logSucessEcho = ()=>{
    return function(data){
        console.log('Sucess:', data);
    }
};

var sendEcho = (msg, match)=>{
    bot.sendMessage( msg.chat.id, match[ 1 ] )
        .then( logSucessEcho (msg, match) )
        .catch( logErrorEcho( 'Error:' ) );
};

bot.onText( /\/echo (.*)/, sendEcho );