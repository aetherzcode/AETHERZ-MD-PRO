import fetch from 'node-fetch';

let handler = async (m, { conn, link }) => {
  try {
    let res = await (await fetch(`https://api.lolhuman.xyz/api/random/puisi?apikey=${global.lol}`)).json();

    // Mengirim pesan bersama dengan thumbnail
    await conn.relayMessage(m.chat, { 
      reactionMessage: { key: m.key, text: '✅' }
    }, { 
      messageId: m.key.id 
    });
    conn.sendMessage(m.chat, {
      text: res.result,
      contextInfo: {
        externalAdReply: {
          title: 'wm',
          body: 'P U I S I',
          thumbnailUrl: global.aetherzjpg,
          sourceUrl: 'https://xnxx.com',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan dalam mengambil puisi.');
  }
}

handler.help = ['puisi'];
handler.tags = ['quotes'];
handler.command = /^(puisi)$/i;
handler.limit = true;

export default handler;