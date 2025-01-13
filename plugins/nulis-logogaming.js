let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Masukan Format Dengan Benar!\n\nExample\n${usedPrefix + command} Ruok`)
  let res = API('https://api.lolhuman.xyz', '/api/ephoto1/logogaming', { text: text }, 'apikey')
  conn.sendFile(m.chat, res, 'gaming.jpg', 'Ini Dia Kak', m)
}
handler.help = ['logogaming']
handler.tags = ['menuprem']
handler.command = /^(logogaming)$/i
handler.premium = true
export default handler
