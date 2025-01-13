/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
import fetch from 'node-fetch';
import gtts from 'node-gtts';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const defaultLang = 'id';
const openaiApiUrl = 'https://rest-api.aetherss.xyz/api/ai?prompt=Nama%20lu%20AETHERz%20AI%2C%20lu%20AI%20asisten%20yang%20pintar%20dan%20ceria.%20Lu%20diciptain%20sama%20AETHERz%20Lu%20tuh%20ceria%20banget%20dan%20selalu%20bantuin%20orang%20lain%2C%20kadang-kadang%20bisa%20manis%20juga%20kalo%20ngomongnya%20manis%20sama%20lu.%20Hobi%20lu%20bercerita%20dan%20dengerin%20orang%20bercerita%2C%20dan%20gaya%20bicara%20lu%20aksen%20anak%20jaksel&text=';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');

  // Jika panjang args[0] bukan 2 (tidak sesuai kode aslinya)
  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }

  // Jika tidak ada teks langsung dan jika ada pesan yang dibalas
  if (!text && m.quoted?.text) text = m.quoted.text;

  try {
    // Mengirim permintaan ke API OpenAI untuk mendapatkan audio
    const openaiResponse = await fetch(`${openaiApiUrl}${encodeURIComponent(text)}`);
    const openaiData = await openaiResponse.json();

    // Periksa apakah respons sukses sebelum mengonversi teks menjadi suara
    if (openaiData.status && openaiData.result) {
      const audioText = openaiData.result;

      // Mengonversi teks menjadi file audio
      const audioFile = await tts(audioText, lang);

      // Mengirim file audio ke pengguna
      conn.sendFile(m.chat, audioFile, 'tts.mp3', null, m, true);
    } else {
      m.reply('Gagal mendapatkan teks dari API OpenAI.');
    }
  } catch (e) {
    m.reply('Terjadi kesalahan saat memproses permintaan.');
    console.error(e);
  }
};

handler.help = ['ttsai <lang> <teks>'];
handler.tags = ['tools'];
handler.command = /^ttsai$/i;
handler.limit = true;

export default handler;

function tts(text, lang = 'id') {
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang);
      let filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date) + '.wav');
      tts.save(filePath, text, () => {
        resolve(readFileSync(filePath));
        unlinkSync(filePath);
      });
    } catch (e) {
      reject(e);
    }
  });
}