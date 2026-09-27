const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_USERNAME = process.env.CHANNEL_USERNAME;
const WEB_APP_URL =
  process.env.WEB_APP_URL || "https://cefr-english-diyor.netlify.app";

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN topilmadi");
}

const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function telegram(method, body) {
  const response = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.description || `Telegram API error: ${method}`);
  }

  return data.result;
}

async function isSubscribed(userId) {
  if (!CHANNEL_USERNAME) return true;

  try {
    const member = await telegram("getChatMember", {
      chat_id: CHANNEL_USERNAME,
      user_id: userId,
    });

    if (
      ["creator", "administrator", "member"].includes(member.status)
    ) {
      return true;
    }

    if (member.status === "restricted" && member.is_member === true) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Subscription check failed:", error.message);
    return false;
  }
}

async function sendStart(chatId, firstName) {
  const subscribed = await isSubscribed(chatId);

  if (!subscribed) {
    await telegram("sendMessage", {
      chat_id: chatId,
      text:
        `Salom, ${firstName || "do‘st"}! 👋\n\n` +
        `CEFR English botidan foydalanish uchun avval kanalimizga obuna bo‘ling. 📚`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📢 Kanalga obuna bo‘lish",
              url: `https://t.me/${CHANNEL_USERNAME.replace("@", "")}`,
            },
          ],
          [
            {
              text: "✅ Obunani tekshirish",
              callback_data: "check_subscription",
            },
          ],
        ],
      },
    });

    return;
  }

  await sendMainMenu(chatId, firstName);
}

async function sendMainMenu(chatId, firstName) {
  await telegram("sendMessage", {
    chat_id: chatId,
    text:
      `🇬🇧 CEFR ENGLISH\n\n` +
      `Salom, ${firstName || "do‘st"}! 👋\n\n` +
      `Ingliz tilingizni A1 dan C2 gacha rivojlantiring.\n` +
      `Testlar, vocabulary va grammar sizni kutmoqda! 📚`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 CEFR English'ni ochish",
            web_app: {
              url: WEB_APP_URL,
            },
          },
        ],
      ],
    },
  });
}

export default async (request) => {
  if (request.method !== "POST") {
    return new Response("OK", { status: 200 });
  }

  try {
    const update = await request.json();

    if (update.message) {
      const message = update.message;
      const chatId = message.chat.id;
      const firstName = message.from?.first_name || "do‘st";
      const text = message.text || "";

      if (text === "/start") {
        await sendStart(chatId, firstName);
      }
    }

    if (update.callback_query) {
      const query = update.callback_query;
      const chatId = query.message.chat.id;
      const messageId = query.message.message_id;
      const userId = query.from.id;

      if (query.data === "check_subscription") {
        const subscribed = await isSubscribed(userId);

        await telegram("answerCallbackQuery", {
          callback_query_id: query.id,
          text: subscribed
            ? "✅ Obuna tasdiqlandi!"
            : "❌ Avval kanalga obuna bo‘ling.",
          show_alert: true,
        });

        if (subscribed) {
          await telegram("editMessageText", {
            chat_id: chatId,
            message_id: messageId,
            text:
              `✅ Obuna tasdiqlandi!\n\n` +
              `Endi CEFR English platformasini ochishingiz mumkin. 🚀`,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🚀 CEFR English'ni ochish",
                    web_app: {
                      url: WEB_APP_URL,
                    },
                  },
                ],
              ],
            },
          });
        }
      }
    }

    return Response.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
};
