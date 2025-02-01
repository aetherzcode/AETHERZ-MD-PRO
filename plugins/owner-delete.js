let handler = async (m, { conn, isOwner, isAdmin }) => {
	if (!m.quoted) throw false
	let { chat, fromMe } = m.quoted
	let charm = global.db.data.chats[m.chat]
	if (!fromMe) {
		if (isOwner || isAdmin) {
			try {
				if ((!charm.nsfw && m.isGroup) || isOwner) {
					conn.sendMessage(chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender } })
				} else {
					m.reply(`Tidak dapat hapus pesan saat *nsfw* aktif!`)
				}
			} catch (e) {
				console.log(e)
			}
		} else {
			m.reply(`*「ADMIN GROUP ONLY」*`)
		}
	} else {
		try {
			if ((!charm.nsfw && m.isGroup) || isOwner) {
				conn.sendMessage(chat, { delete: m.quoted.vM.key })
			} else {
				m.reply(`Tidak dapat hapus pesan saat *nsfw* aktif!`)
			}
		} catch (e) {
			console.log(e)
		}
	}
}

handler.menu = ['dlc', 'deletechat']
handler.tags = ['tools']
handler.command = /^(dlc|deletechat|dc)$/i
handler.rowner = true
export default handler