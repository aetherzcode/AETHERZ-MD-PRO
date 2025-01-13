import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix }) => {
if (!text) throw `Example ${usedPrefix}nulis Teks Yang Ingin Kamu Tulis`
let kertas = `https://api.lolhuman.xyz/api/nulis?apikey=GataDios&text=${text}`
await conn.sendFile(m.chat, kertas, 'error.jpg', 'Lain Kali Nulis Sendiri...', m)
}
handler.help = ['n'].map(v => v + 'ulis3 <teks>')
handler.tags = ['nulis']
handler.command = /^nulis2$/i
export default handler
// BY MFARELS
// https://GitHub.com/MFarelS/