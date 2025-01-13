import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, args }) => {
    conn.kpopGuessRooms = conn.kpopGuessRooms || {};

    if (!args[0] || args[0] === "help") {
        const message = `*❏ TEBAK GAMBAR KPOP 🎤*

• ${usedPrefix}*tebakkpop create* (buat room dengan gambar acak)
• ${usedPrefix}*tebakkpop join* (player join ke room)
• ${usedPrefix}*tebakkpop gambar* (tampilkan gambar yang akan ditebak)
• ${usedPrefix}*tebakkpop tebak* <jawaban> (player menebak siapa pada gambar)
• ${usedPrefix}*tebakkpop player* (daftar pemain yang bergabung dan jawaban mereka)
• ${usedPrefix}*tebakkpop mulai* (mulai permainan dan ungkap jawaban sebenarnya)
• ${usedPrefix}*tebakkpop delete* (hapus sesi room game)

Tebak siapa yang ada di gambar!
Minimal player yang bergabung untuk memulai game adalah 2 pemain.`;

        await conn.sendMessage(m.chat, {
            text: message,
            contextInfo: {
                externalAdReply: {
                    title: "Game Tebak Gambar Kpop",
                    body: 'TEBAK GAMBAR KPOP 🎤',
                    thumbnailUrl: global.aetherzjpg,
                    sourceUrl: link.web,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
        return;
    }

    try {
        switch (args[0].toLowerCase()) {
            case 'create':
                if (conn.kpopGuessRooms[m.chat]) {
                    return m.reply('Room sudah ada. Gunakan .tebakkpop delete untuk menghapus room yang ada.');
                }

                const response = await fetch('https://raw.githubusercontent.com/VynaaValerie/mlbb/main/Kpop-image/image-kpop.json');
                const images = await response.json();
                const randomImage = images[Math.floor(Math.random() * images.length)];
                conn.kpopGuessRooms[m.chat] = {
                    creator: m.sender,
                    players: [],
                    gameStarted: false,
                    image: randomImage
                };

                m.reply(`Room berhasil dibuat. Gunakan ${usedPrefix}tebakkpop gambar untuk melihat gambar yang akan ditebak.`);

                break;

            case 'join':
                if (!conn.kpopGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat. Gunakan .tebakkpop create untuk membuat room.');
                }
                if (conn.kpopGuessRooms[m.chat].players.find(p => p.id === m.sender)) {
                    return m.reply('Anda sudah bergabung di room.');
                }
                const playerName = m.pushName || conn.getName(m.sender);
                conn.kpopGuessRooms[m.chat].players.push({ id: m.sender, name: playerName, guess: null });
                m.reply(`Anda berhasil bergabung di room.`);
                break;

            case 'gambar':
                if (!conn.kpopGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat. Gunakan .tebakkpop create untuk membuat room.');
                }
                const image = conn.kpopGuessRooms[m.chat].image;
                await conn.sendFile(m.chat, image.image, 'kpop.jpg', `Ini adalah gambar dari Kpop: ${image.question}\n\nSilakan gunakan ${usedPrefix}tebakkpop tebak <jawaban> untuk menebak siapa mereka.`, m);
                break;

            case 'tebak':
                if (!conn.kpopGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat. Gunakan .tebakkpop create untuk membuat room.');
                }
                if (!args[1]) {
                    return m.reply('Harap masukkan jawaban Anda.');
                }
                const player = conn.kpopGuessRooms[m.chat].players.find(p => p.id === m.sender);
                if (!player) {
                    return m.reply('Anda belum bergabung di room. Gunakan .tebakkpop join untuk bergabung.');
                }
                player.guess = args.slice(1).join(" ").toLowerCase();
                m.reply(`Jawaban Anda "${player.guess}" telah diterima.`);
                break;

            case 'player':
                if (!conn.kpopGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat. Gunakan .tebakkpop create untuk membuat room.');
                }
                const players = conn.kpopGuessRooms[m.chat].players;
                m.reply(`Pemain yang bergabung:\n${players.map(p => `${p.name} - ${p.guess ? p.guess : 'belum menjawab'}`).join('\n')}`);
                break;

            case 'mulai':
                if (!conn.kpopGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat. Gunakan .tebakkpop create untuk membuat room.');
                }
                if (conn.kpopGuessRooms[m.chat].players.length < 2) {
                    return m.reply('Minimal 2 pemain untuk memulai game.');
                }
                if (conn.kpopGuessRooms[m.chat].gameStarted) {
                    return m.reply('Game sudah dimulai.');
                }
                if (conn.kpopGuessRooms[m.chat].creator !== m.sender) {
                    return m.reply('Hanya pembuat room yang dapat memulai game.');
                }

                conn.kpopGuessRooms[m.chat].gameStarted = true;

                m.reply('Jawaban akan diungkap dalam 5 detik! 🎤');

                setTimeout(() => {
                    m.reply('3... 🎤');
                    setTimeout(() => {
                        m.reply('2... 🎤');
                        setTimeout(() => {
                            m.reply('1... 🎤');
                            setTimeout(() => {
                                const currentRoom = conn.kpopGuessRooms[m.chat];
                                const correctAnswer = currentRoom.image.answer;
                                const winners = currentRoom.players.filter(player => player.guess && player.guess === correctAnswer);

                                if (winners.length > 0) {
                                    m.reply(`Jawaban yang benar adalah "${correctAnswer}"!\nPemenangnya adalah:\n${winners.map(w => w.name).join(', ')}\nSelamat! 🎉`);
                                } else {
                                    m.reply(`Tidak ada yang menebak dengan benar. Jawaban yang benar adalah "${correctAnswer}".`);
                                }

                                delete conn.kpopGuessRooms[m.chat];
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 2000);
                break;

            case 'delete':
                if (!conn.kpopGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat.');
                }
                if (conn.kpopGuessRooms[m.chat].creator !== m.sender) {
                    return m.reply('Hanya pembuat room yang dapat menghapus room.');
                }
                delete conn.kpopGuessRooms[m.chat];
                m.reply('Room telah dihapus.');
                break;

            default:
                m.reply('Perintah tidak dikenal. Gunakan .tebakkpop help untuk melihat daftar perintah.');
        }
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan, coba lagi nanti.');
    }
};

handler.help = ['tebakkpop']
handler.tags = ['game']
handler.command = /^(tebakkpop)$/i
handler.group = true

export default handler;