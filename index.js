const TelegramBot = require(`node-telegram-bot-api`)

const TOKEN = `SEU TOKEN`

const bot = new TelegramBot(TOKEN, { polling:true })

bot.on('message',(msg)=>{
    console.log('msg', msg);
})