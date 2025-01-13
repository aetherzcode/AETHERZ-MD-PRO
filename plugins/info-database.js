let handler = async (m, { conn, usedPrefix }) => {
  let totalreg = Object.keys(global.db.data.users).length;
  let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
  let untotalreg = Object.values(global.db.data.users).filter(user => user.registered == false).length;
  let infoText = `
📊 *Info Database Bot* 📊

👥 Total Pengguna: ${totalreg}
✅ Pengguna Terdaftar: ${rtotalreg}
❌ Pengguna Tidak Terdaftar: ${untotalreg}

Tingkatkan pengalaman Anda dengan bot kami dengan mendaftar! Ketik *${usedPrefix}register* untuk mulai.
  `;

  // Kirim pesan reaksi
  await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '🗃️' }}, { messageId: m.key.id });

  // Kirim pesan dengan informasi
  conn.sendMessage(m.chat, {
    text: infoText, 
    contextInfo: {
      externalAdReply: {
        title: 'DATABASE BOT',
        body: 'Dapatkan informasi tentang pengguna database bot!',
        thumbnailUrl: global.aetherzjpg, 
        sourceUrl: link.web,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });

  // Kirim file audio
  let vn = "./media/alvyna5.mp3";
  conn.sendFile(m.chat, vn, "ehee.mp3", null, m, true, {
    type: "audioMessage",
    ptt: true,
  });
};

handler.command = /^(db|user|database)$/i;
handler.tags = ['info'];
handler.help = ['database'];

export default handler;