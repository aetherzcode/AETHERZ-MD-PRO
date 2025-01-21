let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} halo`;

  let sentMsg = await conn.sendMessage(m.chat, { text: "*_Bot is typing..._*" }, { quoted: m });

  if (!sentMsg || !sentMsg.key) {
    throw new Error("Failed to send the initial message.");
  }

  try {
    let res = await fetch(`https://api.siputzx.my.id/api/ai/naw?content=${text}`);
    let result = await res.json();

    if (result.status) {
      await conn.sendMessage(
        m.chat,
        { text: `${result.data.chatResponse}`, edit: sentMsg.key },
        { quoted: m }
      );
    } else {
      throw new Error("Terjadi eror saat mengambil respon");
    }
  } catch (e) {
    throw e;
  }
};

handler.help = ["naw"].map((a) => a + " *questions*");
handler.tags = ["ai"];
handler.command = ["naw"];

export default handler;