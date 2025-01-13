let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukan Text Nya!\n\nContoh\n${usedPrefix + command} Raja Iblis`
  let res = API('https://api.lolhuman.xyz', '/api/tweettrump', { text: text }, 'apikey')
  conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
}
handler.help = ['dttweet']
handler.tags = ['maker']
handler.command = /^(dttweet)$/i
handler.limit = true
export default handler