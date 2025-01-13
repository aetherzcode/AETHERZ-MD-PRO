let handler = async (m, { conn, command, args, usedPrefix }) => {
    let users = global.db.data.users[m.sender]
    let time = users.lastkerja + 300000
    let __timers = (new Date - users.lastkerja)
    let _timers = (0 - __timers)
    let timers = clockString(_timers)
    let pekerjaanList = ['benteng', 'pertanian', 'camtoop', 'pertambangan', 'rumahsakit']

    switch (command) {
        case 'bangun':
            if (args.length === 0) {
                return m.reply(`List Pekerjaan yang tersedia:\n\n${pekerjaanList.map(p => `• ${p}`).join('\n')}\n\nContoh Penggunaan: ${usedPrefix}bangun benteng`)
            }
            if (new Date - users.lastkerja < 300000) throw `Kamu sudah bekerja, Saatnya istirahat selama ${clockString(time - new Date())}`
            let bangunan = args[0].toLowerCase()
            if (!pekerjaanList.includes(bangunan)) {
                return m.reply('Pekerjaan bangunan yang Anda pilih tidak valid.')
            }
            let hasilMoney = Math.floor(Math.random() * 150000)
            let hasilExp = Math.floor(Math.random() * 50) // Random exp points
            m.reply(`Kamu baru saja membangun *${bangunan.charAt(0).toUpperCase() + bangunan.slice(1)}* 🏰\nDan mendapatkan uang senilai *Rp ${hasilMoney} ${rpg.emoticon('money')}* dan *${hasilExp} exp*`).then(() => {
                users.money += hasilMoney
                users.exp += hasilExp // Adding experience points
                users.lastkerja = new Date * 1
            })
            break
        default:
            return m.reply(`_*Pilih Pekerjaan Yang Kamu Inginkan*_\n\n_• Bangun_ \n\nContoh Penggunaan :\n${usedPrefix}kerja Bangun`)
    }
}
handler.help = ['bangun']
handler.tags = ['rpg']
handler.command = /^bangun$/i

handler.register = true
handler.group = true
handler.rpg = true

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    console.log({ms,h,m,s})
    return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}
