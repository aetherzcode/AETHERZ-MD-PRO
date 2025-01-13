let handler = async(m, { conn, command, usedPrefix, text }) => {
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || [];
  let i = 0;
  if (global.db.data.users[m.sender].catatan.length == 0) return m.reply('Kamu belum punya produk!');
  let txt = '🗒️ List Produk 🗒️\n\n';
  
  for (let ct in global.db.data.users[m.sender].catatan) {
    i += 1;
    txt += '[' + i + ']. ' + global.db.data.users[m.sender].catatan[ct].title + '\n';
  }
  
  txt += `\nPenggunaan: ${usedPrefix}hapusproduk 1`;
  if (text.length == 0) return m.reply(txt);
  
  let catatan = global.db.data.users[m.sender].catatan;
  let split = text.split('|');
  
  if (catatan.length == 0) return m.reply('Kamu belum memiliki Produk!');
  let n = Number(split[0]) - 1;
  
  if (catatan[n] == undefined) return m.reply('Produk tidak ditemukan!');
  
  let tmp = [];

  for (let ct in catatan) {
    if (ct != n) {
      tmp.push(catatan[ct]);
    } else {
      continue;
    }
  }

  let cdang = global.db.data.users[m.sender].catatan; // Define cdang here
  global.db.data.users[m.sender].catatan = tmp;

  conn.reply(m.chat, `Berhasil menghapus produk!!`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  });
};

handler.help = ['hapusproduk title'];
handler.tags = ['store'];
handler.command = /^hapusproduk$/i;
handler.group = true;
handler.owner = true;
export default handler;
