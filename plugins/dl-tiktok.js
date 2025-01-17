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

handler.help = ['tiktok'];
handler.command = /^(tiktok|tt)$/i;
handler.tags = ['downloader'];
handler.limit = 5;

export default handler;