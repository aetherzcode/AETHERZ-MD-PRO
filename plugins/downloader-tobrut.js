import { ttSearch } from '../lib/ttSearch.js';
import fetch from 'node-fetch';

const wait = '⌛ Mohon tunggu...';

async function pinterest() {
    let res = await fetch('https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3Dtobrut&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22tobrut%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559');
    let json = await res.json();
    let data = json.resource_response.data.results;
    if (!data.length) throw 'Tidak dapat menemukan gambar Tobrut :/';
    return data[~~(Math.random() * data.length)].images.orig.url;
}

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    m.reply(wait);

    if (command === 'vidtobrut') {
        ttSearch('tobrut').then(results => {
            let videos = results.videos;
            if (videos.length === 0) throw 'Tidak dapat menemukan video Tobrut :/';
            let randomIndex = Math.floor(Math.random() * videos.length);
            let randomVideo = videos[randomIndex];
            let caption = '© Aᴇᴛʜᴇʀᴢ-ᴍᴅ';
            let videoUrl = 'https://tikwm.com/' + randomVideo.play;
            conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption }, { quoted: m });
        }).catch(err => {
            m.reply('_Terjadi kesalahan saat mencari video._');
        });
    } else if (command === 'imgtobrut') {
        try {
            let imageUrl = await pinterest();
            let cap = `Nih kak Tobrut🍑`;
            conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: cap }, { quoted: m });
        } catch (err) {
            m.reply('_Terjadi kesalahan saat mencari gambar._');
        }
    }
};

handler.help = ['vidtobrut', 'imgtobrut'];
handler.tags = ['downloader'];
handler.command = /^(vidtobrut|imgtobrut)$/i;
handler.limit = true;
handler.register = true;

export default handler;
