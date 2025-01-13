import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
let pp = await conn.profilePictureUrl(m.chat).catch(_ => null)

let krtu = `📍𝑰𝑵𝑻𝑹𝑶𝑶 𝑴𝑬𝑴 𝑩𝑨𝑹𝑼📍
╭─ׅ──ֹ━━━ׅ━⁞ ✶ ⁞━ׅ━━━ֹ──ׅ─╮
╠━ *𝐍𝐚𝐦𝐚*  ︎ ︎: 
╠━ *𝐔𝐦𝐮𝐫* ︎ ︎ ︎: 
╠━ *𝐂𝐨/𝐂𝐞* ︎ ︎: 
╠━ *𝐀𝐬𝐤𝐨𝐭*  ︎ ︎: 
╠━ *𝐇𝐨𝐛𝐢* ︎ ︎ ︎ ︎ ︎: 
╠━ *𝐒𝐭𝐚𝐭𝐮𝐬* : 
╰────────────────╯
∘₊✧──────☆───────✧₊∘
> *_NOTE/CATATAN_*:
> ● *Status = Jomblo/Pacaran*
> ● *Askot = Asal Kota*
> ● *Jangan Lupa Baca Desk Gc*
∘₊✧──────☆───────✧₊∘

╭︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎─ ︎ ︎     ︎ ︎──── ︎  ︎ ︎︎ ︎ ︎  ︎─╮
︎ ︎  ︎    𝐒𝐀𝐋𝐊𝐄𝐍 𝐀𝐋𝐋
╰︎─ ︎ ︎ ︎ ︎ ︎  ︎ ︎──── ︎ ︎ ︎  ︎ ︎ ︎ ︎─╯
`
m.reply(krtu)
}
  handler.help = ['intro']
  handler.tags = ['group']
  handler.command = /^(intro)$/i
  handler.group = true;
  
  export default handler