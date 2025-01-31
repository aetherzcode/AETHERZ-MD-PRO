import fetch from 'node-fetch';

const handler = async (m, { args }) => {
    if (!args[0]) return m.reply('⚠️ Masukkan nomor yang ingin di-stalk! Contoh: .getcontact 628xxxx');

    const nomor = args[0].replace(/\D/g, '');
    const url = `${APIs.ryzen}/api/stalk/get-contact?number=${nomor}`;

    try {
        let res = await fetch(url);
        let data = await res.json();

        console.log('DEBUG API RESPONSE:', JSON.stringify(data, null, 2));

        if (!data || !data.result || !data.result.userData) {
            return m.reply('❌ Nomor tidak ditemukan atau tidak valid.');
        }

        let userData = data.result.userData;

        let info = `🔍 *Hasil Stalking WhatsApp*\n\n`;
        info += `📌 *Nomor:* ${userData.phone || nomor}\n`;
        info += `👤 *Nama:* ${userData.name || 'Tidak ditemukan'}\n`;
        info += `📶 *Provider:* ${userData.provider || 'Tidak diketahui'}\n`;

        m.reply(info);
    } catch (e) {
        console.error('ERROR FETCHING API:', e);
        m.reply('⚠️ Terjadi kesalahan saat mengambil data.');
    }
};

handler.command = /^getcontact$/i;
handler.help = ['getcontact 628xx'];
handler.tags = ['tools'];
handler.register = true;
handler.limit = 5;

export default handler;