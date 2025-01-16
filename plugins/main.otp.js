import { createHash } from 'crypto';
import fetch from 'node-fetch';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
    let namae = conn.getName(m.sender);
    let user = global.db.data.users[m.sender];
    const pp = await conn.profilePictureUrl(m.sender, "image").catch((_) => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg");

    if (user.registered === true) throw `Anda sudah terdaftar dalam Database, Apakah Anda ingin mendaftar ulang? */unreg*`;

    let otp = Math.floor(10000 + Math.random() * 90000);
    user.otp = otp.toString();
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // OTP berlaku selama 5 menit

    if (m.isGroup) {
        await conn.sendMessage(m.sender, {
            text: `OTP Anda untuk registrasi adalah: ${otp}`,
            contextInfo: {
                externalAdReply: {
                    title: 'OTP',
                    body: '(One-Time Password)',
                    thumbnailUrl: 'https://telegra.ph/file/a325935a4e310b3bc89c2.png',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
        await conn.reply(m.chat, `OTP telah dikirimkan ke pesan pribadi Anda. Silakan periksa.`, m);
    } else {
        await conn.sendMessage(m.sender, {
            text: `OTP Anda untuk registrasi adalah: ${otp}`,
            contextInfo: {
                externalAdReply: {
                    title: 'OTP',
                    body: '(One-Time Password)',
                    thumbnailUrl: 'https://telegra.ph/file/a325935a4e310b3bc89c2.png',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    }

    await conn.sendMessage(m.sender, { text: `
• Silakan masukkan OTP dengan cara ketik *.vercode* <number>
• Kode OTP berlaku selama 5 menit
• Jangan berikan kode atau menyebarkan kode OTP kepada orang asing` });
};

handler.help = ['otp'];
handler.tags = ['main'];
handler.command = /^(otp)$/i;

export default handler;