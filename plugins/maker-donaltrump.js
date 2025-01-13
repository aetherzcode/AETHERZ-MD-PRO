let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Masukan Format Dengan Benar!\n\nExample\n${usedPrefix + command} Donal Trump`)
  let res = API('https://api.lolhuman.xyz', '/api/tweettrump', { text: text }, 'apikey')
  conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
}
handler.help = ['donaldtrumptweet']
handler.tags = ['maker']
handler.command = /^(donaldtrumptweet)$/i
handler.limit = true
export default handler