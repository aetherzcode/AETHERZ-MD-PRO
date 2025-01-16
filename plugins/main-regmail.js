import nodemailer from 'nodemailer';
import { createHash } from 'crypto';

let handler = async function (m, { conn, text, usedPrefix, command }) {
    let namae = conn.getName(m.sender);
    let user = global.db.data.users[m.sender];

    if (user.registered === true) throw `Anda sudah terdaftar dalam Database, Apakah Anda ingin mendaftar ulang? */unreg*`;

    let emailUser = text.trim();

    if (!emailUser) {
        return conn.reply(m.chat, "Tolong kirimkan alamat email Anda setelah perintah. Contoh: .regmail contoh-email@gmail.com", m);
    }

    let otp = Math.floor(10000 + Math.random() * 90000);

    user.otp = otp.toString();
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aetherscode@gmail.com',
            pass: 'ihsynmfecsxgzmfr'
        }
    });

    let mailOptions = {
        from: 'aetherscode@gmail.com',
        to: emailUser,
        subject: 'Kode OTP Anda untuk Pendaftaran',
        text: `Kode OTP Anda untuk pendaftaran di ${global.info.namebot} adalah: ${otp}\n\nKode ini akan kedaluwarsa dalam 5 menit. Tolong jangan membaginya dengan siapa pun.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });

    await conn.sendMessage(m.sender, { text: `OTP Anda telah dikirim ke email: ${emailUser}. Silakan periksa inbox Anda, Jika tidak ada cek di folder Spam.` });

    await conn.sendMessage(m.sender, { text: `
• Silakan masukkan OTP dengan cara ketik *.vercode* <number>
• Kode OTP berlaku selama 5 menit
• Jangan berikan kode atau menyebarkan kode OTP kepada orang asing` });
};

handler.help = ['regmail <email>'];
handler.tags = ['main'];
handler.command = /^(regmail)$/i;

export default handler;