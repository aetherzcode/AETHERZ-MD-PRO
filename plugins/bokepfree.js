let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `
     bjir tobat bro🗿!
`.trim()

conn.fakeReply(m.chat, info, '0@s.whatsapp.net', 'agak laen kau ini', 'status@broadcast')
}
handler.help = ['bokepfree']
handler.tags = ['menuprem']
handler.command = /^(bokepfree)$/i
export default handler 
