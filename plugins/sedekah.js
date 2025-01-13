let handler = async(m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let now = new Date() // Waktu sekarang
    let lastClaim = user.lastClaim || 0 // Waktu terakhir kali klaim

    // Mengecek apakah sudah melewati 12 jam sejak klaim terakhir
    if (now - lastClaim >= 12 * 60 * 60 * 1000) { // 12 jam * 60 menit * 60 detik * 1000 milidetik
        m.reply(`Sukses Mendapatkan 50 Koin Gratis!`)
        user.koin += 50
        user.lastClaim = now
    } else {
        m.reply(`Anda sudah mengklaim koin gratis hari ini. Silahkan kembali lagi besok.`)
    }
}
handler.help = ['sedekah']
handler.tags = ['judi']
handler.command = /^sedekah$/i
handler.register = true
handler.group = false 
export default handler
