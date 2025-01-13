import { randomBytes } from 'crypto';
import moment from 'moment-timezone';

let handler = async (m, { conn, text }) => {
  if (!text.includes('|')) {
    return m.reply('Format salah. Gunakan .tesbc id_group|teks');
  }

  let [groupId, ...messageParts] = text.split('|');
  let message = messageParts.join('|').trim();

  if (!groupId || !message) {
    return m.reply('Format salah. Gunakan .tesbc id_group|teks');
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

  let teks = `${message}\n\n⻝ 𝗗𝗮𝘁𝗲: ${week} ${date}\n⻝ 𝗧𝗶𝗺𝗲: ${wktuwib}\n⻝ 𝗟𝗶𝗻𝗸: ${safeLink}`;

  conn.reply(m.chat, `_Mengirim pesan broadcast ke grup ${groupId}_`, m);

  try {
    await conn.sendMessage(groupId, {
      text: teks,
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
    });
    m.reply('Selesai Broadcast ke Grup :)');
  } catch (e) {
    m.reply('Gagal mengirim pesan ke grup. Pastikan ID grup benar dan bot memiliki izin yang sesuai.');
  }
};

handler.help = ['bcgcid'];
handler.tags = ['owner'];
handler.command = /^(bcgcid)$/i;
handler.owner = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length);