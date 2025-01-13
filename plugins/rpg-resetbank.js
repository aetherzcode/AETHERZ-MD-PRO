import fs from "fs";

let handler = async (m, { conn, args }) => {
    let isAll = args[0] === 'all';
    if (isAll) {
        // Reset all users' bank balance to 0
        for (let user in global.db.data.users) {
            global.db.data.users[user].bank = 0;
        }
        fs.writeFileSync('./database.json', JSON.stringify(global.db));
        
        const caption = `
▧「 *RESET BANK* 」
│ 💰 Semua saldo bank pengguna telah direset menjadi 0
└────···
`.trim();
        
        await conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                externalAdReply: {
                    title: 'Reset Bank',
                    body: 'INFORMASI',
                    thumbnailUrl: 'https://example.com/bank.jpg',  // Ganti dengan URL gambar yang sesuai
                    sourceUrl: 'https://example.com',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
        
    } else {
        let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        if (!(mentionedJid in global.db.data.users)) return m.reply(`User ${mentionedJid} tidak ditemukan dalam database`);
        let user = global.db.data.users[mentionedJid];
        
        // Reset bank balance to 0
        user.bank = 0;
        
        global.db.data.users[mentionedJid] = user;
        fs.writeFileSync('./database.json', JSON.stringify(global.db));
        
        const caption = `
▧「 *RESET BANK* 」
│ 👤 Nama: ${user.registered ? user.name : conn.getName(m.sender)}
│ 💰 Saldo Bank: ${user.bank}
└────···
`.trim();
        
        await conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                externalAdReply: {
                    title: 'Reset Bank',
                    body: 'INFORMASI',
                    thumbnailUrl: 'https://example.com/bank.jpg',  // Ganti dengan URL gambar yang sesuai
                    sourceUrl: 'https://example.com',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    }
};

handler.help = ['resetbank @tag user', 'resetbank all'];
handler.tags = ['rpg'];
handler.command = /^resetbank$/i;

handler.register = true;
handler.group = true;
handler.rpg = true;
handler.owner = true;

export default handler;
