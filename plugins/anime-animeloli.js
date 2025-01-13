import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://api-fgmods.ddns.net/api/img/loli?apikey=3b407ca7'
		conn.sendFile(m.chat, url, null, 'Random Anime-loli', m)
		}
handler.help = ['animeloli']
handler.tags = ['anime']
handler.command = /^(animeloli)$/i

handler.limit = true

export default handler