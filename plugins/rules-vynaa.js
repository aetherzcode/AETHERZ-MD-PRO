
import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

let handler = async (m, { conn }) => {
         let timestamp = speed();
         let latensi = speed() - timestamp;
         exec(`neofetch --stdout`, (error, stdout, stderr) => {
          let child = stdout.toString("utf-8");
          let ssd = child.replace(/Memory:/, "Ram:");
          m.reply(`❃ 1. Dilarang Melakukan Spam Kepada Bot, Jika Ketahuan Akan Di Banned

❃ 2. Jika Bot Tidak Menjawab 1x, Silahkan Di Coba Lagi, Tapi Jika Bot Tidak Menjawab 2x Itu Artinya Delay, Jangan Di Pakai Dulu

❃ 3. Jangan Spam Bot, Kalau Belum Donasi, Sadar Diri Aja Makenya :)

❃ 4. Jika Limit Habis Silahkan Bermain Game, Untuk Mendapatkan Exp
Contoh Game:
Tebak Tebakan
Rpg Game
Dll

❃ 5. Dilarang Mengirim Virtex/Bug Ke Bot, Walau Gaada Efek :v

❃ 6. Dilarang Keras Menelpon Bot, Jika Menelpon Akan Otomatis Di Block

❃ 7. Jika Tidak Mengerti Cara Menggunakan Bot, Silahkan Bertanya Pada Member Lain, Atau Jika Tidak Join Group Bot Silahkan Ketik #gcbot Dan Masuk Group Bot

❃ 8. Jika Ada Fitur Error/Tidak Mengerti Cara Menggunakannya Silahkan Laporkan/Tanyakan Kepada Owner

❃ 9. Jika Bot Delay Jangan Di Spam Terlebih Dahulu

❃ 10. Untuk User *Premium* Dilarang Keras Asal Bug Orang`);
            });
}
handler.help = ['rules']
handler.tags = ['main']
handler.command = ['rules', 'atutran']

export default handler
