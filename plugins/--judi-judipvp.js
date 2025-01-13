const items = ['money', 'chip', 'koin'];

let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.judipvp = conn.judipvp || {};
    if (Object.values(conn.judipvp).find(room => room.id.startsWith('judipvp') && [room.p, room.p2].includes(m.sender))) throw 'Selesaikan judi mu yang sebelumnya';
    if (Object.values(conn.judipvp).find(room => room.id.startsWith('judipvp') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `Orang yang kamu tantang sedang bermain judipvp bersama orang lain :(`;

    let musuh = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
    let user = global.db.data.users;
    let type = (args[0] || '').toLowerCase();
    let count = (args[1] && number(parseInt(args[1])) ? Math.max(parseInt(args[1]), 1) : /all/i.test(args[1]) ? Math.floor(user[m.sender][type]) : 1) * 1;
    let id = 'judipvp_' + new Date().getTime();

    if (!items.includes(type)) return m.reply('Item yang tersedia\n• Money\n• Chip\n• Koin');
    if (user[m.sender][type] < count) return m.reply(`${type} kamu tidak cukup!`);
    if (!count || !musuh) return m.reply(`Masukan format dengan benar\n\nContoh :\n${usedPrefix + command} money 10000 @${m.sender.split('@')[0]}`);

    conn.judipvp[id] = {
        chat: await conn.reply(m.chat, `@${m.sender.split('@')[0]} Mengajak @${musuh.split('@')[0]} Berjudi dengan ${count} ${type}. Apakah Kamu Mau Menerimanya? (Y/N)`, m, {
            contextInfo: { mentionedJid: [m.sender, musuh] }
        }),
        id: id,
        p: m.sender,
        p2: musuh,
        type: type,
        status: 'wait',
        taruhan: count,
        waktu: setTimeout(() => {
            if (conn.judipvp[id]) {
                conn.reply(m.chat, `_Waktu judi habis_`, m);
                delete conn.judipvp[id];
            }
        }, 60000)
    };
};

export async function before(m) {
    this.judipvp = this.judipvp || {};
    let room = Object.values(this.judipvp).find(room => room.id.startsWith('judipvp') && room.status && [room.p, room.p2].includes(m.sender));
    let user = global.db.data.users;

    if (room) {
        if (m.sender == room.p2 && /^(y(es)?|n(o)?)$/i.test(m.text.toLowerCase()) && m.isGroup && room.status == 'wait') {
            if (/^n(o)?$/i.test(m.text.toLowerCase())) {
                this.reply(m.chat, `@${room.p2.split('@')[0]} menolak judipvp, judipvp dibatalkan`, m, { contextInfo: { mentionedJid: [room.p2] } });
                delete this.judipvp[room.id];
                return !0;
            }

            if (user[room.p2][room.type] < room.taruhan) return m.reply(`Uang Kamu Kurang! Kamu membutuhkan ${room.taruhan} ${room.type}`);
            if (user[room.p][room.type] < room.taruhan) return m.reply(`Uang Lawanmu Kurang! membutuhkan ${room.taruhan} ${room.type}`);

            clearTimeout(room.waktu);
            room.status = 'spin';
            room.asal = m.chat;
            room.spin = room.p;

            await this.reply(room.asal, `Silahkan Spin @${room.p.split('@')[0]}\n\nSpin dengan cara ketik *Spin/Judi*`, m, { contextInfo: { mentionedJid: [room.p] } });

            room.waktu = setTimeout(() => {
                this.reply(m.chat, `Waktu habis @${room.spin.split('@')[0]} Tidak menjawab`, m, { contextInfo: { mentionedJid: [room.spin] } });
                delete this.judipvp[room.id];
            }, 60000);
        } else if (room.status == 'spin' && /spin|judi/i.test(m.text)) {
            if (m.sender !== room.spin) return m.reply('Sekarang bukan giliran kamu');
            if (user[room.spin][room.type] < room.taruhan) return m.reply(`Uang Kamu Kurang! Kamu membutuhkan ${room.taruhan} ${room.type}`);
            if (user[room.p2][room.type] < room.taruhan) return m.reply(`Uang Lawanmu Kurang! membutuhkan ${room.taruhan} ${room.type}`);

            clearTimeout(room.waktu);
            room.score = Math.ceil(Math.random() * 100);
            room.status = 'spinp';
            room.spin = room.p2;

            room.waktu = setTimeout(() => {
                this.reply(m.chat, `Waktu habis @${room.spin.split('@')[0]} Tidak menjawab`, m, { contextInfo: { mentionedJid: [room.spin] } });
                delete this.judipvp[room.id];
            }, 60000);

            this.reply(room.asal, `@${m.sender.split('@')[0]} Berhasil mendapatkan score ${room.score}\nSekarang giliran @${room.p2.split('@')[0]} untuk spin\n\nSilahkan ketik *Spin/Judi* Untuk spin`, m, { contextInfo: { mentionedJid: [room.p, room.p2] } });
        } else if (room.status == 'spinp' && /spin|judi/i.test(m.text)) {
            if (m.sender !== room.spin) return m.reply(room.asal, 'Sekarang bukan giliranmu!', m);
            if (user[room.spin][room.type] < room.taruhan) return m.reply(`Uang Kamu Kurang! Kamu membutuhkan ${room.taruhan} ${room.type}`);
            if (user[room.p][room.type] < room.taruhan) return m.reply(`Uang Lawanmu Kurang! membutuhkan ${room.taruhan} ${room.type}`);

            clearTimeout(room.waktu);
            let score2 = Math.ceil(Math.random() * 100);
            let resultMessage;

            if (room.score < score2) {
                user[room.p2][room.type] += room.taruhan;
                user[room.p][room.type] -= room.taruhan;
                room.win = room.p2;
                resultMessage = `Pemenangnya adalah @${room.win.split('@')[0]} dan mendapatkan ${room.taruhan} ${room.type}`;
            } else if (room.score > score2) {
                user[room.p2][room.type] -= room.taruhan;
                user[room.p][room.type] += room.taruhan;
                room.win = room.p;
                resultMessage = `Pemenangnya adalah @${room.win.split('@')[0]} dan mendapatkan ${room.taruhan} ${room.type}`;
            } else {
                room.win = 'draw';
                resultMessage = `Draw! Masing-masing mendapatkan ${room.taruhan} ${room.type}`;
            }

            this.reply(room.asal, `
| *PLAYERS* | *POINT* |
*👤 @${room.p.split('@')[0]} :* ${room.score}
*👤 @${room.p2.split('@')[0]} :* ${score2}

${resultMessage}
`.trim(), m, { contextInfo: { mentionedJid: [room.p, room.p2] } });

            delete this.judipvp[room.id];
        }
        return !0;
    }
    return !0;
}

const delay = time => new Promise(res => setTimeout(res, time));

function number(x = 0) {
    x = parseInt(x);
    return !isNaN(x);
}

handler.help = ['judipvp'];
handler.tags = ['judi'];
handler.command = /^(judipvp)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;
