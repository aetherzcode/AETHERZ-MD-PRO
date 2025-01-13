let handler = async(m, {conn, command, usedPrefix, text}) => {
  let fail = 'format salah, example: ' +usedPrefix+command+ ' dmff|100 dm Rp10k'
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || []
  let catatan = global.db.data.users[m.sender].catatan
  let split = text.split('|')
  let title = split[0]
  let isi = split[1]
  if (catatan.includes(title)) return m.reply('tidak tersedia!\n\nAlasan: Sudah digunakan')
  if (!title || !isi) return m.reply(fail)
  let cttn = {
    'title': title,
    'isi': isi
  }
  global.db.data.users[m.sender].catatan.push(cttn)
  conn.reply(m.chat, `berhasil dibuat!\nUntuk melihat Ketik: ${usedPrefix}lihatproduk`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  })
}

handler.help = ['addproduk <title|isi>']
handler.tags = ['store']
handler.command = /^addproduk$/i
handler.group = true
handler.owner = true
handler.admin = true
export default handler 