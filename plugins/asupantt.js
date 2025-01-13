let handler = async (m, { conn }) => {
    let randomNumber = Math.floor(Math.random() * 100) + 1; // Menghasilkan angka acak antara 1 dan 100
    let videoLink = `https://storage.itsrose.life/asupan/tiktok/${randomNumber}.mp4`; // Membuat tautan video acak
    conn.sendFile(m.chat, videoLink, "video.mp4", null, m, true, {
        mimetype: "video/mp4",
        ptt: true,
    });
};
handler.help = ['asupantt'];
handler.tags = ['menuprem'];
handler.command = ['asupantt'];
handler.premium = true 

export default handler;

