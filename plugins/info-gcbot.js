let handler = async (m, { conn }) => {
conn.reply(m.chat, `
*Offcial Group*
${link.gc}

*Sosmed*
${link.ig}
`, m)
}
handler.help = ['gcbot']
handler.tags = ['info']
handler.command = /^gcbot$/i

export default handler 
