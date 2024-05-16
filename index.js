// const TelegramBot = require("node-telegram-bot-api");
import TelegramBot from "node-telegram-bot-api";

// replace the value below with the Telegram token you receive from @BotFather
const token = "7069499307:AAE0Ssd9wR35QtDJOUb57g_x4EbcwMJz6fA";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const user_id = msg.from.id;
  const chartMember = await bot.getChatMember(chatId, user_id);
  console.log(chartMember.status);
  if (chartMember.status === "member") {
    bot.sendMessage(chatId, `你是这个群的成员(${chartMember.status})`);
  } else {
    bot.sendMessage(chatId, `你是这个群的管理员(${chartMember.status})`);
  }
  // console.log(chartMember);

  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, "Received your message");
});
