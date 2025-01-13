import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let response = args.join(' ').split(' --');
  let query = "JKT48";
  let count = parseInt(response[0]);

  if (!count) {
    try {
      const tio = await fetch(`https://api.lolhuman.xyz/api/pinterest2?apikey=${global.lol}&query=${query}`);
      const p = await tio.json();
      let url = p.result[Math.floor(Math.random() * p.result.length)];
      conn.sendFile(m.chat, url, 'loliiiii.jpg', `*🔖R A N D O M   J K T 4 8*`, m);
    } catch (error) {
      console.log(error);
      conn.reply(m.chat, 'Terjadi kesalahan saat menjalankan perintah.', m);
    }
  } else {
    if (count > 10) {
      throw 'Jumlah gambar terlalu banyak! Maksimal 10 gambar.';
    }
    try {
      let url = `https://api.lolhuman.xyz/api/pinterest2?apikey=GataDios&query=${query}`;
      let res = await fetch(url);
      let data = await res.json();
  
      let images = data.result;
  
      for (let i = 0; i < count; i++) {
        let image = images[Math.floor(Math.random() * images.length)];
        setTimeout(() => {
          conn.sendFile(m.chat, image, '', `*🔖R A N D O M   J K T 4 8*`, m);
        }, i * 5000);
      }
    } catch (error) {
      console.log(error);
      conn.reply(m.chat, 'Terjadi kesalahan saat menjalankan perintah.', m);
    }
  }
};

handler.help = ['jkt48'];
handler.tags = ['tools','random','internet'];
handler.command = /^(jkt48)$/i;

export default handler;