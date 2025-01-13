const { proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let M = proto.WebMessageInfo;
    let chats = db.data.chats[m.chat];
    let msgs = chats.listStr || {};
    
    switch (command) {
        case 'addtesti':
            if (m.sender != owner) throw 'Perintah ini hanya bisa digunakan oleh owner!';
            if (!text) throw `Gunakan: ${usedPrefix + command} <nama|link>`;
            let [addName, link] = text.split('|');
            if (!addName || !link) throw `Format tidak valid. Gunakan: ${usedPrefix + command} <nama|link>`;
            if (addName in msgs) throw `Testimonial '${addName}' sudah terdaftar`;
            msgs[addName] = link;
            chats.listStr = msgs;
            m.reply(`Berhasil menambahkan testimonial '${addName}' ke daftar`);
            break;
        
        case 'testimoni':
            if (!text) throw `Silakan tentukan testimonial yang ingin Anda lihat. Ketik\n *.listtesti* untuk melihat semua list testimoni yang tersedia`;
            if (!(text in msgs)) throw `Testimonial '${text}' tidak ada`;
            await m.reply('_*Real Testimoni VLSHOP🛍*_');
            let who = conn.user.jid;
            let senderName = conn.getName(who);
            conn.sendFile(m.chat, msgs[text], null, `Ini testimonial *${senderName}* '${text}'`, m);
            break;
        
        case 'deltesti':
            if (!text) throw `Gunakan: ${usedPrefix + command} <nama>`;
            if (!(text in msgs)) throw `Testimonial '${text}' tidak terdaftar`;
            delete msgs[text];
            chats.listStr = msgs;
            m.reply(`Berhasil menghapus testimonial '${text}' dari daftar`);
            break;
        
        case 'listtesti':
            let testimonialList = Object.keys(msgs).map(name => `${name}: ${msgs[name]}`).join('\n');
            if (testimonialList) {
                m.reply(`Testimonial yang tersedia:\n\n${testimonialList}\n\nUntuk melihat gambar, klik link di atas atau ketik nama testi. Contoh: *.testimoni* testi1`);
            } else {
                m.reply('Tidak ada testimonial yang tersedia.');
            }
            break;
        
        default:
            throw `Perintah tidak valid: ${command}`;
    }
}

handler.help = ['testimoni', 'addtesti <nama|link>', 'deltesti <nama>', 'listtesti'];
handler.tags = ['toko', 'testimoni'];
handler.command = /^(testimoni|addtesti|deltesti|listtesti)$/i;
handler.premium = false;

export default handler;
/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/