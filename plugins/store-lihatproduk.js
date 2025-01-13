let handler = async (m, { conn, command, usedPrefix, text }) => {
  global.db.data.users[m.sender].catatan =
    global.db.data.users[m.sender].catatan || [];
  let i = 0;
  
  if (global.db.data.users[m.sender].catatan.length == 0)
    return m.reply("Kamu belum punya produk!");

  let txt = "List Produk 🛍️\n\n";
  for (let ct in global.db.data.users[m.sender].catatan) {
    i += 1;
    txt +=
      `⌜${i}⌟ ${global.db.data.users[m.sender].catatan[ct].title}\n`;
  }

  if (text.length == 0) {
    return conn.reply(
      m.chat,
      `${txt}\nPenggunaan: ${usedPrefix}lihatproduk 1\nHapus Produk: ${usedPrefix}hapusproduk 1`
    );
  }

  let catatan = global.db.data.users[m.sender].catatan;
  let split = text.split("|");
  
  if (catatan.length == 0) return m.reply("Kamu belum memiliki produk!");
  let n = Number(split[0]) - 1;

  let isi =
    global.db.data.users[m.sender].catatan[n] != undefined
      ? global.db.data.users[m.sender].catatan[n].isi
      : "produk tidak ditemukan!";

  conn.reply(m.chat, `${isi}`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text),
    },
  });
};

handler.help = ["lihatproduk <title>"];
handler.tags = ["store"];
handler.command = /^lihatproduk$/i;
handler.group = false
export default handler;
