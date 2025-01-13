import { ttSearch } from '../lib/ttSearch.js';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    m.reply('_Mohon tunggu..._');

    ttSearch('galau brutal').then(results => {
        let videos = results.videos;
        let randomIndex = Math.floor(Math.random() * videos.length);
        let randomVideo = videos[randomIndex];
        let caption = '© AETHERz-MD';
        let videoUrl = 'https://tikwm.com/' + randomVideo.play;
        conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption }, { quoted: m });
    }).catch(err => {
        m.reply('_Terjadi kesalahan saat mencari video._');
    });
};

handler.help = ['sadvibes'];
handler.tags = ['downloader'];
handler.command = /^(sadvibes|galaubrutal)$/i;
handler.limit = true;
handler.register = true;

export default handler;