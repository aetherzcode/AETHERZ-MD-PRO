import fetch from 'node-fetch';

// Definisikan emoji/reaksi
const rwait = '⏳'; // Emoji untuk menunjukkan proses sedang berlangsung
const done = '✅'; // Emoji untuk menunjukkan proses selesai

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw `📌 Contoh: ${usedPrefix + command} https://github.com/username/repo`;
    }
    
    if (!regex.test(args[0])) {
        throw `⚠️ Link tidak valid. Harap berikan link GitHub yang benar.`;
    }
    
    let [_, user, repo] = args[0].match(regex) || [];
    repo = repo.replace(/\.git$/, '');
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
    
    try {
        let response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) throw new Error('Failed to fetch the repository.');
        
        let contentDisposition = response.headers.get('content-disposition');
        if (!contentDisposition) throw new Error('Content-Disposition header missing.');
        
        let filename = contentDisposition.match(/attachment; filename=(.*)/);
        if (!filename) throw new Error('Failed to extract filename from Content-Disposition header.');
        filename = filename[1];
        
        m.react(rwait);
        conn.sendFile(m.chat, url, filename, null, m);
        m.react(done);
    } catch (error) {
        throw `⚠️ Terjadi kesalahan: ${error.message}`;
    }
};

handler.help = ['gitclone'];
handler.tags = ['downloader'];
handler.command = /gitclone/i;
handler.limit = true;
handler.daftar = true;

export default handler;
