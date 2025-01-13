// Jgn Di Hapus
let handler = async (m) => {

let anu =`
┌─〔 TUTORIAL  〕
│ 
├〘 Tutorial EPIC RPG 〙
├➥ *✗claim*
│   Staterpack yang bisa di klaim 
│   12 jam sekali
├➥ *✗mulung*
├➥ *✗adventure*
├➥ *✗petualang*
│   Untuk mencari resource seperti 
│   Money, Exp, dll..,dibutuhkan  
│   minimal 80 nyawa untuk bisa 
│   melakukannya dan, kamu tidak 
│   dapat spam karena ada delay 5 
│   menit
├➥ *✗use potion <jumlah>*
│   Untuk memakai potion/untuk 
│   mengisi nyawa/health
├➥ *✗shop buy potion <jumlah>*
│   Untuk membeli potion dan ketik 
├➥ *✗use potion <jumlah>*
│   untuk menggunakan potion
├➥ *✗shop <args>*
│   Untuk membeli atau menjual sesuatu
├➥ *✗shop buy <crate> <jumlah>*
│   Untuk membeli Crate
├➥ *✗profile*
├➥ *✗pp*
├➥ *✗profil*
│   untuk mengetahui No whatsapmu, dll
├➥ *✗inv*
├➥ *✗inventory*
├➥ *✗bal*
│   Untuk mengecek nyawa, money, dll.
├➥ *✗judi <jumlah>*
│   *_Jangan judi, Karena gk bakal_*
│   *_balik modal.BENERAN GK BOHONG_*
│  
├➥ *© AETHERz-MD 2022-2025*
└─「 *Tutorial Main BOT* 」

⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕
`
await m.reply(anu)
}

handler.help = ["tutorialrpg"];
handler.tags = ["rpg"];
handler.command = /^(tutorialrpg|tutorpg)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

handler.admin = false;
handler.botAdmin = false;

handler.fail = null;

export default handler
