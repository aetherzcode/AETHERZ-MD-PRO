/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
let handler = async (m, { conn, args, command }) => {
    let isClose = { 
        'open': 'not_announcement',
        'close': 'announcement',
    }[(args[0] || '')]
    if (isClose === undefined)
        throw `
*Format Salah! Contoh :*
  *${usedPrefix + command} close*
  *${usedPrefix + command} open*
`.trim()
    await conn.groupSettingUpdate(m.chat, isClose)
    const user = m.sender ? await conn.getName(m.sender) : 'admin'
    const serverTime = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) // Waktu server di Asia/Jakarta
    const dateFormat = serverTime.split(',')[0]
    const timeFormat = serverTime.split(',')[1].trim()
    const notification = isClose === 'announcement' ? `*GROUP CLOSE*\n\nGrup telah ditutup oleh ${user}\n\n🚫 Group Closed\n📅 ${dateFormat}\n⌚ ${timeFormat}` : `*GROUP OPEN*\n\nGrup telah dibuka oleh ${user}\n\n💐 Group Open\n📅 ${dateFormat}\n⌚ ${timeFormat}`
    conn.reply(m.chat, notification, null, m)
}

handler.help = ['group *open / close*']
handler.tags = ['group', 'adminry']
handler.command = /^(g|group)$/i
handler.admin = true
handler.botAdmin = true

export default handler