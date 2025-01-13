import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `Linknya?\nExample: *.douyin linknya*`;

  await conn.sendMessage(m.chat, {
    react: {
      text: "⏳",
      key: m.key,
    }
  });

  let res = await axios.get(`https://api.betabotz.eu.org/api/download/douyin?url=${text}&apikey=SxrAaw`);
  let data = res.data;
  let pi = data.result;
  let ya = pi.video[0];
  let cap = `_Nih Kak Videonya >,<_`;

  conn.sendMessage(m.chat, { video: { url: ya }, caption: cap }, m);
}

handler.help = ['douyin'];
handler.tags = ['downloader'];
handler.command = /^(douyin|dyn|dauyin)$/i;
handler.limit = true;

export default handler;
/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/