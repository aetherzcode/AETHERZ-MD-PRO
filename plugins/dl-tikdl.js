import { tiktokdl } from 'tiktokdl';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `Masukkan URL!\n\nContoh:\n${usedPrefix}${command} https://vt.tiktok.com/ZSFNnpxvP/`;
  }

  try {
    if (!args[0].match(/tiktok/gi)) {
      throw `Berikan URL dari TikTok!`;
    }

    conn.reply(m.chat, 'Sedang diproses...', m);
    const response = await tiktokdl(args[0]);
    const { video } = response;

    await conn.sendFile(m.chat, video, 'tiktok.mp4', '*TikTok Downloader*');
  } catch (e) {
    console.error(e);
    throw `Error: ${e.message || e}`;
  }
};

handler.help = ['tikdl'];
handler.command = /^(tikdl)$/i;
handler.tags = ['downloader'];
handler.register = true;
handler.limit = 5;

export default handler;