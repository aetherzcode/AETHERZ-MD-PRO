const items = [
  'money', 'bank', 'potion', 'trash', 'wood',
  'rock', 'string', 'petFood', 'emerald',
  'diamond', 'gold', 'iron', 'common',
  'uncommon', 'mythic', 'legendary', 'pet', 'chip',
  'anggur', 'apel', 'jeruk', 'mangga', 'pisang',
  'bibitanggur', 'bibitapel', 'bibitjeruk', 'bibitmangga', 'bibitpisang',
];

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];
  const item = items.filter(v => v in user && typeof user[v] == 'number');
  let lol = `Use format ${usedPrefix}${command} [type] [value] [number]
example ${usedPrefix}${command} money 9999 @6282389924047

📍 Transferable items
${item.map(v => `${rpg.emoticon(v)}${v}`.trim()).join('\n')}
`.trim();
  const type = (args[0] || '').toLowerCase();
  if (!item.includes(type)) return conn.reply(m.chat, lol, m);
  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1;
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
  let _user = global.db.data.users[who];
  if (!who) return m.reply('Tag salah satu, atau ketik Nomernya!!');
  if (!(who in global.db.data.users)) return m.reply(`User ${who} not in database`);
  if (user[type] * 1 < count) return m.reply(`Your *${rpg.emoticon(type)}${type}${special(type)}* is less *${count - user[type]}*`);
  let previous = user[type] * 1;
  let _previous = _user[type] * 1;
  user[type] -= count * 1;
  _user[type] += count * 1;

  if (previous > user[type] * 1 && _previous < _user[type] * 1) {
    await conn.sendMessage(m.chat, {
      text: `*––––『 𝚃𝚁𝙰𝙽𝚂𝙵𝙴𝚁 』––––*\n*📊 Status:* Succes\n*🗂️ Type:* ${type}${special(type)} ${rpg.emoticon(type)}\n*🧮 Count:* ${count}\n*📨 To:* @${(who || '').replace(/@s\.whatsapp\.net/g, '')}`,
      contextInfo: {
        externalAdReply: {
          title: 'Transfer Successful',
          body: 'INFORMASI',
          thumbnailUrl: global.aetherzjpg,
          sourceUrl: link.web,
          mediaType: 1,
          renderLargerThumbnail: true
        },
        mentionedJid: [who]
      }
    }, { quoted: m });
  } else {
    user[type] = previous;
    _user[type] = _previous;
    await conn.sendMessage(m.chat, {
      text: `*––––『 TRANSFER 』––––*\n*📊 Status:* Failed\n*📍 Item:* ${count} ${rpg.emoticon(type)}${type}${special(type)}\n*📨 To:* @${(who || '').replace(/@s\.whatsapp\.net/g, '')}`,
      contextInfo: {
        externalAdReply: {
          title: 'Transfer Failed',
          body: 'INFORMASI',
          thumbnailUrl: global.aetherzjpg,
          sourceUrl: link.web,
          mediaType: 1,
          renderLargerThumbnail: true
        },
        mentionedJid: [who]
      }
    }, { quoted: m });
  }
};

handler.help = ['transfer'].map(v => v + ' <type> <@tag>');
handler.tags = ['rpg'];
handler.command = /^(transfer|tf)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;

function special(type) {
  let b = type.toLowerCase();
  let special = (['common', 'uncommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '');
  return special;
}

function isNumber(x) {
  return !isNaN(x);
}
