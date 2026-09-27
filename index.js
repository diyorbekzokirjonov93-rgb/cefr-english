import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const channelUsername = process.env.CHANNEL_USERNAME;

if (!token) {
  throw new Error("BOT_TOKEN topilmadi!");
}

if (!webAppUrl) {
  throw new Error("WEB_APP_URL topilmadi!");
}

if (!channelUsername) {
  throw new Error("CHANNEL_USERNAME topilmadi!");
}

const bot = new TelegramBot(token, {
  polling: true
});

async function isSubscribed(userId) {
  try {
    const member = await bot.getChatMember(
      channelUsername,
      userId
    );

    return ["creator", "administrator", "member"].includes(
      member.status
    );
  } catch (error) {
    console.error("Obuna tekshirish xatosi:", error.message);
    return false;
  }
}

async function sendStartMessage(msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const firstName = msg.from.first_name || "Do‘st";

  const subscribed = await isSubscribed(userId);

  if (!subscribed) {
    await bot.sendMessage(
      chatId,
      `🇬🇧 CEFR ENGLISH

👋 Salom, ${firstName}!

Botdan foydalanish uchun avval kanalimizga obuna bo‘ling 👇`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📢 Kanalga obuna bo‘lish",
                url: `https://t.me/${channelUsername.replace("@", "")}`
              }
            ],
            [
              {
                text: "✅ Obunani tekshirish",
                callback_data: "check_subscription"
              }
            ]
          ]
        }
      }
    );

    return;
  }

  await sendMainMenu(chatId, firstName);
}

async function sendMainMenu(chatId, firstName) {
  await bot.sendMessage(
    chatId,
    `🇬🇧 CEFR ENGLISH

👋 Salom, ${firstName}!

A1 dan C2 gacha ingliz tilingizni sinab ko‘ring.

📚 Vocabulary
📕 Grammar
📝 Testlar
📊 Natijalar
🏆 Reyting

Boshlash uchun tugmani bosing 👇`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 CEFR ENGLISH",
              web_app: {
                url: webAppUrl
              }
            }
          ]
        ]
      }
    }
  );
}

bot.onText(/\/start/, async (msg) => {
  await sendStartMessage(msg);
});

bot.on("callback_query", async (query) => {
  if (query.data !== "check_subscription") {
    return;
  }

  const userId = query.from.id;
  const chatId = query.message.chat.id;

  const subscribed = await isSubscribed(userId);

  if (!subscribed) {
    await bot.answerCallbackQuery(query.id, {
      text: "❌ Avval kanalga obuna bo‘ling!",
      show_alert: true
    });

    return;
  }

  await bot.answerCallbackQuery(query.id, {
    text: "✅ Obuna tasdiqlandi!"
  });

  await bot.sendMessage(
    chatId,
    "✅ Obuna tasdiqlandi!\n\nEndi CEFR ENGLISH'ni boshlashingiz mumkin 👇",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 CEFR ENGLISH",
              web_app: {
                url: webAppUrl
              }
            }
          ]
        ]
      }
    }
  );
});

bot.on("polling_error", (error) => {
  console.error("Telegram bot xatosi:", error.message);
});

console.log("🤖 CEFR Telegram bot ishga tushdi!");