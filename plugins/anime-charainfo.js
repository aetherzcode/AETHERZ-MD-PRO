import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan Nama Characternya!\n\nContoh: ${usedPrefix + command} Rimuru`
  try {
  let res = await fetch(API('lol', '/api/character', { query: text }, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let charaingfo = `乂 *Character ${text}*
  
🏷️ *Id Character:* ${json.result.id}
👤 *Name:* ${json.result.name.full}
✏️ *Native:* ${json.result.name.native}
🎨 *Character Info:* 
${json.result.description ? json.result.description : 'No Info'}
🌟 *Favourites:* ${json.result.favourites}
`.trim()
  conn.sendFile(m.chat, json.result.image.large, 'error.jpg', charaingfo, m)
 } catch {
  m.reply('Tidak Ditemukan... :(\nMungkin Coba kata kunci lain?')
 }
}
handler.help = ['character']
handler.tags = ['anime']
handler.limit = true
handler.command = /^(character|chara)$/i
//kyaa jangan biarkan wabot-aq terbengkalai sampai nurutomo kembali
// Command - Re Edited -- TOXIC-DEVIL == || Character Type ||
export default handler 