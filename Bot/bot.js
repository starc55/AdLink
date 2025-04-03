const { Telegraf } = require("telegraf");
const TOKEN = "7516737132:AAEqJuJM64zfhg8SGDeHcW1qn6CGlfIFu9Y";
const bot = new Telegraf(TOKEN);

const web_link = "https://ad-link.vercel.app/";

bot.start((ctx) =>
  ctx.reply("Welcome to the bot. Please feel free to use the bot. :)))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
