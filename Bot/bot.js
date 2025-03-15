const { Telegraf } = require("telegraf");
const TOKEN = "7516737132:AAEqJuJM64zfhg8SGDeHcW1qn6CGlfIFu9Y";
const bot = new Telegraf(TOKEN);

const web_link = "https://dapper-sorbet-8d662b.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Добро пожаловать в наш бот :)))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
