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
    // Memeriksa apakah ada OTP yang disimpan
    if (!user.otp || !user.otpExpiry) throw 'Anda belum meminta OTP. Gunakan perintah .otp untuk mendapatkan OTP.'
    // Memeriksa apakah OTP telah kedaluwarsa
    if (Date.now() > user.otpExpiry) throw 'Waktu OTP telah berakhir. Silakan minta OTP yang baru dengan menggunakan perintah .otp.'
    // Memeriksa apakah OTP yang dimasukkan sesuai
    if (text.trim() !== user.otp) throw 'OTP yang Anda masukkan tidak valid.'
    
    // Jika verifikasi berhasil, tandai pengguna sebagai terdaftar
    user.registered = true
    
    // Informasi untuk dikirim ke pengguna
    let sn = generateSerialNumber() // Fungsi yang menghasilkan nomor seri unik
    let cap = `
╭━━「 *Information*
│• *Name:* ${namae}
│• *Status:* Success
│• *Sn:* ketik .ceksn
╰╾•••
`
    // Mengirim pesan dengan informasi verifikasi
    await conn.sendMessage(m.chat, { text: cap,
        contextInfo:
            {
                "externalAdReply": {
                    "title": " ✔️ S U C C E S S  R E G I S T R A S I",
                    "body": "",
                    "showAdAttribution": true,
                    "mediaType": 1,
                    "sourceUrl": '',
                    "thumbnailUrl": pp,
                    "renderLargerThumbnail": true

                }
            }}, m)
}

// Fungsi untuk menghasilkan nomor seri unik
function generateSerialNumber() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
}

handler.help = ['vercode'];
handler.tags = ['main'];
handler.command = /^(vercode)$/i;
handler.private = true;

export default handler
