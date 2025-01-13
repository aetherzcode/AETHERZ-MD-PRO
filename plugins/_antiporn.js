import axios from 'axios';
import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';

let handler = m => m
handler.before = async function(m, { conn }) {
 let chat = db.data.chats[m.chat]
 let sender = db.data.chats[m.sender]
 let q = m.quoted ? m.quoted : m;
 let mime = (q.msg || q).mimetype || '';
 if (chat.antiPorn) {
  if (/image/.test(mime)) {
   let media = await q.download();
   let url = await uploadImage(media);
   let api = `https://api.itsrose.life/image/nsfwCheck?url=${encodeURIComponent(url)}&apikey=${global.rose}&threshold=0.9`;
   try {
      let { data } = await axios.get(api);
      let status = data.status;
      if (status) {
        let classes = data.suggestive_classes;
        let isSuggestive = false;
        for (const key in classes) {
          if (classes[key] >= 0.9) {
            isSuggestive = true;
            break;
     }
    }
    if (data.erotica >= 0.5 || data.sexual_display >= 0.5 || data.sexual_activity >= 0.5 || isSuggestive) {
     let user = m.sender;
     let mention = `@${user.replace(/@.+/, "")}`;
     await conn.reply(m.chat,`*${mention} Detected send nsfw.*`, fkontak);
     await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } })
    }
  }
    } catch (e) {
    console.log(e)
    conn.reply(m.chat, '*Sorry there was an error accepting the request.*', m)
   }
  }
 }
};

export default handler;