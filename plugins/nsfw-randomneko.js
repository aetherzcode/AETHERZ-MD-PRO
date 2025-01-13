import fetch from 'node-fetch';

let handler = async (m, { conn, command }) => {
  try {
    let ne = await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt');
    if (!ne.ok) throw 'Failed to fetch data';

    let nekoList = await ne.text();
    let nekoArray = nekoList.split('\n');

    let randomIndex = Math.floor(Math.random() * nekoArray.length);
    let randomNekoURL = nekoArray[randomIndex];

    if (!randomNekoURL) throw 'Empty URL';

    conn.sendFile(m.chat, randomNekoURL, 'error.jpg', 'Nyaww~ 🐾💗', m);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

handler.command = /^(randomneko)$/i;
handler.tags = ['anime'];
handler.help = ['neko'];

export default handler;
