import fetch from 'node-fetch';
import displayLoadingScreen from '../lib/loading.js';
let handler = async (m, { conn, text }) => {
    if (!text) {
        console.log('No song name provided.');
        throw `*Please enter a song name*`;
    }
  
  await displayLoadingScreen(conn, m.chat);
  let pp = 'https://telegra.ph/file/c0598174d6421512b27d4.png'
    const query = encodeURIComponent(text);
    let res = `https://guruapi.tech/api/spotifydl?url=${query}`
   // let spotify = await (await fetch(res)).buffer()
    let wm = "↺ |◁   II   ▷|   ♡";
    let author = `Now playing: ${text}`;
    let vn = await (await fetch(res)).buffer();
    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '✅'  }}, { messageId: m.key.id }) 
    await conn.sendFile(m.chat, vn, "AETHERz.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
    await conn.sendMessage(m.chat, {
        text: text,
        contextInfo: {
            externalAdReply: {
                title: wm,
                body: author,
                thumbnailUrl: 'https://files.catbox.moe/3cj9sd.jpg',
                sourceUrl: null,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    });
}
handler.help = ['spotifysong'];
handler.tags = ['downloader'];
handler.command = /^(spotifysong)$/i;

export default handler;