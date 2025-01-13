import fetch from 'node-fetch'
let handler = async (m, { text, conn, usedPrefix,  command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let aku
try {
    aku = await conn.profilePictureUrl(who, "image")
	} catch (e) {
	aku = "https://telegra.ph/file/e47d9ec693e5288ad9382.jpg"
	}
	
if (!text) throw `miku Hello open ai character can?`
let ayaka = await fetch(`https://api-charaai.vercel.app/charaai?chara=Miku&text=${text}`)
let hasil = await ayaka.json()
 let awe = `${hasil}`.trim()
conn.sendMessage(m.chat, {
text: awe,
contextInfo: {
externalAdReply: {
title: 'Ai - Miku',
body: `By ${wm}`,
thumbnailUrl: global.aetherzjpg,
sourceUrl: global.web,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
handler.help = ['aimiku']
handler.tags = ['aiv2']
handler.command = /^(mikuai|aimiku)$/i
export default handler