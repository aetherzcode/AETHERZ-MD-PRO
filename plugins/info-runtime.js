let handler = async (m, { conn }) => {
    let _muptime;
    if (process.send) {
        process.send('uptime');
        _muptime = await new Promise(resolve => {
            process.once('message', resolve);
            setTimeout(resolve, 1000);
        });
    }
    let muptime = clockString(_muptime);
    await conn.relayMessage(m.chat, { 
        reactionMessage: { key: m.key, text: '✅' }
    }, { 
        messageId: m.key.id 
    });
    await conn.sendMessage(m.chat, {
        text: `Bot sudah aktif selama ${muptime}`,
        contextInfo: {
            externalAdReply: {
                title: 'Runtime Bot ⏳',
                body: global.author,
                thumbnailUrl: global.aetherzjpg,
                sourceUrl: global.linkweb,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });
};

handler.help = ['runtime'];
handler.tags = ['info'];
handler.command = ['runtime', 'rt'];

export default handler;

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [d, ' Days ☀️\n', h, ' Hours 🕐\n', m, ' Minutes ⏰\n', s, ' Seconds ⏱️'].map(v => v.toString().padStart(2, 0)).join('');
}