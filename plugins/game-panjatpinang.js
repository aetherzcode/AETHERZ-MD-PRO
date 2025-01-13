/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
const handler = async (m, { conn, usedPrefix, args, command }) => {
  // Inisialisasi objek panjatPinangRooms jika belum ada
  conn.panjatPinangRooms = conn.panjatPinangRooms || {};

  // Daftar hadiah
  const rewards = [
    "Smartphone", "Laptop", "Headphone", "Smartwatch", "Tablet",
    "Kamera", "Power Bank", "Earbuds", "Speaker Bluetooth", "Gadget Gaming"
  ];

  // Handle perintah tanpa argumen atau dengan argumen 'help'
  if (!args[0] || args[0] === "help") {
    const message = `*❏ PANJAT PINANG🎉*

• ${usedPrefix}pp create (buat room) 
• ${usedPrefix}pp join (player join, taruhan 1000000)
• ${usedPrefix}pp player (daftar pemain yang bergabung)
• ${usedPrefix}pp mulai (mulai game)
• ${usedPrefix}pp delete (hapus sesi room game)

Minimal 2 pemain untuk memulai game.

Taruhan: 1000000
Hadiah: Barang-barang menarik seperti Smartphone, Laptop, dan lainnya.`;
    await conn.sendMessage(m.chat, {
      text: message,
      contextInfo: {
        externalAdReply: {
          title: wm,
          body: 'Ayo ikut dan menangkan hadiahnya!',
          thumbnailUrl: 'https://telegra.ph/file/d3366813c259e145c24c1.jpg',
          sourceUrl: link.web,
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
      // Logika untuk membuat room
      if (conn.panjatPinangRooms[m.chat]) {
        return m.reply('Room sudah ada.');
      }
      conn.panjatPinangRooms[m.chat] = {
        players: [],
        gameStarted: false,
        bank: 0 // Inisialisasi bank untuk taruhan
      };
      m.reply('Room berhasil dibuat. Pemain sekarang bisa bergabung.');
      break;

    case 'join':
      // Logika agar pemain bergabung ke room
      if (!conn.panjatPinangRooms[m.chat]) {
        return m.reply('Belum ada room yang dibuat. Gunakan .pp create untuk membuat room.');
      }
      if (conn.panjatPinangRooms[m.chat].gameStarted) {
        return m.reply('Game sudah dimulai. Tidak bisa bergabung sekarang.');
      }
      if (conn.panjatPinangRooms[m.chat].players.find(p => p.id === m.sender)) {
        return m.reply('Anda sudah bergabung di room.');
      }
      const playerName = m.pushName || conn.getName(m.sender);
      conn.panjatPinangRooms[m.chat].players.push({ id: m.sender, name: playerName });
      conn.panjatPinangRooms[m.chat].bank += 1000000; // Tambahkan taruhan ke bank
      m.reply(`Anda berhasil bergabung di room. Anda telah memasang taruhan sebesar 1000000. Total taruhan: ${conn.panjatPinangRooms[m.chat].bank}`);
      break;

    case 'player':
      // Logika untuk daftar pemain yang bergabung
      if (!conn.panjatPinangRooms[m.chat]) {
        return m.reply('Belum ada room yang dibuat. Gunakan .pp create untuk membuat room.');
      }
      const players = conn.panjatPinangRooms[m.chat].players;
      m.reply(`Pemain yang bergabung: \n${players.map(p => `${p.name} (${p.id})`).join('\n')}`);
      break;

    case 'mulai':
      // Logika untuk memulai game
      if (!conn.panjatPinangRooms[m.chat]) {
        return m.reply('Belum ada room yang dibuat. Gunakan .pp create untuk membuat room.');
      }
      if (conn.panjatPinangRooms[m.chat].players.length < 2) {
        return m.reply('Minimal 2 pemain untuk memulai game.');
      }
      conn.panjatPinangRooms[m.chat].gameStarted = true;
      m.reply('Game dimulai! Setiap pemain akan mendapatkan hadiah barang secara acak.');

      // Jeda 5 detik sebelum memberikan hadiah
      setTimeout(() => {
        conn.panjatPinangRooms[m.chat].players.forEach(player => {
          const reward = rewards[Math.floor(Math.random() * rewards.length)];
          m.reply(`Selamat ${player.name}! Anda mendapatkan hadiah berupa ${reward}.`);
        });

        // Bersihkan room setelah permainan selesai
        delete conn.panjatPinangRooms[m.chat];
      }, 5000); // Jeda 5 detik untuk simulasi permainan
      break;

    case 'delete':
      // Logika untuk menghapus room
      if (!conn.panjatPinangRooms[m.chat]) {
        return m.reply('Belum ada room yang dibuat.');
      }
      delete conn.panjatPinangRooms[m.chat];
      m.reply('Room telah dihapus.');
      break;

    default:
      m.reply('Perintah tidak dikenal. Gunakan .pp help untuk melihat daftar perintah.');
  }
};

handler.help = ['panjatpinang']
handler.tags = ['game']
handler.command = /^(panjatpinang|pp)$/i
handler.group = true
export default handler;

