
/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/


import { default as proto } from '@whiskeysockets/baileys';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let M = proto.WebMessageInfo;
    let chats = db.data.chats[m.chat];
    let game = chats.tebaklagukpop || {};

    const songs = [
        { "lagu": "/json/lagukpop/just-one-day-BTS.mp3", "judul": "just one day", "penyanyi": "BTS" },
        { "lagu": "/json/lagukpop/home-BTS.mp3", "judul": "home", "penyanyi": "BTS" },
        { "lagu": "/json/lagukpop/no-more-dream-BTS.mp3", "judul": "no more dream", "penyanyi": "BTS" },
        { "lagu": "/json/lagukpop/on-BTS.mp3", "judul": "ON", "penyanyi": "BTS" },
        { "lagu": "/json/lagukpop/run-BTS.mp3", "judul": "run BTS", "penyanyi": "BTS" },
        { "lagu": "/json/lagukpop/Danger-BTS.mp3", "judul": "Danger", "penyanyi": "BTS" },
        { "lagu": "/json/lagukpop/Apanman-BTS.mp3", "judul": "anpanman", "penyanyi": "BTS" },
        { "lagu": "/json/lagukpop/the-truth-untold-BTS.mp3", "judul": "the truth untold", "penyanyi": "BTS" },
        { "lagu": "/json/lagukpop/Boy-inlove-bts.mp3", "judul": "Boy in luv", "penyanyi": "BTS" },
        { "lagu": "/json/lagukpop/mic-DROP-BTS.mp3", "judul": "Mic drop", "penyanyi": "BTS" },
        { "lagu": "/json/lagukpop/good-thing-nct27.mp3", "judul": "Good thing", "penyanyi": "NCT 127" },
        { "lagu": "/json/lagukpop/Make-wish-NCTU.mp3", "judul": "Make A wish", "penyanyi": "NCT U" },
        { "lagu": "/json/lagukpop/kick-it-NCT.mp3", "judul": "kick it", "penyanyi": "NCT 127" },
        { "lagu": "/json/lagukpop/like-we-just-met-NCTDREM.mp3", "judul": "Like we just met", "penyanyi": "NCT DREAM" },
        { "lagu": "/json/lagukpop/BOOM-NCTDREM.mp3", "judul": "Boom", "penyanyi": "NCT DREAM" }
    ];

    const getLocalAudioPath = (fileName) => {
        return path.resolve(__dirname, fileName);
    };

    switch (command) {
        case 'tebaklagukpop':
            m.reply(`PENJELASAN PERINTAH
*.starttk* - untuk memulai permainan
*.tebak* - untuk menebak judul lagu kpop
*.hinttk* - untuk mendapatkan petunjuk judul lagu
*.stoptk* - untuk menghentikan permainan`);
            break;

        case 'starttk':
            if (game.started) throw 'Permainan sedang berlangsung!';
            let randomIndex = Math.floor(Math.random() * songs.length);
            let selectedSong = songs[randomIndex];
            game = {
                started: true,
                song: selectedSong.lagu,
                answer: selectedSong.judul
            };
            chats.tebaklagukpop = game;

            let filePath = getLocalAudioPath(selectedSong.lagu);
            try {
                await fs.access(filePath);  // Check if the file exists
                await conn.sendMessage(m.chat, { audio: { url: filePath }, mimetype: 'audio/mp4' }, { quoted: m });
            } catch (error) {
                console.error(`File tidak ditemukan: ${filePath}`, error);
                m.reply(`File tidak ditemukan: ${filePath}`);
            }
            break;

        case 'tebak':
            if (!game.started) throw `Mulai permainan dengan perintah: ${usedPrefix}starttk`;
            if (!text) throw `Silakan masukkan tebakan Anda. Gunakan: ${usedPrefix + command} <judul>`;
            if (text.toLowerCase() === game.answer.toLowerCase()) {
                m.reply(`Selamat! Jawaban Anda benar: ${game.answer}`);
                game.started = false;
            } else {
                m.reply(`Jawaban salah! Coba lagi.`);
            }
            break;

        case 'hinttk':
            if (!game.started) throw `Mulai permainan dengan perintah: ${usedPrefix}starttk`;
            m.reply(`Hint: Judul lagu dimulai dengan huruf '${game.answer.charAt(0)}'`);
            break;

        case 'stoptk':
            if (!game.started) throw `Tidak ada permainan yang sedang berlangsung`;
            m.reply(`Permainan dihentikan. Jawaban yang benar adalah: ${game.answer}`);
            game.started = false;
            break;

        default:
            throw `Perintah tidak valid: ${command}`;
    }
}

handler.help = ['tebaklagukpop', 'starttk', 'tebak', 'hinttk', 'stoptk'];
handler.tags = ['game'];
handler.command = /^(tebaklagukpop|starttk|tebak|hinttk|stoptk)$/i;
handler.limit = true;

export default handler;