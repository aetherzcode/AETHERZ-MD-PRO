import fs from 'fs'
let handler = async (m, { conn, usedPrefix }) => {
	let payi = `
╭─「 • *ᴘᴜʟꜱᴀ* • 」
│ • ${pay.pulsa}
╰─────

╭─「 • *ᴇ-ᴡᴀʟʟᴇᴛ* • 」
│ • *ᴅᴀɴᴀ*  ${pay.dana}
│ • *ɢᴏᴘᴀʏ*  ${pay.gopay}
│ • *ᴏᴠᴏ*   ${pay.ovo}
╰─────

`
await conn.sendFile(m.chat, fs.readFileSync('./media/qris.jpg'), 'qris.jpg', payi, m)
}
handler.command = /^(pay|payment|bayar|donasi)$/i
handler.tags = ['info']
handler.help = ['payment','donasi']
export default handler
