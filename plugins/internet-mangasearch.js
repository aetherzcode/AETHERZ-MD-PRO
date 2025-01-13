import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Judul Manganya Mana?\n\nContoh: \n${usedPrefix + command} majo no tabitabi`
  let res = await fetch(API('lol', '/api/manga', { query: text }, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let desc = json.result.description.replace(/<br>/gi, '')
  let teks = `乂 *Manga Search*

❃ *Title Romaji:* ${json.result.title.romaji} ${json.result.title.english ? `
❃ *Title English:* ${json.result.title.english}` : ''}

❃ *Format:* ${json.result.format} ${json.result.chapters == 'null' ? `
❃ *Chapters:* ${json.result.chapters}` : ''} ${json.result.status == 'null' ? `
❃ *Volume:* ${json.result.volumes}` : ''}
❃ *Genre:* ${json.result.genres}
❃ *Status:* ${json.result.status}
❃ *Source:* ${json.result.source} ${json.result.averageScore == 'null' ? `
❃ *Score:* ${json.result.averageScore}` : ''}

❃ *Deskripsion:* ${desc}
`
  await conn.sendFile(m.chat, json.result.coverImage.large, 'mangasearch.jpg', teks, m)
}
handler.help = ['mangasearch']
handler.tags = ['anime']
handler.command = /^mangasearch$/i
handler.limit = true
export default handler