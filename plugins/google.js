import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, `Masukkan teks yang ingin dicari.\n\nContoh :\n${usedPrefix + command} Kapan Google Dibuat`, m)
    let apikey = global.lol;
    let url = `https://api.betabotz.eu.org/api/search/google?text1=${encodeURIComponent(text)}&apikey=${lann}`;
    
    let wait = '_Sedang mencari informasi..._';
    conn.reply(m.chat, wait, m);
    
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        
        let data = await response.json();
        let msg = data.result.map(({ title, link, desc }) => {
            return `*${title}*\n_[${link}](${link})_\n_${desc}_`;
        }).join('\n\n');
        
        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: {
                externalAdReply: {
                    title: 'Hasil Pencarian Google',
                    body: 'Ini hasil pencarian Google Anda:',
                    thumbnailUrl: 'https://example.com/your-image.jpg',
                    sourceUrl: 'https://www.google.com',
                    mediaType: 2, 
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (e) {
        console.error(e);
        m.reply(`Terjadi kesalahan saat mengambil data dari API.`);
    }
}

handler.help = ['google'].map(v => v + ' <query>');
handler.tags = ['internet'];
handler.command = /^google$/i;
handler.limit = true;

export default handler;