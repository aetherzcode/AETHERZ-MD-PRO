import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Sopo jeneng presiden amerika?`;

  let prompt = text; 
  let char = "Jawir"; 

  try {
    let cai = await fetch(`https://api.betabotz.eu.org/api/search/c-ai?prompt=${encodeURIComponent(prompt)}&char=${encodeURIComponent(char)}&apikey=${global.lann}`);
    let anu = await cai.json();

    if (anu.message) {
      m.reply(anu.message);
    } else {
      throw "Tidak ada hasil dari AI.";
    }
  } catch (e) {
    console.error(e);
    m.reply("Terjadi kesalahan saat memproses permintaan. Coba lagi.");
  }
};

handler.command = ['wir'];
handler.help = ['wir'];
handler.tags = ['aiv2'];
handler.limit = true;

export default handler;