import axios from 'axios';

const handler = async (m, { conn, text, prefix, command }) => {
  if (!text) {
    return m.reply(`Masukkan username Instagram\n\nContoh:\n${prefix + command} vreden`);
  }

  await conn.sendMessage(m.chat, {
    react: {
      text: "⏱️",
      key: m.key,
    },
  });

  try {
    const response = await axios.get(`https://api.vreden.web.id/api/igstalk?query=${text}`);
    const { result } = response.data;

    await conn.sendMessage(m.chat, {
      image: {
        url: result.image,
      },
      caption: `*INSTA STALKER*\n\n` +
        `*Nickname :* ${result.user.username}\n` +
        `*Fullname :* ${result.user.full_name}\n` +
        `*Postingan :* ${result.user.media_count}\n` +
        `*Followers :* ${result.user.follower_count}\n` +
        `*Following :* ${result.user.following_count}\n` +
        `*Jenis Akun:* ${result.user.is_business ? "Bisnis" : 'Pribadi'}\n` +
        `*Bio :*\n${result.user.biography || 'Tidak ada bio.'}`,
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply("Tidak dapat menemukan username atau terjadi kesalahan pada API.");
  }
};

handler.help = ['igstalk2 <username>'];
handler.tags = ['tools'];
handler.command = ['igstalk2'];
handler.limit = true;

export default handler;