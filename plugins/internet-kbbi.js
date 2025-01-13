import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {

    if (!text) {
        return m.reply('*example*: .kbbi anime')
      }

  let res = await fetch(`https://api.lolhuman.xyz/api/kbbi?apikey=${global.lol}&query=${encodeURIComponent(text)}`)
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (json.result) {
    let { nama, makna } = json.result[0]
    let text = `Kata: ${nama}\n\n`
    for (let i = 0; i < makna.length; i++) {
      let { submakna, contoh } = makna[i]
      text += `Makna ${i + 1}: ${submakna.join(', ')}\n`
      if (contoh && contoh.length) {
        text += `contoh: ${contoh.join(', ')}\n\n`
      } else {
        text += '\n'
      }
    }
    let img = 'https://telegra.ph/file/721b0a18f7bb676e8afc4.jpg'
    conn.sendMessage(m.chat, {
		react: {
			text: '♻️',
			key: m.key,
		}
	})
    await conn.sendFile(m.chat, img, 'kbbi.jpg', text, m, false, { thumbnail: Buffer.alloc(0) })
  } else throw json.message
}

handler.help = ['kbbi *⧼teks⧽*']
handler.tags = ['internet']
handler.command = /^(kbbi)$/i
handler.register = true
handler.premium = false
handler.limit = true

export default handler