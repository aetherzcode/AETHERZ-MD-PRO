import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, { conn, usedPrefix, command }) => {
    const notStickerMessage = `Reply sticker with command *${usedPrefix + command}*`
    //m.reply(wait)
    if (!m.quoted) throw notStickerMessage
    const q = m.quoted || m
    let mime = q.mediaType || ''
    if (!/sticker/.test(mime)) throw notStickerMessage
    let media = await q.download()
    let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
    await conn.sendFile(m.chat, out, 'out.png', '*DONE (≧ω≦)ゞ*', m)
}
handler.help = ['toimg2 <reply sticker>']
handler.tags = ['sticker']
handler.command = ['toimg2', 'toimage2']

export default handler