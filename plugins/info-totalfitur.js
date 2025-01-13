import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
  let text = `AETHERZ-MD memiliki Total fitur: ${totalf}`;

  let response = await fetch("https://files.catbox.moe/3cj9sd.jpg");
  let thumbnailBuffer = await response.buffer();

  conn.sendMessage(
    m.chat,
    {
      text: text,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: "url_audio",
          title: "T O T A L - F I T U R",
          body: `📁 ${totalf} aktif`,
          sourceUrl: "https://aetherz.xyz",
          thumbnail: thumbnailBuffer
        }
      }
    }
  );
};

handler.help = ['totalfitur'];
handler.tags = ['info'];
handler.command = ['totalfitur'];

export default handler;