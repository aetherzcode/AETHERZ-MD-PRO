import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {

let pp = await conn.profilePictureUrl(m.sender, 'image')

 const anu = {
	"key": {
		"fromMe": false,
		"participant": "0@s.whatsapp.net",
		"remoteJid": "0@s.whatsapp.net"
	},
	"message": {
		"groupInviteMessage": {
			"groupJid": "6282389924037-1610340626@g.us",
			"inviteCode": "mememteeeekkeke",
			"groupName": "Purple Ocean", 
            "caption": "Jangan nyerah dulu ya! Kamu masih punya masa depan yang penuh harapan.", 
            'jpegThumbnail': await ( await fetch(pp)).buffer()
		}
	}
}
conn.sendMessage(m.chat, { text: wm} , { quoted: anu })
}


handler.help = ['fgc']

handler.tags = ['nocategory']

handler.command = /^fgc$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

export default handler
