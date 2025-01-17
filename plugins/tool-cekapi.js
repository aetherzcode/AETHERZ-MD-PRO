import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Apikeynya mana?');
    try {
        let res = await fetch(`https://api.betabotz.eu.org/api/checkkey?apikey=${args[0]}`);
        let lann = await res.json();

        if (!lann.result) {
            return conn.reply(m.chat, 'API Key tidak valid atau tidak ditemukan.', m);
        }

        conn.reply(m.chat, `• *ᴛʏᴘᴇ:* BETABOTZ
• *ᴀᴘɪᴋᴇʏ:* ${args[0]}

• *ɴᴀᴍᴇ:* ${lann.result.username}
• *ᴛᴏᴛᴀʟ ʜɪᴛ:* ${lann.result.totalHit || 'Tidak tersedia'}
• *ʜɪᴛ ᴛᴏᴅᴀʏ:* ${lann.result.todayHit || 'Tidak tersedia'}
• *sɪsᴀ ʟɪᴍɪᴛ:* ${lann.result.limit || 'Tidak tersedia'}
• *ᴀᴄᴄᴏᴜɴᴛ:* ${lann.result.role || 'Tidak tersedia'}

• *ᴇxᴘɪʀᴇᴅ:* ${lann.result.expired || 'Tidak tersedia'}`, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Terjadi kesalahan saat memeriksa API Key.', m);
    }
};

handler.help = ['betaapikey'];
handler.tags = ['tools'];
handler.command = /^beta(apikey|api|key)$/i;

export default handler;