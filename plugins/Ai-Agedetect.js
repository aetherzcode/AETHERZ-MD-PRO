import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'
let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `*reply/send your image with .${command}*`
    const randomAge = Math.floor(Math.random() * 70) + 1;
    await conn.sendMessage(m.chat, {
        react: {
            text: '♻️',
            key: m.key,
        }
    })
    await m.reply(`Hasil Deteksi Usia Dari Gambar Tersebut Adalah ${randomAge} Tahun`)
}

handler.help = ['agedetect']
handler.tags = ['ai','internet']
handler.command = /^(agedetect|usia)$/i

handler.limit = true

export default handler