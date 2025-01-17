import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let response = args.join(' ').split(' --');
  let query = "JKT48";
  let count = parseInt(response[0]);

  if (!count) {
    try {
      const tio = await fetch(`https://api.kenshiro.biz.id/api/search/pinterest?q=${query}`);
      const p = await tio.json();

      if (!p.status || !p.data || !Array.isArray(p.data)) {
        throw new Error("Response API tidak valid.");
      }

      let url = p.data[Math.floor(Math.random() * p.data.length)].images_url;
      conn.sendFile(m.chat, url, 'loliiiii.jpg', '🔖R A N D O M   J K T 4 8', m);
    } catch (error) {
      console.error(error);
      conn.reply(m.chat, 'Terjadi kesalahan saat menjalankan perintah.', m);
    }
  } else {
    if (count > 10) {
      throw 'Jumlah gambar terlalu banyak! Maksimal 10 gambar.';
    }
    try {
      let url = `https://api.kenshiro.biz.id/api/search/pinterest?q=${query}`;
      let res = await fetch(url);
      let data = await res.json();

      if (!data.status || !data.data || !Array.isArray(data.data)) {
        throw new Error("Response API tidak valid.");
      }

      let images = data.data;

      for (let i = 0; i < count; i++) {
        let image = images[Math.floor(Math.random() * images.length)].images_url;
        setTimeout(() => {
          conn.sendFile(m.chat, image, '', '🔖R A N D O M   J K T 4 8', m);
        }, i * 5000);
      }
    } catch (error) {
      console.error(error);
      conn.reply(m.chat, 'Terjadi kesalahan saat menjalankan perintah.', m);
    }
  }
};

handler.help = ['jkt48'];
handler.tags = ['tools','random','internet'];
handler.command = /^(jkt48)$/i;

export default handler;