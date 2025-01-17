import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Masukkan username TikTok!*\n\n*Contoh:*\n*${usedPrefix + command} betabotzz*`;

    try {
        console.log(`Fetching TikTok data for username: ${text}`);
        const apiUrl = `https://api.betabotz.eu.org/api/stalk/tt?username=${text}&apikey=${global.lann}`;
        const response = await axios.get(apiUrl);
        console.log('API Response:', response.data);

        const result = response.data.result;
        if (!result) throw 'Data pengguna tidak ditemukan. Pastikan username yang dimasukkan benar.';

        const caption = `
👤 *Username:* ${result.username}
📜 *Deskripsi:* ${result.description || 'Tidak ada deskripsi'}
❤ *Likes:* ${result.likes}
👥 *Followers:* ${result.followers}
👤 *Following:* ${result.following}
📹 *Total Posts:* ${result.totalPosts}
`.trim();

        const avatar = await axios.get(result.profile, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, avatar.data, 'avatar.jpg', caption, m);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw `Terjadi kesalahan saat mengambil data pengguna TikTok. Pastikan username yang dimasukkan benar.`;
    }
};

handler.help = ['tiktokstalk'];
handler.tags = ['tools'];
handler.command = /^(stalktiktok|stalktt|tiktokstalk|ttstalk)$/i;

export default handler;