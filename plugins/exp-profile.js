import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import moment from 'moment-timezone';
import canvafy from 'canvafy';

let handler = async (m, { conn }) => {
  let d = new Date(new Date() + 3600000);
  let locale = 'id';

  let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5];
  let week = d.toLocaleDateString(locale, {
    weekday: 'long'
  });
  let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  let wibh = moment.tz('Asia/Jakarta').format('HH');
  let wibm = moment.tz('Asia/Jakarta').format('mm');
  let wibs = moment.tz('Asia/Jakarta').format('ss');
  let wktuwib = `${wibh} H ${wibm} M ${wibs} S`;

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  if (typeof db.data.users[who] == 'undefined') return m.reply('Pengguna tidak ada didalam data base');

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg');
  let bio = await conn.fetchStatus(who).catch(_ => ({ status: 'Tidak Ada Bio' }));
  let { role, premium, money, level, limit, exp, lastclaim, registered, regTime, age } = global.db.data.users[who];
  let username = conn.getName(who);
  let user = db.data.users[who];
  let name = `${user.registered ? user.name : conn.getName(who)}`;
  if (!(who in global.db.data.users)) return m.reply(`User ${who} not in database`);

  // Process phone number
  let phoneNumber = who.replace('@s.whatsapp.net', '');
  let internationalNumber = new PhoneNumber('+' + phoneNumber).getNumber('international');

  // Generate image using Canvafy
  const image = await new canvafy.WelcomeLeave()
    .setAvatar(pp)
    .setBackground("image", "https://www.bhmpics.com/downloads/blue-sky-anime-Wallpapers/4.12cfdcbb2320824919f1f1b119591d39.jpg")
    .setTitle(name) // Ensure this is a valid string
    .setDescription(internationalNumber)  // Ensure this is a valid string
    .setBorder("#000000")
    .setAvatarBorder("#F0F8FF")
    .setOverlayOpacity(0.5)
    .build();

  let str = `
*User Profil*
👤 • *Username:* ${user.registered ? user.name : ''}
🏷 • *Status:* ${who.split`@`[0] == info.nomorown ? 'Developer' : user.premiumTime >= 1 ? 'Premium User' : user.level >= 1000 ? 'Elite User' : 'Free User'}
📮 • *Bio:* ${bio.status ? bio.status : bio}
📧 • *Tag:* @${who.replace(/@.+/, '')}
📞 • *Number:* ${internationalNumber}
🔗 • *Link:* https://wa.me/${who.split`@`[0]}
🎨 • *Age:* ${user.registered ? age : ''}

*RPG Profil*
🔧 • *Role:* ${role}
${rpg.emoticon('level')} • *Level:* ${level}
${rpg.emoticon('exp')} • *Exp:* ${exp}
${rpg.emoticon('money')} • *Money:* ${money}

🌟 • *Premium:* ${user.premiumTime > 0 ? "✅" : "❌"} ${user.premiumTime > 0 ? `
⏰ • *PremiumTime:*
${clockString(user.premiumTime - new Date() * 1)}` : ''}
📑 • *Registered:* ${user.registered ? '✅ ( ' + new Date(regTime) + ' )' : '❌'}

⻝ 𝗗𝗮𝘁𝗲: ${week} ${date}
⻝ 𝗧𝗶𝗺𝗲: ${wktuwib}
`.trim();

  let fkon = { 
    key: { 
      fromMe: false, 
      participant: `0@s.whatsapp.net`, 
      ...(m.chat ? { remoteJid: `status@broadcast` } : {}) 
    }, 
    message: { 
      'contactMessage': { 
        'displayName': name, 
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${name},;;;\nFN:${name},\nitem1.TEL;waid=${who.split('@')[0]}:${who.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 
        'jpegThumbnail': pp, 
        thumbnail: pp, 
        sendEphemeral: true 
      } 
    } 
  };

  await conn.sendMessage(m.chat, { image: image, caption: str }, { quoted: fkon });
}

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10;
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12;
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30;
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return ['┊ ', ye, ' *Years 🗓️*\n', '┊ ', mo, ' *Month 🌙*\n', '┊ ', d, ' *Days ☀️*\n', '┊ ', h, ' *Hours 🕐*\n', '┊ ', m, ' *Minute ⏰*\n', '┊ ', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('');
}

handler.help = ['profile'];
handler.tags = ['user'];
handler.command = /^(profile||me)$/i;
handler.daftar = true;

export default handler;