import uploadImage from '../lib/uploadImage.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Fotonya Mana? Reply gambar yg gk ada button aja'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`
  m.reply(wait)
  let img = await q.download?.()
  let url = await uploadImage(img)
  let out = API('rose', '/image/unblur', { url: url }, 'apikey')
  let caption = `Ini Dia Hasilnya Kak`
await conn.sendFile(m.chat, out, 'error.jpg', caption, m)
}
handler.help = ['unblur']
handler.tags = ['tools']
handler.command = /^(unblur)$/i
handler.limit = true
export default handler