import fs from 'fs'
let handler = async (m, { conn, usedPrefix }) => {
let teks = `❏「 _*SEWABOT*_ 」

❃ _*1 Minggu* Rp.8000 / Group_
❃ _*2 Minggu* 20.0000 / Group_
❃ _*2 Bulan* 30.000 / Group_
❃ _*3 Bulan* 50.000k / Group_

❏ *_Fitur_*
❃ _Antilink_
❃ _Welcome_
❃ _Enable_
❃ _Store List_
❃ _Promote/Demote_
❃ _HideTag_
❃ _Dan Lain Lain_

❏「 _*PREMIUM*_ 」
❃ _*1 Minggu:* Rp.5.000_
❃ _*2 Minggu:* Rp.10.000_
❃ _*1 Bulan:* Rp.20.000_
❃ _*3 Bulan:* Rp.30.000_

❏ keuntungan user premium?
🔓 unlock fitur *(Ketik .menuprem)*
🔓 limit Unlimited

❏ Minat? Silahkan Chat Nomor Owner
https://wa.me/${owner[0][0]}
`.trim()
await conn.sendFile(m.chat, fs.readFileSync('./media/thumbnail.jpg'), ' .thumbnailjpeg', teks, m, false)
}
handler.help = ['sewabot']
handler.tags = ['store']
handler.command = /^(sewabot|premium|sewa|prem)$/i

export default handler