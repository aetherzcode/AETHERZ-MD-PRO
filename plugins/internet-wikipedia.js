
import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) throw `*Contoh:* ${usedPrefix}wiki tahu`;
  let zeltoria = await fetch(`https://api.betabotz.eu.org/api/search/wikimedia?text1==${text}&apikey=${global.lann}`);
  let json = await zeltoria.json();
  await conn.sendMessage(m.chat, {
    text: json.result, 
    contextInfo: {
      externalAdReply: {
        title: 'W I K I P E D I A',
        body: wm,
        thumbnailUrl: 'https://telegra.ph/file/892f227dca4258e6f2421.jpg',
        sourceUrl: link.web,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
};

handler.help = ['wikipedia *⧼query⧽*'];
handler.tags = ['internet'];
handler.command = /^(wiki|wikipedia)$/i;
handler.register = true;
handler.premium = false;
handler.limit = true;

export default handler;