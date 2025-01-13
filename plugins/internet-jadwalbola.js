import fetch from 'node-fetch';

let handler = async (m, { command, usedPrefix, conn }) => {
    try {
        let f = await fetch('https://api.lolhuman.xyz/api/jadwalbola?apikey=faykaloffc');
        let xx = await f.json();
        
        // Memeriksa apakah respons sukses
        if (xx.status === 200 && xx.message === "success" && Array.isArray(xx.result)) {
            let teks = xx.result.map(v => {
                return `  
    _*${v.match}*_
    🏆Event: ${v.event}
    ⏲️Waktu: _${v.time}_
    📺Channel Tv: ${v.tv}
          `.trim();
            }).join('\n\n');
            await conn.sendMessage(m.chat, {
                text: teks,
                contextInfo: {
                    externalAdReply: {
                        title: 'JADWAL BOLA⚽',
                        body: global.author,
                        thumbnailUrl: 'https://telegra.ph/file/17fc00fca07ceb38ffaa9.jpg', 
                        sourceUrl: link.web,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } else {
            await m.reply("Respon API tidak sesuai dengan yang diharapkan.");
        }
    } catch (error) {
        console.error(error);
        await m.reply("Terjadi kesalahan dalam mengambil jadwal bola.");
    }
};

handler.help = ['jadwalbola'];
handler.tags = ['internet'];
handler.command = /^jadwalbola$/i;

export default handler;
