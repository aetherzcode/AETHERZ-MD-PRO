import fs from "fs";
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
  let text = `AETHERZ-MD is online, Sir.`;

  // Unduh gambar thumbnail
  let response = await fetch("https://files.catbox.moe/3cj9sd.jpg");
  let thumbnailBuffer = await response.buffer();

  // Baca file audio dari lokasi media
  let audioBuffer = fs.readFileSync("media/alvyna0.mp3");

  conn.sendFile(
    m.chat,
    audioBuffer,
    "yuhumina.mp3",
    text,
    m,
    true,
    {
      type: "audioMessage",
      ptt: true,
      mimetype: 'audio/mp4',
      fileName: "yuhumina.mp3",
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: "url_audio",
          title: "T O T A L - F I T U R",
          body: `📁 ${totalf} aktif`,
          sourceUrl: link.web,
          thumbnail: thumbnailBuffer
        }
      }
    }
  );
};

handler.help = ['totalfitur'];
handler.tags = ['info'];
handler.command = ['totalfitur'];

export default handler;
