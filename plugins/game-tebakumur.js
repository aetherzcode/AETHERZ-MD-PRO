import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, args, command }) => {
    conn.ageGuessRooms = conn.ageGuessRooms || {};

    const calculateDifference = (guess, actual) => Math.abs(guess - actual);

    if (!args[0] || args[0] === "help") {
        const message = `*❏ TEBAK UMUR🎂*

• ${usedPrefix}*umur create* (buat room dengan tokoh acak)
• ${usedPrefix}*umur join* (player join ke room)
• ${usedPrefix}*umur foto* (tampilkan foto tokoh yang akan ditebak)
• ${usedPrefix}*umur tebak* <tebakan> (player menebak umur tokoh)
• ${usedPrefix}*umur player* (daftar pemain yang bergabung dan tebakan mereka)
• ${usedPrefix}*umur mulai* (mulai permainan dan ungkap umur sebenarnya)
• ${usedPrefix}*umur delete* (hapus sesi room game)

Tebak berapa umur tokoh terkenal!
Minimal player yang bergabung untuk memulai game adalah 2 pemain.`;

        await conn.sendMessage(m.chat, {
            text: message,
            contextInfo: {
                externalAdReply: {
                    title: "Game Tebak Umur",
                    body: 'TEBAK UMUR🎂',
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
                if (conn.ageGuessRooms[m.chat]) {
                    return m.reply('Room sudah ada. Gunakan .umur delete untuk menghapus room yang ada.');
                }

                const response = await fetch('https://raw.githubusercontent.com/VynaaValerie/ipku/main/umur.json');
                const people = await response.json();
                const randomPerson = people[Math.floor(Math.random() * people.length)];
                conn.ageGuessRooms[m.chat] = {
                    creator: m.sender,
                    players: [],
                    gameStarted: false,
                    person: randomPerson
                };

                m.reply(`Room berhasil dibuat. Gunakan ${usedPrefix}umur foto untuk melihat foto tokoh yang akan ditebak.`);

                break;

            case 'join':
                if (!conn.ageGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat. Gunakan .umur create untuk membuat room.');
                }
                if (conn.ageGuessRooms[m.chat].players.find(p => p.id === m.sender)) {
                    return m.reply('Anda sudah bergabung di room.');
                }
                const playerName = m.pushName || conn.getName(m.sender);
                conn.ageGuessRooms[m.chat].players.push({ id: m.sender, name: playerName, guess: null });
                m.reply(`Anda berhasil bergabung di room.`);
                break;

            case 'foto':
                if (!conn.ageGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat. Gunakan .umur create untuk membuat room.');
                }
                const person = conn.ageGuessRooms[m.chat].person;
                await conn.sendFile(m.chat, person.image, 'person.jpg', `Ini adalah gambar dari: ${person.nama}\n\nSilakan gunakan ${usedPrefix}umur tebak <umur> untuk menebak umurnya.`, m);
                break;

            case 'tebak':
                if (!conn.ageGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat. Gunakan .umur create untuk membuat room.');
                }
                if (!args[1] || isNaN(args[1])) {
                    return m.reply('Harap masukkan tebakan dalam tahun.');
                }
                const player = conn.ageGuessRooms[m.chat].players.find(p => p.id === m.sender);
                if (!player) {
                    return m.reply('Anda belum bergabung di room. Gunakan .umur join untuk bergabung.');
                }
                player.guess = parseFloat(args[1]);
                m.reply(`Tebakan Anda sebesar ${player.guess} tahun telah diterima.`);
                break;

            case 'player':
                if (!conn.ageGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat. Gunakan .umur create untuk membuat room.');
                }
                const players = conn.ageGuessRooms[m.chat].players;
                m.reply(`Pemain yang bergabung:\n${players.map(p => `${p.name} - ${p.guess ? p.guess + ' tahun' : 'belum menebak'}`).join('\n')}`);
                break;

            case 'mulai':
                if (!conn.ageGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat. Gunakan .umur create untuk membuat room.');
                }
                if (conn.ageGuessRooms[m.chat].players.length < 2) {
                    return m.reply('Minimal 2 pemain untuk memulai game.');
                }
                if (conn.ageGuessRooms[m.chat].gameStarted) {
                    return m.reply('Game sudah dimulai.');
                }
                if (conn.ageGuessRooms[m.chat].creator !== m.sender) {
                    return m.reply('Hanya pembuat room yang dapat memulai game.');
                }

                conn.ageGuessRooms[m.chat].gameStarted = true;

                m.reply('Umur akan diungkap dalam 5 detik! 🎂');

                setTimeout(() => {
                    m.reply('3... 🎂');
                    setTimeout(() => {
                        m.reply('2... 🎂');
                        setTimeout(() => {
                            m.reply('1... 🎂');
                            setTimeout(() => {
                                const currentRoom = conn.ageGuessRooms[m.chat];
                                const actualAge = parseFloat(currentRoom.person.umur);
                                let closestPlayer = null;
                                let smallestDifference = Infinity;

                                currentRoom.players.forEach(player => {
                                    if (player.guess !== null) {
                                        const difference = calculateDifference(player.guess, actualAge);
                                        if (difference < smallestDifference) {
                                            closestPlayer = player;
                                            smallestDifference = difference;
                                        }
                                    }
                                });

                                if (closestPlayer) {
                                    m.reply(`Umur sebenarnya adalah ${actualAge} tahun! 🎂\nPemenangnya adalah ${closestPlayer.name} dengan tebakan ${closestPlayer.guess} tahun.\nSelamat! 🎉`);
                                } else {
                                    m.reply('Tidak ada pemain yang menebak umur.');
                                }

                                delete conn.ageGuessRooms[m.chat];
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 2000);
                break;

            case 'delete':
                if (!conn.ageGuessRooms[m.chat]) {
                    return m.reply('Belum ada room yang dibuat.');
                }
                if (conn.ageGuessRooms[m.chat].creator !== m.sender) {
                    return m.reply('Hanya pembuat room yang dapat menghapus room.');
                }
                delete conn.ageGuessRooms[m.chat];
                m.reply('Room telah dihapus.');
                break;

            default:
                m.reply('Perintah tidak dikenal. Gunakan .umur help untuk melihat daftar perintah.');
        }
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan, coba lagi nanti.');
    }
};

handler.help = ['tebakumur']
handler.tags = ['game']
handler.command = /^(tebakumur|umur)$/i
handler.group = true

export default handler;
