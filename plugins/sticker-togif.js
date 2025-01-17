import fetch from 'node-fetch';
import uploader from '../lib/uploadFile.js';

const handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/webp/.test(mime)) {
        let buffer = await q.download();
        await m.reply('Tunggu sebentar...');
        try {
            let media = await uploader(buffer);
            let json;
            if (command === 'togif') {
                json = await (await fetch(`https://api.betabotz.eu.org/api/tools/webp2mp4?url=${media}&apikey=${global.lann}`)).json();
            } else if (command === 'toimg') {
                json = await (await fetch(`https://api.betabotz.eu.org/api/tools/webp2png?url=${media}&apikey=${global.lann}`)).json();
            }
            await conn.sendFile(m.chat, json.result, null, "*DONE*", m);
        } catch (err) {
            console.error(err);
            throw err;
        }
    } else {
        throw `Reply sticker with command ${usedPrefix + command}`;
    }
};

handler.help = ['toimg2', 'togif'];
handler.tags = ['tools'];
handler.command = /^(toimg2|togif)$/i;
handler.limit = 5;

export default handler;