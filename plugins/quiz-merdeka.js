import fetch from 'node-fetch';

let timeout = 120000;
let poin = 4999;

let handler = async (m, { conn, command, usedPrefix }) => {
    conn.game = conn.game ? conn.game : {};
    let id = 'quizmerdeka-' + m.chat;
    if (id in conn.game) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.game[id][0]);

    let response = await fetch('https://raw.githubusercontent.com/VynaaValerie/mlbb/main/merdeka.json');
    let src = await response.json();
    let json = src[Math.floor(Math.random() * src.length)];

    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}tamer untuk bantuan
Bonus: ${poin} XP
`.trim();

    conn.game[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(() => {
            if (conn.game[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.game[id][0]);
            delete conn.game[id];
        }, timeout)
    ];
};

handler.help = ['quizmerdeka'];
handler.tags = ['game'];
handler.command = /^quizmerdeka$/i;

handler.onlyprem = true;
handler.game = true;

export default handler;