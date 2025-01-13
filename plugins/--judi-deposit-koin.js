const { proto } = (await import('@whiskeysockets/baileys')).default;
let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (m.isGroup) {
        throw `Silahkan melakukan deposit di private chat.`;
    }   
    let M = proto.WebMessageInfo;
    let chats = db.data.chats[m.chat];
    let msgs = chats.listStr || {};  
    switch (command) {
        case 'depo':
        case 'deposit':
            if (!text) throw `Berapa koin yang ingin Anda deposit? Gunakan ${usedPrefix}deposit 10`;
            if (isNaN(text)) throw `Hanya angka yang diperbolehkan. Contoh: ${usedPrefix}deposit 10`;
            if (parseInt(text) < 10) throw `Deposit minimum adalah 10 koin.`;
            conn.sendFile(m.chat, 'https://telegra.ph/file/7ecf1f2c7173665a3113d.jpg', 'qris.jpg', `Deposit ${text} koin`, m);
            throw `\`「 PENTING 」\`‼️ 
> Jika sudah melakukan pembayaran, silahkan kirim foto bukti pembayaran dan ketik .done nominal, contoh: done 10`;
            break;      
            
        case 'done':
            if (!text) throw `Gunakan .done 10`;  
            const date = new Date().toLocaleDateString();
            const time = new Date().toLocaleTimeString();
         
            const order = `\`「 DEPOSIT 」\`

 ❏ Jumlah: ${text} koin
 ❏ Dari: ${m.sender.split`@`[0]}
 ❏ Jumlah: ${text} koin
 ❏ Tanggal: ${date} 
 ❏ Jam: ${time}
 
> Haii owner ada yang melakukan deposit segera proses dan tetep amanah ya. `;
            conn.reply("6282389924037@s.whatsapp.net", order.trim(), m);
            await m.reply(`
 \`「 DEPOSIT 」\` ✅
 ❏ Status: pending..
 ❏ Jumlah: ${text} koin
 ❏ Tanggal: ${date}
 ❏ Jam: ${time}
 
> terimakasih telah melakukan deposit mohon tunggu, owner akan segera proses koin kamu, jika ada kendala silahkan hubungi .owner`);
            break;
            
        default:
            throw `Perintah tidak valid: ${command}`;
    }
}
handler.tags = ['judi']
handler.help = ['deposit', 'done'];
handler.command = /^(deposit|done)$/i;
handler.premium = false;
handler.register = true

export default handler;