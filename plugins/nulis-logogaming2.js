let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Masukan Format Dengan Benar!\n\nExample\n${usedPrefix + command} Saya Gaming`)
  let res = API('https://api.lolhuman.xyz', '/api/ephoto1/fpslogo', { text: text }, 'apikey')
  conn.sendFile(m.chat, res, 'logogaming2.jpg', `Sudah Jadi`, m, false)
}
handler.help = ['logogaming2'].map(v => v + ' <text>')
handler.tags = ['menuprem']
handler.command = /^(logogaming2)$/i
handler.premium = true
export default handler
