import uploadImage from '../lib/uploadImage.js'
import axios from 'axios'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply(`Kirim/Balas Foto Dengan Caption ${usedPrefix + command}`)
    if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`*Format ${mime} tidak didukung!*`)
    m.reply(wait)
    let img = await q.download()
    let url = await uploadImage(img)
    let anime = await axios.get(API('rose', '/image/stable/prompter', { url: url }, 'apikey'))
    await m.reply(anime.data.result.prompt)
}
handler.help = ['prompt']
handler.tags = ['tools']
handler.command = /^(prompt)$/i
handler.limit = true
handler.onlyprem = true
export default handler