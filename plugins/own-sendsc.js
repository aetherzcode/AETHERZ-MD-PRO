import fs from 'fs'

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} index.js`
	if (!text) return m.reply(input)
				var no = text.split('|')[0]
				var file = text.split('|')[1]
				if (!no) return m.reply(`nomor nya banh`)
				if (!file) return m.reply(`nama filenya apa banh?`)
				var user_bot = await fs.readFileSync(`./${file}`)
				conn.sendMessage(no + '@s.whatsapp.net', {
					document: user_bot,
					caption: 'Hai kak ni sc yg kamu beli',
					mimetype: 'document/application',
					fileName: `${file}`
				})
m.reply('success sending file to ' + no)
}
handler.help = ['sendsc']
handler.tags = ['owner']
handler.command = /^(sendsc)$/i
handler.rowner = true

export default handler