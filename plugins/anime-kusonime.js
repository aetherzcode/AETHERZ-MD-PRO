import fetch from 'node-fetch'
let handler = async function (m, { conn, text, usedPrefix, command }) {
  try {
  if (!text) throw `Mau Cari Anime Apa?\n\nContoh: ${usedPrefix + command} The Wandering Witch`
  await m.reply(global.wait)
  let res = await fetch(`https://api.lolhuman.xyz/api/kusonimesearch?apikey=${lolkey}&query=${text}`)
  let res2 = await fetch(`https://api.lolhuman.xyz/api/kusonimesearch2?apikey=RyHar&query=${text}`)
  let json = await res.json()
  let json2 = await res2.json()
  let teks = `
🔎 *Judul:* ${json.result.title}
🔖 *Genre:* ${json.result.genre}
📡 *Status:* ${json.result.status}
🖥 *Type:* ${json.result.type}

⏱️ *Durasi:* ${json.result.duration}
🌟 *Rating:* ${json.result.score}

🎞 *Link Streaming:* ${json2.result[0].link}

📋 *Deskripsion:* ${json.desc}
`
    conn.sendFile(m.chat, await (await fetch(json.result.thuconnmbnail)).buffer(), 'kusonime.jpg', teks, m);
  } catch (e) {
  	throw 'Judul Tidak Ditemukan'
  }
}
handler.help = ['kusonime']
handler.tags = ['anime']
handler.command = /^kusonime$/i

handler.limit = true

export default handler