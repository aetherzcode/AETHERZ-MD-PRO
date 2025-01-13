/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/

import { randomBytes } from 'crypto';
import moment from 'moment-timezone';

let handler = async (m, { conn, text, command }) => {
  let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m;
  let teks = text ? text : cc.text;

  if (!teks) {
    return m.reply('Harap masukkan teks atau balas pesan untuk menyiarkan.');
  }

  let d = new Date(new Date() + 3600000);
  let locale = 'id';
  let week = d.toLocaleDateString(locale, { weekday: 'long' });
  let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  let wibh = moment.tz('Asia/Jakarta').format('HH');
  let wibm = moment.tz('Asia/Jakarta').format('mm');
  let wibs = moment.tz('Asia/Jakarta').format('ss');
  let wktuwib = `${wibh} H ${wibm} M ${wibs} S`;

  // Menyisipkan karakter zero-width space untuk memecah pola link
  let obfuscate = (str) => str.split('').join('\u200B');
  let safeLink = obfuscate(link.web);

  let broadcastText = `${teks}\n\n⻝ 𝗗𝗮𝘁𝗲: ${week} ${date}\n⻝ 𝗧𝗶𝗺𝗲: ${wktuwib}`;

  let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0]);

  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m);

  for (let id of groups) {
    await conn.sendMessage(id, {
      text: broadcastText,
      contextInfo: {
        externalAdReply: {
          title: 'BROADCAST',
          body: 'BROADCAST!',
          thumbnailUrl: global.aetherzjpg,
          sourceUrl: link.web,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }).catch(_ => _);
  }

  m.reply('Selesai Broadcast All Group :)');
};

handler.help = ['broadcastgroup'];
handler.tags = ['owner'];
handler.command = /^(broadcastgroup|bcgc)$/i;
handler.owner = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length);