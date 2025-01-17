import fetch from 'node-fetch';

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `Usage Example: ${usedPrefix + command} elaina`;

  try {
    let res = await (await fetch(`https://api.ryzendesu.vip/api/search/pixiv?query=${text}`)).json();

    if (!res.Media || res.Media.length === 0) {
      throw 'Tidak Ditemukan';
    }

    let imageUrl = res.Media[0];
    let caption = `
*Artist:* ${res.artist}
*Caption:* ${res.caption}
*Tags:* ${res.tags.join(', ')}
`;

    await conn.sendFile(m.chat, imageUrl, 'image.jpg', caption.trim(), m);
  } catch (e) {
    console.log(e);
    throw e || 'Terjadi kesalahan saat mencari gambar';
  }
};

handler.help = ['pixiv <pencarian>'];
handler.tags = ['aiv2', 'menuprem'];
handler.command = /^pixiv$/i;
handler.premium = true;
handler.nsfw = true;

export default handler;