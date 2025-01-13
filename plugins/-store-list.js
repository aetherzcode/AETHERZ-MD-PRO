let handler = async (m, { conn, usedPrefix, command, groupMetadata }) => {
	let msgs = db.data.chats[m.chat].listStr
	let msg = (Object.entries(db.data.chats[m.chat].listStr).map(([nama, isi]) => { return { nama, ...isi } })).map(v => v.nama)
	let teks = msg.map(v => {
            return `
${v}
`.trim()
        }).filter(v => v).join('\n')
	if (msg[0]) return await m.reply(`乂 Akses List Dengan Cara Mengetik Namanya\n*Contoh:*\n${msg[0]}\n\n乂 List Yang Ada Di Group Ini:\n${teks}`)
	else throw `\nBelum Ada List Yang Ditambahkan Admin\nketik *${usedPrefix}addlist <text>* untuk menambahkan daftar menu.\n`
}
handler.help = ['store'].map(v => 'list' + v)
handler.tags = ['store', 'group']
handler.command = /^list(store|shop)?$/i
handler.group = true
export default handler


/**
 * Jangan di hapus
 *
 * Buatan FokusDotId (Fokus ID)
 * https://github.com/fokusdotid
 *
 */