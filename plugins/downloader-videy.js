import axios from 'axios';

export const handler = async function (m, { conn, args, usedPrefix, command }) {
  if (!args[0]) {
    return m.reply(`Mana linknya? Contoh penggunaan: ${usedPrefix + command} <URL_VIDEY>`);
  }

  if (!/^http(s)?:\/\/videy\.co/i.test(args[0])) {
    return m.reply('Pastikan link yang diberikan berasal dari videy.co.');
  }

  try {
    await conn.reply(m.chat, '🔍 Mencari video... Mohon tunggu sebentar... 🚮', m);

    const result = await videy(args[0]);
    if (result) {
      await conn.sendFile(m.chat, result, 'video.mp4', '• Downloader - Videy', m);
    } else {
      await conn.reply(m.chat, 'Error: Tidak dapat menemukan sumber video', m);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Error: ' + error.message, m);
  }
};

export async function videy(url) {
  try {
    const response = await axios.get(`https://api.agatz.xyz/api/videydl?url=${encodeURIComponent(url)}`);
    const data = response.data;

    if (data.status === 200 && data.data) {
      return data.data;
    } else {
      throw new Error('Video tidak ditemukan atau terjadi kesalahan');
    }
  } catch (error) {
    console.error(`Error fetching the URL: ${error.message}`);
    throw new Error('Terjadi kesalahan saat mengambil video');
  }
}

handler.help = ['videy'];
handler.tags = ['downloader'];
handler.command = ['videy', 'videydl'];
handler.register = true;
handler.limit = true;

export default handler;