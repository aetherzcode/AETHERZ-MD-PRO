let handler = async (m, { conn, command, usedPrefix, text }) => {
  global.db.data.users[m.sender].ultah = global.db.data.users[m.sender].ultah || [];

  if (global.db.data.users[m.sender].ultah.length === 0) {
    return m.reply('Kamu belum punya daftar ulang tahun!');
  }

  let txt = '🎂 Daftar Ultah 🎂\n\n';

  for (let i = 0; i < global.db.data.users[m.sender].ultah.length; i++) {
    txt += `[${i + 1}]. ${global.db.data.users[m.sender].ultah[i].title}\n`;
  }

  txt += `\nPenggunaan: ${usedPrefix}hapusultah 1`;

  if (text.length === 0) {
    return m.reply(txt);
  }

  let ultah = global.db.data.users[m.sender].ultah;
  let split = text.split('|');

  if (ultah.length === 0) {
    return m.reply('Kamu belum memiliki daftar ultah!');
  }

  let n = Number(split[0]) - 1;

  if (ultah[n] === undefined) {
    return m.reply('Tidak ditemukan!');
  }

  let tmp = ultah.filter((_, ct) => ct !== n);

  global.db.data.users[m.sender].ultah = tmp;

  conn.reply(m.chat, `Berhasil menghapus!!`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text),
    },
  });
};

handler.help = ['hapusultah title'];
handler.tags = ['fun'];
handler.command = /^hapusultah$/i;

export default handler;

