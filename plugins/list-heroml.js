/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
import fs from 'fs';

let handler = async (m, { conn }) => {
  let heroList = `
*List Hero Mobile Legends:*

*2016:*
Miya, Balmond, Saber, Alice, Nana, Tigreal, Alucard, Karina, Eudora, Zilong, Layla, Akai, Franco, Bane, Bruno, Clint, Rafaela, Fanny, Lolita, Belerick, Balmond, Gord, Natalia, Kagura, Chou, Sun

*2017:*
Alpha, Ruby, Yi Sun-shin, Moskov, Johnson, Cyclops, Estes, Hilda, Aurora, Lapu-Lapu, Vexana, Roger, Karrie, Gatotkaca, Harley, Irithel, Grock, Argus, Odette, Lancelot, Diggie, Hylos, Zhask, Helcurt, Pharsa

*2018:*
Lesley, Jawhead, Angela, Gusion, Valir, Martis, Uranus, Hanabi, Chang’e, Kaja, Selena, Aldous, Claude, Vale, Leomord, Lunox, Hanzo, Belerick, Kimmy, Thamuz, Harith, Minsitthar, Kadita, Faramis

*2019:*
Badang, Khufra, Granger, Guinevere, Esmeralda, Terizla, X.Borg, Ling, Dyrroth, Lylia, Baxia, Masha, Wanwan, Silvanna

*2020:*
Carmilla, Cecilion, Atlas, Popol and Kupa, Yu Zhong, Luo Yi, Khaleed, Benedetta, Barats, Brody

*2021:*
Yve, Mathilda, Paquito, Beatrix, Gloo, Phoveus, Natan, Aulus, Floryn, Valentina, Yin

*2022:*
Melissa, Xavier, Julian

*2023:*
Fredrinn, Joy, Novaria

*2024:*
Cici, Chip, Zhuxin, Phylax
`;

  try {
    // Mengirim pesan dengan teks dan gambar
    await conn.sendMessage(m.chat, {
      image: { url: 'https://telegra.ph/file/b7c68d9a1957b8aa5638e.png' },
      caption: heroList
    }, { quoted: m });

    // Mengirim pesan suara
    await conn.sendFile(m.chat, './media/heroml.mp3', '', null, m, true);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, "Terjadi kesalahan saat mengirim pesan.", m);
  }
};

handler.help = ['listheroml'];
handler.tags = ['info'];
handler.command = /^(listheroml|listhero)$/i;

export default handler;