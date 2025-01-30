import baileys from '@whiskeysockets/baileys';
const { proto } = baileys;

const handler = async (m, { conn, text }) => {
    try {
        let teks = text 
            ? text 
            : m.quoted?.text 
            ? m.quoted.text 
            : m.quoted?.caption 
            ? m.quoted.caption 
            : m.quoted?.description 
            ? m.quoted.description 
            : '';

        let media = null;
        let mimetype = '';

        if (m.quoted?.mimetype) {
            mimetype = m.quoted.mimetype;
            media = await m.quoted.download(); 
        }

        if (!teks && !media) {
            return m.reply('Harap masukkan teks atau reply ke voice note, audio, atau video untuk dikirim ke channel!');
        }

        await sendMessage(conn, teks, media, mimetype);
        m.reply('✅ Sukses mengirim pesan ke channel!');
    } catch (e) {
        console.error(e);
        m.reply('❌ Gagal mengirim pesan!');
    }
};

handler.tags = ['tools'];
handler.command = /^(upch)$/i;
handler.owner = true;
export default handler;

async function sendMessage(conn, teks, media = null, mimetype = '') {
    let messageContent = {};

    if (media) {
        if (mimetype.startsWith('audio/')) {
            messageContent = { audio: media, mimetype, ptt: mimetype.includes('ogg') }; 
        } else if (mimetype.startsWith('video/')) {
            messageContent = { video: media, mimetype };
        }
    } else {
        messageContent = { text: teks };
    }

    return await conn.sendMessage('120363377480889276@newsletter', messageContent);
}