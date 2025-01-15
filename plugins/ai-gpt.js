import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
  const wait = "_「P R O C E S S 」_";

  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?`;

  try {
    await m.reply(wait);

    const response = await fetch(`https://api.ryzendesu.vip/api/ai/chatgpt?text=${encodeURIComponent(text)}`);
    console.log("Status:", response.status);

    if (!response.ok) throw `Error: ${response.status} - ${response.statusText}`;

    const res = await response.json(); 
    console.log("Parsed Respons:", res);

    if (!res.success || !res.response) throw "API tidak mengembalikan pesan yang valid.";

    await m.reply(res.response);
  } catch (err) {
    console.error("Error:", err);
    throw "Terjadi kesalahan dalam menjawab pertanyaan.";
  }
};

handler.command = handler.help = ['ai', 'openai', 'chatgpt'];
handler.tags = ['tools'];
handler.limit = true;

export default handler;