import fs from 'fs'
let handler = async (m, { conn, usedPrefix }) => {
let teks = `
________________________________
________________________________
❏ _*PANEL RUN BOT*_
_📮RAM 1 GB CPU 50% RP 3.000 / BULAN_
_📮RAM 2 GB CPU 100% RP 4.000 / BULAN_
_📮RAM 3 GB CPU 125% RP 5.000 / BULAN_
_📮RAM 4 GB CPU 150% RP 6.000 / BULAN_
_📮RAM & CPU UNLIMITED 12.000/ BULAN_
_📮ADMIN PANEL RP 15.000 / BULAN_

Keuntungan beli panel di kami?
➠ Server terjaga 
➠ Jual kualitas bukan asal jual
➠ No mokad di pertengahan
➠ Hemat kuota 
➠ Hemat penyimpanan
➠ Web close? bot tetep on!
________________________________
________________________________
❏ _*SEDIA SC BOT WA*_
🌸 AETHERZBOTZ-MD
🌸 AETHERZBOTZ-PRO
🌸 AETHERZBOTZ-CPANEL-ORDERKUOTA

KEUNTUNGAN
-FREE UPDATE 
❏ Minat? Silahkan Chat Nomor Owner
https://wa.me/${owner[0][0]}
`.trim()
await conn.sendFile(m.chat, fs.readFileSync('./media/thumbnail.jpg'), ' .thumbnailjpeg', teks, m, false)
}
handler.help = ['allstore']
handler.tags = ['store']
handler.command = /^(storeall|allstore)$/i

export default handler