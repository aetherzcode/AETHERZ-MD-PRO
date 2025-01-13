/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
import ytdl from 'ytdl-core';
import yts from 'yt-search';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { openai } from 'betabotz-tools';

ffmpeg.setFfmpegPath(ffmpegPath);
const streamPipeline = promisify(pipeline);
let isPlaying = false;

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (isPlaying) {
    throw `Mohon tunggu, masih ada proses play yang sedang berlangsung.`;
  }
  isPlaying = true;
  try {
    if (!text) throw `Mohon berikan kata kunci untuk mencari. Contoh: ${usedPrefix}${command} aku lagi galau`;
    let kemii = await conn.reply(m.chat, '```mohon tunggu sebentar..```', m);
    let hasil = await openai(text);
    await conn.sendMessage(m.chat, { text: `${hasil.result}`.trim(), edit: kemii });

    if (text.toLowerCase().includes('lagu')) {
      let search = await yts(text);
      let vid = search.videos[Math.floor(Math.random() * search.videos.length)];
      if (!vid) throw 'Konten tidak ditemukan';

      let { title, url } = vid;

      const audioStream = ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio',
      });
      const tmpDir = os.tmpdir();
      const filePath = `${tmpDir}/${title}.mp3`;
      await streamPipeline(audioStream, fs.createWriteStream(filePath));
      await conn.sendMessage(m.chat, { audio: { url: filePath }, mimetype: 'audio/mp4' }, { quoted: m });
    }

  } finally {
    isPlaying = false;
  }
}

handler.help = ['nexpina'];
handler.tags = ['downloader'];
handler.command = /^(nexpina)$/i;
handler.limit = true;

export default handler;