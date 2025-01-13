let handler = async (m, { conn, args, usedPrefix, command }) => {
  let teks = args.join(' ').split('|')
  if (!teks[0] || !teks[1] || !teks[2]) throw `Masukan Text Nya!\n\nContoh\n${usedPrefix + command} Teks 1|Teks 2|Teks 3`
  let res = API('https://api.lolhuman.xyz', '/api/gsuggest', { text1: teks[0], text2: teks[1], text3: teks[2] }, 'apikey')
  conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
}
handler.help = ['googlesugest']
handler.tags = ['maker']
handler.command = /^(googlesugest)$/i
handler.limit = true
export default handler