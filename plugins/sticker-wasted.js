import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Gambar Yang Anda Masukan Tidak Didukung`
    await m.reply(wait)
    let img = await q.download()
    let url = await uploadImage(img)
    let meme = API('https://api.lolhuman.xyz', '/api/editor/wasted', { img: url }, 'apikey')
    let stiker = await sticker(false, meme, stickpack, stickauth)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, null)
}
handler.help = ['wasted']
handler.tags = ['sticker']
handler.command = /^(wasted)$/i
handler.limit = true
export default handler