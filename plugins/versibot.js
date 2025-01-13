import fs from 'fs';

let handler = async (m, { conn, args, command }) => {
  // Menyaring fitur-fitur yang aktif dari plugins
  let activeFeatures = Object.values(plugins)
    .filter(v => v.help && !v.disabled)
    .map(v => v.help)
    .flat(1);

  // Menghitung total fitur yang tersedia
  let totalFeatures = Object.values(global.plugins)
    .filter(v => v.help && v.tags)
    .length;

  // Menampilkan pesan yang lebih menarik bersama dengan informasi bot
  await m.reply(`Hai! Saya adalah bot versi *${global.versibot}*. Saya hadir untuk membantu Anda dalam berbagai hal! 😊

📂 Total fitur yang tersedia: *${totalFeatures.toLocaleString()}*

Ingin tahu lebih banyak? Kunjungi kami di:
🌐 Owner Resmi: [ https://wa.me/6285798045817 ]
📺 Owner Instagram: [ https://instagram.com/aetherz17_ ]
💻 Web Owner: [ https://aetherz.xyz ]
🛒 Web Bisnis: [ https://digistore.aetherz.xyz ]

Terima kasih telah menggunakan layanan kami! Jangan ragu untuk menanyakan sesuatu atau memberikan masukan. Selamat menggunakan!`);
};

// Menambahkan informasi bantuan, tag, dan perintah untuk handler
handler.help = ['versibot'];
handler.tags = ['main'];
handler.command = ['versibot'];

export default handler;