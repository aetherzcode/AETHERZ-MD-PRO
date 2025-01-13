const handler = async (m, { conn, usedPrefix, args, command }) => {
  // Inisialisasi objek rocketRooms dan rocketGuesses jika belum ada
  conn.rocketRooms = conn.rocketRooms || {};
  conn.rocketGuesses = conn.rocketGuesses || {};

  // Fungsi untuk menghitung jarak tebakan
  const calculateDifference = (guess, actual) => Math.abs(guess - actual);

  // Handle perintah tanpa argumen atau dengan argumen 'help'
  if (!args[0] || args[0] === "help") {
    const message = `*❏ TEBAK TINGGI ROKET🚀*

• ${usedPrefix}roket create (buat room)
• ${usedPrefix}roket join <tebakan> (player join dan masukkan tebakan dalam meter)
• ${usedPrefix}roket player (daftar pemain yang bergabung dan tebakan mereka)
• ${usedPrefix}roket launch (luncurkan roket)
• ${usedPrefix}roket delete (hapus sesi room game)

Tebak seberapa tinggi roket akan terbang!

Minimal player yang bergabung untuk memulai game adalah 2 pemain.`;

    await conn.sendMessage(m.chat, {
      text: message,
      contextInfo: {
        externalAdReply: {
          title: wm,
          body: 'TEBAK TINGGI ROKET🚀',
          thumbnailUrl: global.aetherzjpg, // URL gambar thumbnail
          sourceUrl: link.web, // URL sumber yang ditampilkan ketika thumbnail diklik
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
    return;
  }

  // Logika berdasarkan argumen pertama
  switch (args[0].toLowerCase()) {
    case 'create':
      if (conn.rocketRooms[m.chat]) {
        return m.reply('Room sudah ada.');
      }
      conn.rocketRooms[m.chat] = {
        players: [],
        gameStarted: false
      };
      m.reply('Room berhasil dibuat. Pemain sekarang bisa bergabung dengan memasukkan tebakan.');
      break;

    case 'join':
      if (!conn.rocketRooms[m.chat]) {
        return m.reply('Belum ada room yang dibuat. Gunakan .roket create untuk membuat room.');
      }
      if (conn.rocketRooms[m.chat].gameStarted) {
        return m.reply('Game sudah dimulai. Tidak bisa bergabung sekarang.');
      }
      if (conn.rocketRooms[m.chat].players.find(p => p.id === m.sender)) {
        return m.reply('Anda sudah bergabung di room.');
      }
      if (!args[1] || isNaN(args[1])) {
        return m.reply('Harap masukkan tebakan dalam meter.');
      }
      const playerName = m.pushName || conn.getName(m.sender);
      const guess = parseFloat(args[1]);
      conn.rocketRooms[m.chat].players.push({ id: m.sender, name: playerName, guess });
      m.reply(`Anda berhasil bergabung di room dengan tebakan ${guess} meter.`);
      break;

    case 'player':
      if (!conn.rocketRooms[m.chat]) {
        return m.reply('Belum ada room yang dibuat. Gunakan .roket create untuk membuat room.');
      }
      const players = conn.rocketRooms[m.chat].players;
      m.reply(`Pemain yang bergabung:\n${players.map(p => `${p.name} - ${p.guess} meter`).join('\n')}`);
      break;

    case 'launch':
      if (!conn.rocketRooms[m.chat]) {
        return m.reply('Belum ada room yang dibuat. Gunakan .roket create untuk membuat room.');
      }
      if (conn.rocketRooms[m.chat].players.length < 2) {
        return m.reply('Minimal 2 pemain untuk memulai game.');
      }
      if (conn.rocketRooms[m.chat].gameStarted) {
        return m.reply('Game sudah dimulai.');
      }

      conn.rocketRooms[m.chat].gameStarted = true;

      m.reply('Roket akan diluncurkan dalam 5 detik! 🚀');
      
      setTimeout(() => {
        m.reply('3... 🚀');
        setTimeout(() => {
          m.reply('2... 🚀');
          setTimeout(() => {
            m.reply('1... 🚀');
            setTimeout(() => {
              // Tentukan tinggi roket secara acak
              const actualHeight = Math.floor(Math.random() * 1000) + 1; // Tinggi antara 1 dan 1000 meter
              const currentRoom = conn.rocketRooms[m.chat];
              let closestPlayer = null;
              let smallestDifference = Infinity;

              currentRoom.players.forEach(player => {
                const difference = calculateDifference(player.guess, actualHeight);
                if (difference < smallestDifference) {
                  closestPlayer = player;
                  smallestDifference = difference;
                }
              });

              m.reply(`Roket diluncurkan setinggi ${actualHeight} meter! 🚀\nPemenangnya adalah ${closestPlayer.name} dengan tebakan ${closestPlayer.guess} meter.\nSelamat! 🎉`);

              // Bersihkan room dan tebakan setelah pertandingan selesai
              delete conn.rocketRooms[m.chat];
              delete conn.rocketGuesses[m.chat];
            }, 1000);
          }, 1000);
        }, 1000);
      }, 2000);
      break;

    case 'delete':
      if (!conn.rocketRooms[m.chat]) {
        return m.reply('Belum ada room yang dibuat.');
      }
      delete conn.rocketRooms[m.chat];
      delete conn.rocketGuesses[m.chat];
      m.reply('Room telah dihapus.');
      break;

    default:
      m.reply('Perintah tidak dikenal. Gunakan .roket help untuk melihat daftar perintah.');
  }
};

handler.help = ['tebaktinggiroket']
handler.tags = ['game']
handler.command = /^(tebaktinggiroket|roket)$/i
handler.group = true
export default handler;
