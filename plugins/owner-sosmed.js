let handler = async (m, { conn, usedPrefix }) => {
  let today = new Date();
  let curHr = today.getHours();
  let timeOfDay;

  if (curHr < 12) {
    timeOfDay = 'pagi';
  } else if (curHr < 18) {
    timeOfDay = 'siang';
  } else {
    timeOfDay = 'malam';
  }

  let payText = `
Halo Kak, selamat ${timeOfDay} 🌞🌛

╭‒‒‒‒‒‒‒‒‒‒‒‒╼
╰‒╼ *Instagram*
    ≡ ${link.ig}
╭‒‒‒‒‒‒‒‒‒‒‒‒╼
╰‒╼ *Github*
    ≡ ${link.gh}
╭‒‒‒‒‒‒‒‒‒‒‒‒╼
╰‒╼ *Facebook*
    ≡ ${link.fb}
╭‒‒‒‒‒‒‒‒‒‒‒‒╼
╰‒╼ *YouTube* 
    ≡ ${link.yt}
╭‒‒‒‒‒‒‒‒‒‒‒‒╼
╰‒╼ *Linktree*
    ≡ ${link.tree}

Ini adalah akun media sosial pengembang bot WhatsApp ini. Silakan kunjungi dan ikuti untuk mendapatkan pembaruan terbaru tentang bot ini.
`;

  await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '📱' }}, { messageId: m.key.id });
  conn.sendMessage(m.chat, {
    text: payText, 
    contextInfo: {
      externalAdReply: {
        title: 'I N F O  S O S M E D',
        body: global.author,
        thumbnailUrl: global.aetherzjpg, 
        sourceUrl: link.web,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });

  // Kirim file audio baru
  let vn = "./media/alvyna3.mp3";
  conn.sendFile(m.chat, vn, "ehee.mp3", null, m, true, {
    type: "audioMessage",
    ptt: true,
  });
};

handler.command = /^(sosmed)$/i;
handler.tags = ['info'];
handler.help = ['sosmed'];

export default handler;