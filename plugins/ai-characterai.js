import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  if (command == 'kirito') {
    if (!text) return conn.reply(m.chat, `.${command} hallo kirito`, m);
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

    try {
      let res = await fetch(`https://api.betabotz.eu.org/api/search/c-ai?prompt=${text}&char=Kirito&apikey=${global.lann}`);
      
      if (!res.ok) {
        throw new Error('API request failed');
      }

      let eterr = await res.json();
      
      if (eterr.message) {
        conn.reply(m.chat, `${eterr.message}`, m);
      } else {
        conn.reply(m.chat, 'Tidak ada respons yang valid dari API.', m);
      }
    } catch (error) {
      console.error(error);
      conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan ke API.', m);
    }
  }
};

handler.help = ['rimuru', 'kirito', 'eterr', 'jokowi', 'megawati', 'yaemiko', 'paimon', 'kiku', 'putin', 'lisa'].map(v => v + ' *<teks>*');
handler.command = /^rimuru|kirito|eterr|jokowi|megawati|yaemiko|paimon|kiku|putin|lisa$/i;
handler.tags = ['ai'];

export default handler;