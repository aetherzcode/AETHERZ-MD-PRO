let handler = async (m, { conn, args, usedPrefix }) => {
let response = args.join(' ').split('|')
  if (!args[0]) throw `Usage Example ${usedPrefix}pornhub Teks1|Teks2`
  m.reply('Proses...')
  let res = API('lol', '/api/textprome2/pornhub', { text1: response[0], text2: response[1] }, 'apikey')
  conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia...', m, false)
}
handler.help = ['pornhub'].map(v => v + ' <text1>|<teks2>')
handler.tags = ['maker']
handler.command = /^(pornhub)$/i

handler.limit = true

export default handler