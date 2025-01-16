let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, "Harap mengetag user!", m)  
  let no = text.trim().replace(/@.+/, '') 
  let rndm = Math.floor(Math.random() * 10) + 1  
  await conn.reply(m.chat, `Ukuran manuk @${no} ${rndm}Cm`, m, { contextInfo: { mentionedJid: [no + "@s.whatsapp.net"] }})
}

handler.help = ["cekpenis @tags"]
handler.tags = ["group"]
handler.command = /^(cekpenis)$/i
handler.group = false

export default handler