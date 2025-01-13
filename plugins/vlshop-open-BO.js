let handler = async (m, { conn }) => {
    let __timers = (new Date - global.db.data.users[m.sender].lastmisi)
    let _timers = (120000 - __timers)
    let order = global.db.data.users[m.sender].ojekk
    let timers = clockString(_timers)
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    let id = m.sender
    let kerja = 'open-BO'
    conn.misi = conn.misi ? conn.misi : {}
    if (id in conn.misi) {
        conn.reply(m.chat, `Selesaikan Misi ${conn.misi[id][0]} Terlebih Dahulu`, m)
        throw false
    }
    if (new Date - user.lastmisi > 120000) {
        let randomaku1 = Math.floor(Math.random() * 1000000)
        let randomaku2 = Math.floor(Math.random() * 10000)
        
        var dimas = `
Kamu Mendapatkan Pelanggan Dan Pergi Ke Hotel 🏨
`.trim()

        var dimas2 = `
Kamu Mulai Melakukan Skidipapap Dengannya 
`.trim()

        var dimas3 = `
shhh ahhh fasterhhh baby mmaahh😋
`.trim()

        var dimas4 = `
Enak banget sayangggg 🥵🥺
`.trim()

        var dimas5 = `
aahhh dikit lagi keluar
    Crott💦💦💦
`.trim()

        var hsl = `
*—[ Hasil Open-BO* ${name} ]—*
➕ 💹 Uang = [ ${randomaku1} ]
➕ ✨ Exp = [ ${randomaku2} ]
➕ 😍 Order Selesai = +1
➕ 📥 Sisa Peju = ${order}
`.trim()

        user.money += randomaku1
        user.exp += randomaku2
        user.ojekk += 1
        
        conn.misi[id] = [
            kerja,
        setTimeout(() => {
            delete conn.misi[id]
        }, 27000)
        ]
        
        setTimeout(() => {
            m.reply(hsl)
        }, 27000)

        setTimeout(() => {
            m.reply(dimas5)
        }, 25000)

        setTimeout(() => {
            m.reply(dimas4)
        }, 25000)

        setTimeout(() => {
            m.reply(dimas3)
        }, 20000)

        setTimeout(() => {
            m.reply(dimas2)
        }, 15000)

        setTimeout(() => {
            m.reply(dimas)
        }, 10000)

        setTimeout(() => {
            m.reply('Kamu mencari pelanggan🔍..')
        }, 0)
        user.lastmisi = new Date * 1
    } else m.reply(`Silahkan Menunggu Selama ${timers}, Untuk *Ewe-paksa* Kembali`)
}
handler.help = ['open-BO']
handler.tags = ['vlshop','menuprem']
handler.command = /^(open-BO)$/i
handler.register = true
handler.group = true
handler.rpg = true
handler.premium = true
export default handler


function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}