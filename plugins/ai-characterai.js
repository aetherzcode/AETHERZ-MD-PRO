import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  if (command == 'rimuru') {
    if (!text) return conn.reply(m.chat, `.${command} hallo rimuru`, m);
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
    apikey: "Salsa"
    let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=rimuru`);
    let kemii = await res.json();
    conn.reply(m.chat, `${kemii.result}`, m);
  }
};

handler.help = ['rimuru', 'kemii', 'jokowi', 'megawati', 'yaemiko', 'paimon', 'kiku', 'putin', 'lisa'].map(v => v + ' *<teks>*');
handler.command = /^rimuru|kemii|jokowi|megawati|yaemiko|paimon|kiku|putin|lisa$/i;
handler.tags = ['ai'];
handler.limit = true;

export default handler;
