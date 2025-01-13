//import db from '../lib/database.js'
import { canLevelUp } from '../lib/levelling.js'

export async function before(m, { conn }) {
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}

    let user = global.db.data.users[m.sender]
    if (!user.autolevelup)
        return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++
    if (before !== user.level) {
        let bkp =(`
*「 LEVEL UP 」*

➤ *Name*: *${user.registered ? user.name : conn.getName(m.sender)}* 
➤ *XP*: *${user.exp}*
➤ *Level:* *${before}* -> *${user.level}*
➤ *Role:* *${user.role}*
 
Note: Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu
	`)
	conn.reply(m.chat, bkp, m, {quoted:fkontak})
    }
}