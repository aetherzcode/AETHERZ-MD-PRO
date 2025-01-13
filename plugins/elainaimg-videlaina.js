import axios from 'axios';
import { googleImage } from '@bochilteam/scraper';

export async function ttSearch(query) {
    return new Promise((resolve, reject) => {
        axios.post("https://tikwm.com/api/feed/search", {
            keywords: query,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1
        }, {
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "cookie": "current_language=en",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
            }
        }).then(res => { 
            resolve(res.data.data); 
        }).catch(err => {
            reject(err); // tambahkan penanganan error di sini
        });
    });
}

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    switch (command) {
        case 'elaina':
            conn.reply(m.chat, 'Searching for Elaina images...', m);
            const res = await googleImage('Elaina');
            let image = res.getRandom();
            let link = image;
            conn.sendFile(m.chat, link, 'google.jpg', 'R A N D O M - E L A I N A', m);
            break;
        case 'videlaina':
            m.reply('_Mohon tunggu..._');
            ttSearch('amv elaina').then(results => {
                let videos = results.videos;
                let randomIndex = Math.floor(Math.random() * videos.length);
                let randomVideo = videos[randomIndex];
                let caption = 'made by © Aᴇᴛʜᴇʀ\nResults Video Amv Elaina';
                let videoUrl = 'https://tikwm.com/' + randomVideo.play;
                conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption }, { quoted: m });
            }).catch(err => {
                m.reply('_Terjadi kesalahan saat mencari video._');
            });
            break;
    }
};

handler.help = ['videlaina','elaina'];
handler.tags = ['anime'];
handler.command = /^(videlaina|videoelaina|elaina)$/i;
handler.limit = true;
handler.register = true;

export default handler;