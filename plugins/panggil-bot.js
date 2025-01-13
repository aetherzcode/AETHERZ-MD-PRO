const delay = time => new Promise(res => setTimeout(res, time));

let handler = async (m, { conn, isOwner }) => {
    await delay(1000);
    let text;
    let fdoc = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { documentMessage: { title: 'A E T H E R Z - MD' } } };
    if (isOwner) {
        text = `Eh ada sayangku, cintaku, hidupku😙 @${m.sender.split('@')[0]}`;
    } else {
        text = `Halo Kak @${m.sender.split('@')[0]}, ada yang bisa aku bantu?`;
    }
    try {
        await conn.sendMessage(m.chat, { text: text, mentions: [m.sender] }, { quoted: fdoc });

        let vn = "./media/alvyna4.mp3";
        await conn.sendFile(m.chat, vn, "ehee.mp3", null, m, true, {
            type: "audioMessage",
            ptt: true,
        });
    } catch (error) {
        console.error(error);
        await conn.sendMessage(m.chat, 'Terjadi kesalahan saat mengirim pesan atau file audio.', 'conversation', { quoted: m });
    }
};

handler.customPrefix = /^(eterz|bot|etel|terz|sayang)$/i;
handler.command = new RegExp();
export default handler;
