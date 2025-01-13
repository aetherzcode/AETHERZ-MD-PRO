let { MessageType, Presence } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let room = Object.values(global.db.data.bots.anonymous).find(room => [room.a, room.b].includes(m.sender))
    if (!room) return m.reply('kamu tidak berada di anonymous chat')
    let other = m.sender === room.a ? room.b : m.sender === room.b ? room.a : ''
    var name
    if (text) name = text
    else name = conn.getName(m.sender)
    var number = who.split('@')[0]
    let tks = `
➔ Nomor: ${m.sender.split`@`[0]}
➔ Nama: ${name}
`.trim()
    conn.reply(m.chat, 'Menggirimkan Kontak...', null)
    if (other) conn.reply(other, `Partner mengirimkan kontak kepadamu`, null)
    if (other) conn.reply(other, tks, null)
    conn.reply(m.chat, `Berhasil mengirim kontak ke @${other.split('@')[0]}`, null, { mentions: [other] })
}
handler.help = ['sendkontak']
handler.tags = ['anonymous']
handler.command = /^(sendkontak)$/i
handler.private = true

export default handler