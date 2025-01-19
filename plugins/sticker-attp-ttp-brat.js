import fs from 'fs';
import fetch from 'node-fetch';
import { sticker5 } from '../lib/sticker.js';
import ffmpeg from 'fluent-ffmpeg';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    const packname = global.packname || 'Default Pack';
    const author = global.author || 'Default Author';

    text = text || (m.quoted && (m.quoted.text || m.quoted.caption || m.quoted.description)) || '';
    if (!text) throw `Example: ${usedPrefix + command} Lagi Ruwet`;

    let res;
    const errorImage = fs.readFileSync('./media/sticker/emror.webp'); 

    try {
        if (command === 'attp') {
            res = `https://api.betabotz.eu.org/api/maker/attp?text=${encodeURIComponent(text.substring(0, 151))}&apikey=${lann}`;
            const fetchResult = await fetch(res);
            const imageBuffer = await fetchResult.buffer();

            const stiker = await sticker5(imageBuffer, null, packname, author, ['🎨']);
            if (stiker) {
                await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
            } else {
                throw new Error('Pembuatan stiker gagal');
            }
        } else if (command === 'ttp') {
            res = `https://api.betabotz.eu.org/api/maker/ttp?text=${encodeURIComponent(text.substring(0, 151))}&apikey=${lann}`;
            const fetchResult = await fetch(res);
            const imageBuffer = await fetchResult.buffer();

            const stiker = await sticker5(imageBuffer, null, packname, author, ['🎨']);
            if (stiker) {
                await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
            } else {
                throw new Error('Pembuatan stiker gagal');
            }
        } else if (command === 'brat') {
            res = `https://api.betabotz.eu.org/api/maker/brat?text=${encodeURIComponent(text.substring(0, 151))}&apikey=${lann}`;
            const fetchResult = await fetch(res);
            const imageBuffer = await fetchResult.buffer();

            const stiker = await sticker5(imageBuffer, null, packname, author, ['🎨']);
            if (stiker) {
                await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
            } else {
                throw new Error('Pembuatan stiker gagal');
            }
        } else if (command === 'bratvideo') {
            res = `https://api.betabotz.eu.org/api/maker/brat-video?text=${encodeURIComponent(text.substring(0, 151))}&apikey=${lann}`;
            const fetchResult = await fetch(res);

            if (!fetchResult.ok) {
                throw new Error(`API Brat-Video gagal: ${fetchResult.statusText}`);
            }

            const videoBuffer = await fetchResult.buffer();
            console.log('Video Buffer MIME Type:', fetchResult.headers.get('content-type'));

            const stickerBuffer = await convertVideoToWebp(videoBuffer);

            await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
        }
    } catch (e) {
        console.error('Error:', e);
        await conn.sendFile(m.chat, errorImage, 'error.webp', '', m);
    }
};

async function convertVideoToWebp(videoBuffer) {
    return new Promise((resolve, reject) => {
        const tmpInputPath = './tmp/video_input.mp4';
        const tmpOutputPath = './tmp/video_output.webp';

        fs.writeFileSync(tmpInputPath, videoBuffer);

        ffmpeg(tmpInputPath)
            .output(tmpOutputPath)
            .videoCodec('libwebp')
            .size('320x320')
            .outputOptions([
                '-vcodec', 'libwebp',
                '-vf', 'fps=15,scale=320:320:force_original_aspect_ratio=decrease',
                '-loop', '0',
                '-preset', 'default',
                '-an',
                '-vsync', '0'
            ])
            .on('end', () => {
                const stickerBuffer = fs.readFileSync(tmpOutputPath);
                fs.unlinkSync(tmpInputPath); 
                fs.unlinkSync(tmpOutputPath); 
                resolve(stickerBuffer);
            })
            .on('error', (err) => {
                console.error('Error converting video to WebP:', err);
                reject('Gagal mengonversi video ke WebP');
            })
            .run();
    });
}

handler.command = handler.help = ['attp', 'ttp', 'brat', 'bratvideo'];
handler.tags = ['sticker'];
handler.limit = true;
handler.group = false;

export default handler;