import { sticker } from '../lib/sticker.js'

const cooldown = new Map()

let handler = async (m, { conn, args }) => {
    const user = m.sender
    const quo = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null
    
    if (!quo) return m.reply("[❗] input/reply teks")

    if (cooldown.has(user)) {
        const lastTime = cooldown.get(user)
        const elapsed = (Date.now() - lastTime) / 1000

        if (elapsed < 10) {
            const attempts = db.data.users[user]?.attempts || 0
            db.data.users[user] = { ...(db.data.users[user] || {}), attempts: attempts + 1 }

            if (db.data.users[user].attempts >= 3) {
                db.data.users[user].banned = true
                return m.reply("[❗] Anda telah dibanned karena spam!")
            }

            return m.reply(`[❗] Tunggu ${10 - Math.floor(elapsed)} detik sebelum menggunakan perintah ini lagi.\n\n[ note ]\nJika anda spam fitur ini 3x dalam masa cooldown, maka kamu akan dibanned dari bot!`)
        }
    }

    cooldown.set(user, Date.now())
    if (db.data.users[user]?.attempts) db.data.users[user].attempts = 0

    let url = await sticker(null, `https://kepolu-brat.hf.space/brat?q=${quo}`, global.packname, global.author)
    conn.sendFile(m.chat, url, 'sticker.webp', quo, m)
}

handler.help = ['brat3']
handler.tags = ['sticker']
handler.command = /^(brat3)$/i
export default handler