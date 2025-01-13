import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Nyari Apa?';
  let res = await fetch('https://api.lolhuman.xyz/api/doujindesu?apikey=GataDios&url=https://doujindesu.xxx/2021/01/18/queen-bee-chapter-33');
  
  if (!res.ok) throw 'Terjadi kesalahan saat mengambil data.';
  
  let json = await res.json();
  
  if (!json || !json.result) throw 'Tidak ada data yang ditemukan.';
  
  let title = json.result.title;
  let link_dl = json.result.link_dl;
  
  let data = `*Title:* ${title}\n*Download Link:* ${link_dl}`;
  
  conn.reply(m.chat, data, m);
};

handler.help = ['doujinsearch'];
handler.tags = ['anime'];
handler.command = /^(doujinsearch)$/i;
handler.premium = true;

export default handler;