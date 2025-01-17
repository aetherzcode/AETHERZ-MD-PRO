import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, `Masukkan teks yang ingin dicari.\n\nContoh :\n${usedPrefix + command} Kapan Google Dibuat`, m);
    
    let url = `https://api.betabotz.eu.org/api/search/google?text1=${encodeURIComponent(text)}&apikey=${global.lann}`;
    let wait = '_Sedang mencari informasi..._';
    conn.reply(m.chat, wait, m);

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        let data = await response.json();

        if (!data.result || !Array.isArray(data.result)) {
            throw new Error(`Data tidak valid: ${JSON.stringify(data)}`);
        }

        let msg = data.result.map(({ title, link, desc }) => {
            return `*${title}*\n_[${link}](${link})_\n_${desc}_`;
        }).join('\n\n');

        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: {
                externalAdReply: {
                    title: 'Hasil Pencarian Google',
                    body: 'Ini hasil pencarian Google Anda:',
                    thumbnailUrl: 'https://files.catbox.moe/3cj9sd.jpg',
                    sourceUrl: 'https://aetherz.xyz',
                    mediaType: 2,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, `Terjadi kesalahan saat mengambil data dari API: ${e.message}`, m);
    }
};

handler.help = ['google'].map(v => v + ' <query>');
handler.tags = ['internet'];
handler.command = /^google$/i;
handler.limit = true;

export default handler;