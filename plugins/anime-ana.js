import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://api.zahwazein.xyz/randomanime/v2/ana?apikey=zenzkey_ab72cdd5af82'
	conn.sendFile(m.chat, url, null, 'ana', m)
}
handler.command = /^(ana)$/i
handler.tags = ['anime']
handler.help = ['ana']
handler.limit = true
export default handler
