import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';

const handler = async (m, { conn, args, usedPrefix }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'Send Reply Image';
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`;
    let img = await q.download();
    let url = await uploadImage(img);
    let response = args.join(' ').split('|');
    if (!args[0]) throw `.ktp No Nik|Provinsimu|cianjur, 02-07-2023|Name|Tgl Lahir|Kelamin|Alamat|RT/RW|Kel/Desa|Kecamatan|Agama|Status|Pekerjaan|Kwrgnegaraan|Berlaku`;
    let ktp = API('lol', '/api/ktpmaker', {
        nik: response[0] ? response[0] : 1,
        prov: response[1] ? response[1] : 2,
        kabu: response[2] ? response[2] : 3,
        name: response[3] ? response[3] : 4,
        ttl: response[4] ? response[4] : 5,
        jk: response[5] ? response[5] : 6,
        jl: response[6] ? response[6] : 7,
        rtrw: response[7] ? response[7] : 8,
        lurah: response[8] ? response[8] : 9,
        camat: response[9] ? response[9] : 10,
        agama: response[10] ? response[10] : 11,
        nikah: response[11] ? response[11] : 12,
        kerja: response[12] ? response[12] : 13,
        warga: response[13] ? response[13] : 14,
        until: response[14] ? response[14] : 15,
        img: url
    }, 'apikey');
    await conn.sendFile(m.chat, ktp, 'error.jpg', '```Success...\nDont forget to donate```', m, false);
};

handler.help = ['ktp2'];
handler.tags = ['maker'];
handler.command = /^(ktp2)$/i;
handler.premium = true;
export default handler;