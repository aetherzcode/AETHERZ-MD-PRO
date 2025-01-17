import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    let res = await fetch(`https://api.betabotz.eu.org/api/random/taugasih?apikey=${global.lann}`);
    let json = await res.json();
    
    if (!json.taugasih) {
      throw new Error('Data tidak ditemukan di respons API.');
    }
    
    conn.reply(m.chat, `${json.taugasih}`, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan.', m);
  }
};

handler.help = ['taugasih'];
handler.tags = ['fun'];
handler.command = /^(taugasih)$/i;
handler.limit = true;
handler.admin = false;
handler.fail = null;

export default handler;