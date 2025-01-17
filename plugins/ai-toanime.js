import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
    const wait = "Tunggu sebentar, proses sedang berjalan...";

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        await conn.reply(m.chat, wait, m);

        try {
            const img = await q.download?.();
            if (!img) throw new Error("Gagal mendownload gambar.");

            let out = await uploadImage(img);

            let old = new Date();

            let res = await fetch(`https://api.betabotz.eu.org/api/maker/jadianime?url=${out}&apikey=${global.lann}`);
            let convert = await res.json();

            if (!convert.result) throw new Error("API tidak mengembalikan hasil yang valid.");

            let buff = await fetch(convert.result.img_crop_single).then(res => res.buffer());

            await conn.sendMessage(m.chat, { image: buff, caption: `🍟 *Fetching* : ${((new Date - old) * 1)} ms` }, { quoted: m });

        } catch (e) {
            console.log(e);
            m.reply(`[ ! ] Identifikasi Gagal: ${e.message}`);
        }
    } else {
        m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`);
    }
};

handler.help = ['jadianime'];
handler.command = ['toanime', 'jadianime'];
handler.tags = ['ai'];
handler.limit = 5;

export default handler;