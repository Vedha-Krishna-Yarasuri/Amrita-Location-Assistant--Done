var TelegramBot= require("node-telegram-bot-api");
var request = require("request");
const token = '776977560:AAGDX4hlrPx-Vp8bx7fM28yb_kEY5CxcyRQ';

const options = {
  webHook: {
    port: process.env.PORT
  }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
// const url = process.env.APP_URL || 'https://amritalbot.herokuapp.com:443';

const bot = new TelegramBot(token, options);
bot.setWebHook(`${url}/bot${token}`);


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg.text)
  if((msg.text.toLowerCase())=='help' || msg.text=='/start' ){
bot.sendMessage(chatId, 'This bot helps you to find location information in College. Eg : Send TBI to know where is TBI Or Amriteshwari Hall. <b>Powered by</b> <a href=\"http://www.codinza.com/\">CODINZA.COM</a>' );
  }
  else{
    
 
  var options = { method: 'GET',
  url: 'https://J1PF3WYZW7-dsn.algolia.net/1/indexes/location_assistant',
  qs: { query: msg.text, hitsPerPage: '10', getRankingInfo: '1' },
  headers: 
   {
     'X-Algolia-Application-Id': 'J1PF3WYZW7',
     'X-Algolia-API-Key': '98022c595c999ec9ba3fd51ab6eee4fd'
      } };

request(options, function (error, response, body) {
  
  if (error) {
  bot.sendMessage(chatId, 'Something wentwrong. Try again later');
  }
  else{
    if(JSON.parse(body).hits.length>0){
     bot.sendMessage(chatId, "If you are looking directions for " + JSON.parse(body).hits[0].name+"\n \nDirections : \n"+JSON.parse(body).hits[0].id+"\n" +JSON.parse(body).hits[0].text);
     bot.sendMessage(chatId, JSON.parse(body).hits[0].meaning);
    }
    else{
      bot.sendMessage(chatId, 'Cant find the details of ' +msg.text +' . Try with some other name. Eg : TBI or send HELP to know more' );
    }
  }
});
  }
});