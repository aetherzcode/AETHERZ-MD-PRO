import { createHash } from 'crypto'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
    // Nama
    let namae = conn.getName(m.sender)
    // Database 
    let user = global.db.data.users[m.sender]
    // Profil
    const pp = await conn.profilePictureUrl(m.sender, "image").catch((_) => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg")
    // Memeriksa pengguna
    if (user.registered === true) throw `Anda sudah terdaftar dalam Database, Apakah Anda ingin mendaftar ulang? */unreg*`
    // Membuat OTP
    let otp = Math.floor(10000 + Math.random() * 90000)
    // Menyimpan OTP ke data pengguna
    user.otp = otp.toString()
    user.otpExpiry = Date.now() + 5 * 60 * 1000 // OTP berlaku selama 5 menit
    
    // Cek apakah pesan dipicu dari grup atau pesan pribadi
    if (m.isGroup) {
        // Jika pesan dipicu dari grup, kirim OTP ke pesan pribadi pengguna
        await conn.sendMessage(m.sender, {
            text: `OTP Anda untuk registrasi adalah: ${otp}`,
            contextInfo: {
                externalAdReply: {
                    title: 'OTP', // Menggunakan judul yang diberikan (wm)
                    body: '(One-Time Password)', // Menggunakan isi pesan yang diberikan (author)
                    thumbnailUrl: 'https://telegra.ph/file/a325935a4e310b3bc89c2.png', // Menggunakan gambar profil pengguna sebagai thumbnail
                    mediaType: 1, // Jenis media (gambar)
                    renderLargerThumbnail: true // Menampilkan thumbnail yang lebih besar
                }
            }
        })
        // Tambahkan teks respons di grup
        await conn.reply(m.chat, `OTP telah dikirimkan ke pesan pribadi Anda. Silakan periksa.`, m)
    } else {
        // Jika pesan dipicu dari pesan pribadi, kirim pesan OTP langsung
        await conn.sendMessage(m.sender, {
            text: `OTP Anda untuk registrasi adalah: ${otp}`,
            contextInfo: {
                externalAdReply: {
                    title: 'OTP', // Menggunakan judul yang diberikan (wm)
                    body: '(One-Time Password)', // Menggunakan isi pesan yang diberikan (author)
                    thumbnailUrl: 'https://telegra.ph/file/a325935a4e310b3bc89c2.png', // Menggunakan gambar profil pengguna sebagai thumbnail
                    mediaType: 1, // Jenis media (gambar)
                    renderLargerThumbnail: true // Menampilkan thumbnail yang lebih besar
                }
            }
        })
    }
    
    // Pesan verifikasi
    await conn.sendMessage(m.sender, { text: `
• Silakan masukkan OTP dengan cara ketik *.vercode* <number>
• Kode OTP berlaku selama 5 menit
• Jangan berikan kode atau menyebarkan kode OTP kepada orang asing` })
}

handler.help = ['otp'];
handler.tags = ['main'];
handler.command = /^(otp)$/i;

export default handler
