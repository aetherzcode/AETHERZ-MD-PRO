let handler = async (m, { conn, usedPrefix }) => {
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    if (!(who in global.db.data.users)) return m.reply(`User ${who} not in database`)
	let user = global.db.data.users[who]
	let ndy = `
*@${who.replace(/@.+/, '')} Memiliki ${user.warning} warning*
 `.trim()
	conn.reply(m.chat, ndy, m, { mentions: [who] })
}

handler.help = ['cekwarn']
handler.tags = ['info']
handler.command = /^(cekwarn)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
