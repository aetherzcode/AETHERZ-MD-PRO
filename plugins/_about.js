let handler = async (m, { conn, usedPrefix }) => {
  let payText = `
*AETHERz-MD* adalah bot WhatsApp yang dikembangkan dengan menggunakan NodeJS dan library Baileys. Bot ini diciptakan untuk memberikan pengalaman pengguna yang lebih baik dalam berinteraksi di platform WhatsApp.

Fitur Utama:
- *Pesan Teks:* Bot dapat mengirim dan menerima pesan teks dari pengguna.
- *Media Sharing:* Dukungan untuk berbagi gambar, audio, video, dan dokumen.
- *Manajemen Grup:* Bot memiliki kemampuan untuk mengelola grup, termasuk menambahkan bot ke grup.
- *Respon Otomatis:* Bot dilengkapi dengan respon otomatis untuk pesan tertentu.
- *Kustomisasi:* Pengguna dapat menyesuaikan pengaturan dan preferensi bot.
- *Pengembangan Terus Menerus:* Bot akan terus diperbarui dengan fitur-fitur baru dan perbaikan.
`
  await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '💌' }}, { messageId: m.key.id })
  conn.sendMessage(m.chat, {
    text: payText, 
    contextInfo: {
      externalAdReply: {
        title: 'ABOUT - ME',
        body: wm,
        thumbnailUrl: global.aetherzjpg, 
        sourceUrl: link.web,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
  let vn = "./media/alvyna2.mp3"
  conn.sendFile(m.chat, vn, "ehee.mp3", null, m, true, {
    type: "audioMessage",
    ptt: true,
  });
}

handler.command = /^(about|help)$/i
handler.tags = ['info']
handler.help = ['sosmed']

export default handler