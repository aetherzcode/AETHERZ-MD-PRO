import fetch from 'node-fetch'
let handler = async(m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `Usage Example ${usedPrefix + command} elaina`
  try {
  let res = await(await fetch(API('lol', '/api/pixiv', { query: text }, 'apikey'))).json()
  let data = res.result.getRandom()
  let caption = `
*Title:* ${data.title}
*Id:* ${data.id}
`
  await conn.sendFile(m.chat, data.image, 'error.jpg', caption.trim(), m)
  } catch (e) {
  	throw 'Tidak Ditemukan'
  }
}
handler.help = ['pixiv <pencarian>']
handler.tags = ['aiv2', 'menuprem']
handler.command = /^pixiv$/i
handler.premium = true
handler.nsfw = true
export default handler