import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*example:* ${usedPrefix + command} https://vt.tiktok.com/xxxxxxx`;
    conn.sendMessage(m.chat, {
        react: {
            text: '⭐',
            key: m.key,
        }
    });

    try {
        switch (command) {
            case 'tt':
            case 'ttdl':
            case 'tiktok':
                // Menggunakan API untuk mendapatkan tautan unduhan TikTok
                var result = await fetch(`https://api.agatz.xyz/api/tiktok?url=${encodeURIComponent(text)}`);
                var res = await result.json();
                var videoUrl = res.result.no_watermark; // Mengambil URL video tanpa watermark
                var title = res.result.title; // Mengambil judul video

                if (!videoUrl) throw 'Video URL not found';

                await conn.sendFile(m.chat, videoUrl, 'tiktok.mp4', title, m);
                break;
            case 'ig':    
            case 'igdl':
            case 'instagram':
                // Menggunakan API untuk mendapatkan tautan unduhan Instagram
                var response = await fetch(`https://api.agatz.xyz/api/instagram?url=${encodeURIComponent(text)}`);
                var res = await response.json();

                if (res.status) {
                    var videoUrl = res.result[0].url;
                    var thumbnail = res.result[0].thumbnail;
                    var wm = res.result[0].wm;

                    await conn.sendFile(m.chat, videoUrl, 'instagram.mp4', `Instagram Video: ${wm}`, m, { thumbnail: thumbnail });
                } else {
                    throw 'Gagal mengunduh video dari Instagram. Coba lagi nanti.';
                }
                break;
            default:
                throw `Perintah tidak dikenal: ${command}`;
        }
    } catch (error) {
        console.error(error);
        conn.sendMessage(m.chat, `Error: ${error.message}`, m);
    }
};

handler.help = ['ttdl', 'tiktok', 'igdl', 'instagram'];
handler.tags = ['downloader'];
handler.command = /^(tt|ttdl|tiktok|ig|igdl|instagram)$/i;
handler.premium = false;

export default handler;