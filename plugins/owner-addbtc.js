import fs from "fs"

let handler = async (m, { conn, args, command }) => {
    if (!m.mentionedJid) return m.reply('Tag pengguna yang ingin dimodifikasi BTC-nya.')
    
    let mentionedJid = m.mentionedJid[0]
    if (!(mentionedJid in global.db.data.users)) return m.reply(`Pengguna ${mentionedJid} tidak ditemukan dalam database`)
    
    let user = global.db.data.users[mentionedJid]
    
    switch (command) {
        case 'addbtc':
            if (isNaN(args[1])) return m.reply('Jumlah yang Anda masukkan bukan angka.')
            
            let amount = parseInt(args[1])
            user.btc = (user.btc || 0) + amount
            
            const addCaption = `
▧「 *TAMBAH BTC* 」
│ 👤 Nama: ${user.registered ? user.name : conn.getName(m.sender)}
│ 💰 BTC: ${user.btc}
└────···
`.trim()

            await conn.adReply(m.chat, addCaption, '', '', fs.readFileSync('./media/thumbnail.jpg'), '', m)
            break
        
        case 'resetbtc':
            user.btc = 0

            const resetCaption = `
▧「 *RESET BTC* 」
│ 👤 Nama: ${user.registered ? user.name : conn.getName(m.sender)}
│ 💰 BTC: ${user.btc}
└────···
`.trim()

            await conn.adReply(m.chat, resetCaption, '', '', fs.readFileSync('./media/thumbnail.jpg'), '', m)
            break
        
        default:
            return m.reply('Perintah tidak dikenal.')
    }

    global.db.data.users[mentionedJid] = user
    fs.writeFileSync('./database.json', JSON.stringify(global.db))
}

handler.help = ['addbtc @taguser jumlah', 'resetbtc @taguser']
handler.tags = ['rpg']
handler.command = /^(addbtc|resetbtc)$/i

handler.register = true
handler.group = true
handler.rpg = true
handler.owner = true;

export default handler