/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
import axios from 'axios';

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) 
    return conn.reply(m.chat, '*Example :* .llama Siapa presiden Indonesia?', m);

  let name = conn.getName(m.sender);

  await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

  let prompt = "You are a friendly AI.";

  let messages = [
    ...previousMessages,
    {
      role: 'system',
      content: "Ubah gaya bicaramu agar lebih seperti seorang teman yang ramah. Gunakan bahasa yang sopan dan mudah dipahami. Kamu adalah asisten pintar yang bernama 'Llama'. Jawab semua pertanyaan dengan lengkap dan jelas."
    },
    { role: 'user', content: text }
  ];

  try {
    let response = await axios.get('https://api.siputzx.my.id/api/ai/llama33', {
      params: {
        prompt: prompt,
        text: text
      }
    });

    let reply = response.data.data || "Maaf, saya tidak bisa menjawab itu sekarang.";

    let hasil = `*◯ Aᴇᴛʜᴇʀᴢ-ᴍᴅ Pʀᴏ*\n\n${reply}`;
    await conn.sendMessage(m.chat, { text: hasil });

    previousMessages = messages;

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (error) {
    console.error("Error saat memanggil API Llama:", error);
    await conn.reply(m.chat, "Terjadi kesalahan saat memproses permintaanmu. Coba lagi nanti!", m);
  }
};

handler.help = ['llama <text>'];
handler.command = /^llama$/i;
handler.tags = ['ai'];
handler.premium = false;

export default handler;