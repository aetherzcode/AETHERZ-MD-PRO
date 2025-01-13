let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.split(' ')[0] + '@s.whatsapp.net';
    } else {
        who = text.split(' ')[0] + '@s.whatsapp.net';
    }

    if (!who) throw `Tag or mention someone or provide a phone number!`;

    let user = db.data.users[who];
    if (!user) throw `User not found!`;

    let timeText = text.replace(who.split('@')[0], '').trim();
    if (!timeText) throw `Where is the number of days?`;

    // Menangkap format waktu dengan regex
    let timeRegex = /(\d+)(s|m|d|y)/i;
    let match = timeText.match(timeRegex);
    if (!match) throw `Invalid format! Use: 7d for days, 7m for minutes, 7s for seconds, 7y for years.`;

    let amount = parseInt(match[1]);
    let unit = match[2].toLowerCase();
    let duration;
    
    switch (unit) {
        case 's':
            duration = 1000 * amount;
            break;
        case 'm':
            duration = 60000 * amount;
            break;
        case 'd':
            duration = 86400000 * amount;
            break;
        case 'y':
            duration = 31536000000 * amount;
            break;
        default:
            throw `Invalid unit! Use: s for seconds, m for minutes, d for days, y for years.`;
    }

    var now = new Date() * 1;
    if (now < user.premiumTime) user.premiumTime += duration;
    else user.premiumTime = now + duration;
    user.premium = true;

    // Mengirim informasi Premium time ke Chat pribadi pengguna
    await conn.sendMessage(who, {
        text: `Your Premium membership has been extended!\n\n📆 *Duration:* ${amount} ${unit}\n📉 *Countdown:* ${user.premiumTime - now}`,
        contextInfo: {
            externalAdReply: {
                thumbnailUrl: 'https://files.catbox.moe/3cj9sd.jpg', // URL thumbnail
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });

    m.reply(`✔️ Success
📛 *Name:* ${user.name}
📆 *Duration:* ${amount} ${unit}
📉 *Countdown:* ${user.premiumTime - now}`);

    // Mengecek apakah masa premium habis setiap menit
    setInterval(() => {
        var now = new Date() * 1;
        if (now > user.premiumTime && user.premium) {
            user.premium = false;
            // Memberi tahu pengguna bahwa masa premium telah habis
            conn.sendMessage(who, {
                image: { url: 'https://files.catbox.moe/3cj9sd.jpg' },
                caption: `
Maafkan kami, tetapi masa keanggotaan Premium Anda telah habis. Namun, jangan khawatir! Anda masih dapat menikmati sebagian besar fitur kami, dan jika Anda ingin memperpanjang keanggotaan Premium Anda, jangan ragu untuk menghubungi kami. Terima kasih telah menjadi bagian dari komunitas kami!
`
            });
        }
    }, 60000); // Cek setiap 60 detik (1 menit)
};

handler.help = ['addprem [@user|phone number] <duration>']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)p(rem)?$/i

handler.group = false
handler.rowner = true

export default handler;