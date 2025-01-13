const { proto } = (await import('@whiskeysockets/baileys')).default;
let handler = async (m, { conn, text, command, usedPrefix }) => {
    let M = proto.WebMessageInfo;
    let chats = db.data.chats; // Ambil data semua chat
    let msgs = {}; // Objek untuk menyimpan postingan

    // Ambil semua postingan dari semua grup dan chat pribadi
    for (let chat in chats) {
        let chatData = chats[chat];
        let chatMsgs = chatData.listStr || {};
        Object.assign(msgs, chatMsgs);
    }

    switch (command) {
        case 'post':
            let [nama, teks] = text.split('|');
            if (!nama || !teks) throw 'Format tidak valid. Gunakan format: .post nama|teks';
            msgs[nama] = { nama, teks };

            // Perbarui data postingan di semua chat
            for (let chat in chats) {
                chats[chat].listStr = msgs;
            }

            conn.reply(m.chat, `Postingan berhasil ditambahkan oleh ${nama}.`, m);
            break;     
        case 'delpost':
            let [namaDel] = text.split('|');
            if (!(namaDel in msgs)) throw 'Postingan tidak ditemukan.';
            delete msgs[namaDel];

            // Perbarui data postingan di semua chat
            for (let chat in chats) {
                chats[chat].listStr = msgs;
            }

            conn.reply(m.chat, `Postingan ${namaDel} berhasil dihapus.`, m);
            break;
        
        case 'lihatpost':
            let result = '📝 Daftar Postingan:\n';
            let count = 1;
            for (let post of Object.values(msgs)) {
                if (!post.nama || !post.teks) continue; // Skip jika nama atau teks tidak terdefinisi
                result += `${count}. *${post.nama}*: ${post.teks}\n\n`;
                count++;
            }
            // Tambahkan tanggal dan hari ini
            let currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            result += `📅 Tanggal: ${currentDate}`;

            conn.reply(m.chat, result || 'Belum ada postingan.', m);
            break;
        
        default:
            throw `Perintah tidak valid: ${command}`;
    }
}

handler.help = ['post', 'delpost', 'lihatpost'];
handler.tags = ['store', 'testimoni'];
handler.command = /^(post|delpost|lihatpost)$/i;
handler.premium = false;

export default handler;