import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Balas Gambar Dengan Caption\n${usedPrefix + command}`
    await m.reply(wait)
    let img = await q.download()
    let url = await uploadImage(img)
    let meme = API('https://api.lolhuman.xyz', '/api/creator1/jail', { img: url }, 'apikey')
    let stiker = await sticker(false, meme, stickpack, stickauth)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, null)
}
handler.help = ['jail']
handler.tags = ['sticker']
handler.command = /^(jail)$/i
handler.limit = true
export default handler