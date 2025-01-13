let handler = async (m, { conn, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = conn.getName(who)
  conn.sendFile(m.chat, pickRandom(vbokep), null, `Nih *${name}* 🌈🏳️‍🌈..`, m)
}
handler.help = ['lesbi']
handler.tags = ['menuprem','nsfw']
handler.command = /^(lesbi)$/i

handler.premium = true
handler.limit = false

handler.fail = null
handler.register = false

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const vbokep = [
 "https://telegra.ph/file/194cf2f56e6e08fd17fd0.jpg",
 "https://telegra.ph/file/358845019d74a8285bc50.jpg",
 "https://telegra.ph/file/8ece5078032de7e5eaaf8.jpg",
 "https://telegra.ph/file/ca5f504f658e69b1ec2e8.jpg",
 "https://telegra.ph/file/12905438b8597c8591211.jpg",
 "https://telegra.ph/file/3cd4711021cd5d937c279.jpg",
 "https://telegra.ph/file/4ba711fbd73cc7729a621.jpg",
 "https://telegra.ph/file/af029472c3fcf859fd281.jpg",
 "https://telegra.ph/file/0e5be819fa70516f63766.jpg",
 "https://telegra.ph/file/29146a2c1a9836c01f5a3.jpg",
 "https://telegra.ph/file/85883c0024081ffb551b8.jpg",
 "https://telegra.ph/file/d8b79ac5e98796efd9d7d.jpg",
 "https://telegra.ph/file/267744a1a8c897b1636b9.jpg",
 ]
