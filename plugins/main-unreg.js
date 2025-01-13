import { createHash } from 'crypto'
import fs from 'fs'

let handler = async function (m, { args, usedPrefix, command, conn }) {
    let msg = 'Pesan default'
    let wm = 'Watermark default'
    let link = { web: 'URL default' }

    if (!args[0]) throw `📮Serial Number kosong, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`

    let user = global.db.data.users[m.sender]
    let sn = createHash('md5').update(m.sender).digest('hex')

    if (args[0] !== sn) throw `🚫Serial Number salah!, Silahkan Cek Serial Number Di\n${usedPrefix}ceksn`

    user.registered = false
    user.unreg = true

    conn.reply(m.chat, '📛 _Kamu Berhasil keluar dari database AETHERZ-MD_', m, {
        contextInfo: {
            externalAdReply: {
                title: 'ＡＫＳＥＳ ＤＩＴＯＬＡＫ',
                body: wm,
                sourceUrl: link.web,
                thumbnail: fs.readFileSync('./media/denied.jpg')
            }
        }
    })
}

handler.help = ['unreg']
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true

export default handler
