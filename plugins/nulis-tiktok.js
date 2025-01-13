import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [teks1, teks2] = text.split('|')
  if (!teks1 || !teks2) return m.reply(`Masukan Format Dengan Benar!\n\nExample\n${usedPrefix + command} Tiktok|Make`)
  let res = API('https://api.lolhuman.xyz', '/api/photooxy2/tiktok', { text1: teks1, text2: teks2 }, 'apikey')
  conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
}
handler.help = ['logotiktok'].map(v => v + ' <text1|text2>')
handler.tags = ['nulis']
handler.command = /^(logotiktok)$/i

handler.limit = true

export default handler