const TelegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration)

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_API_KEY

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: userInput,
    temperature: 0,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  const generatedText = response.data.choices[0].text;

  bot.sendMessage(chatId, generatedText);
});
