let handler = async (m, { conn, usedPrefix, command, args }) => {
    let err = `
Contoh:
${usedPrefix + command} <nama_akun_panel_atau_nomor>
${usedPrefix + command} radit atau 6282389924037
`.trim();
    
    if (!args[0]) throw err;
    
    try {
        let input = args[0].toLowerCase(); // Konversi input ke huruf kecil untuk pencocokan tanpa memperdulikan huruf besar atau kecil
        
        // Tentukan detail akun
        let accounts = [
            { nama: "selingkuhan", tgl: "28 Juni", nomor: "6282170783131" },
            { nama: "riantzy", tgl: "24 Juni", nomor: "6285812683092" },
            { nama: "Goodboy", tgl: "24 Juni", nomor: "6281214673344" },
            { nama: "cessitzy", tgl: "23 Juni", nomor: "6281292584379" },
            { nama: "jadibotv3", tgl: "21 Juni", nomor: "6289520147392" },
            { nama: "morax", tgl: "21 Juni", nomor: "6285936650988" },
            { nama: "xxxxx", tgl: "27 Juli", nomor: "6289699963878" },
            { nama: "masmasman", tgl: "20 Juni", nomor: "6285234735596" },
            { nama: "saorisaustiram", tgl: "18 Juni", nomor: "6282323719429" },
            { nama: "Cname", tgl: "18 Juni", nomor: "62895403843835" },
            { nama: "rizepic", tgl: "18 Juni", nomor: "6281775248861" },
            { nama: "xixixi", tgl: "27 Juli", nomor: "6285161300509" },
            { nama: "hasan", tgl: "16 Juni", nomor: "6289529193659" },
            { nama: "exam", tgl: "16 Juni", nomor: "6285946896567" },
            { nama: "inesee", tgl: "14 Juni", nomor: "62895801188080" },
            { nama: "melzstore", tgl: "13 Juni", nomor: "60178920745" },
            { nama: "daffaxml", tgl: "5 Juni", nomor: "6285736486023" },
            { nama: "yaemikokayla", tgl: "5 Juni", nomor: "62882008078024" },
            { nama: "loli", tgl: "4 Juni", nomor: "6281267187125" },
            { nama: "yanefef", tgl: "7 Juni", nomor: "6285183005530" },
            { nama: "rioburung", tgl: "28 Juni", nomor: "6281292382985" },
            { nama: "Iky SG kayu", tgl: "4 Juli", nomor: "6289670540908" },
            { nama: "ikyfreefire", tgl: "4 Juli", nomor: "6282213982155" },
            { nama: "rianff", tgl: "4 Juni", nomor: "628994568974" },
            { nama: "luxxy 2", tgl: "2 Juni", nomor: "6281933994846" },
            { nama: "siakkkk", tgl: "2 Juni", nomor: "6285735050126" },
            { nama: "radit", tgl: "5 Juli", nomor: "6285762592822" },
            { nama: "aasep", tgl: "5 Juli", nomor: "6285792536058" },
            { nama: "wahid", tgl: "25 Juni", nomor: "6285776675555" },
            { nama: "luxxxy", tgl: "20 Juni", nomor: "6281933994846" },
            { nama: "kezien15", tgl: "20 Juni", nomor: "6285386542211" },
            { nama: "yulbotz", tgl: "10 Juni", nomor: "6282170838781" },
            { nama: "yasstoreggfamosmintathrdong", tgl: "15 Juni", nomor: "6285156533724" },
            { nama: "jadiboti", tgl: "15 Juni", nomor: "6285814340277" },
            { nama: "freshtea", tgl: "28 Juni", nomor: "6282350106044" },
            { nama: "ilhamxd", tgl: "27 Juni", nomor: "6285183819035" },
            { nama: "salsaabila", tgl: "30 Juni", nomor: "6285766334794" }
        ];
        
        // Periksa apakah input cocok dengan salah satu akun
        let account = accounts.find(acc => acc.nama.toLowerCase() === input || acc.nomor === input);
        
        // Jika tidak ada akun yang cocok ditemukan, kirim pesan error
        if (!account) throw "Akun tidak ditemukan";
        
        // Buat pesan detail akun
        let detailAkun = `
Data Expired
Nama: ${account.nama}
Tgl: ${account.tgl}
Nomor: ${account.nomor}
        
Noted 
Mohon untuk kesadarannya jika panel kamu ingin tetap aktif dan database tidak hilang segera perpanjang jika masa sewa panel kamu telah habis hubungi admin
wa.me/6282389924037`;

        // Kirim pesan dengan detail akun
        await m.reply(detailAkun);
        
    } catch (e) {
        throw err;
    }
};

handler.help = ['cekexp'];
handler.tags = ['tools'];
handler.command = /^(cekexp|cekpanel)$/i;
handler.limit = true;
handler.group = true;
handler.register = true;

export default handler;