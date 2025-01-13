let handler = async (m, { conn, usedPrefix, command }) => {
		
			await conn.sendMessage(m.chat, { video: { url: dir[Math.floor(Math.random() * dir.length)] }, caption: `_nih_` }, { quoted: m })
	}

handler.help = ['storyanime']
handler.tags = ['anime']
handler.command = /^(stor(i|y)a?nime|a?nimestor(i|y))$/i
handler.limit = true

export default handler

const dir = [
'https://telegra.ph/file/0d4fb93951c620aacb229.mp4',
'https://g.top4top.io/m_2391c90iu1.mp4'
];