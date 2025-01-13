const { proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let M = proto.WebMessageInfo;
    let chats = db.data.chats[m.chat];
    let game = chats.tebaklagukpop || {};
    
    switch (command) {
        case 'starttebaklagukpop':
            if (game.started) throw 'Permainan sedang berlangsung!';
            let res = await fetch('https://raw.githubusercontent.com/VynaaValerie/mlbb/main/Lagukpop/lagupop.json');
            let songs = await res.json();
            let songKeys = Object.keys(songs);
            let randomIndex = Math.floor(Math.random() * songKeys.length);
            let selectedSong = songKeys[randomIndex];
            game = {
                started: true,
                song: selectedSong,
                answer: songs[selectedSong].judul
            };
            chats.tebaklagukpop = game;
            await conn.sendMessage(m.chat, { audio: { url: songs[selectedSong].lagu }, mimetype: 'audio/mp4' }, { quoted: m });
            break;

        case 'tebaklagukpop':
            if (!game.started) throw 'Mulai permainan dengan perintah: ${usedPrefix}starttebaklagukpop';
            if (!text) throw `Silakan masukkan tebakan Anda. Gunakan: ${usedPrefix + command} <judul lagu>`;
            if (text.toLowerCase() === game.answer.toLowerCase()) {
                m.reply(`Selamat! Jawaban Anda benar: ${game.answer}`);
                game.started = false;
            } else {
                m.reply(`Jawaban salah! Coba lagi.`);
            }
            break;

        case 'hinttebaklagukpop':
            if (!game.started) throw 'Mulai permainan dengan perintah: ${usedPrefix}starttebaklagukpop';
            m.reply(`Hint: Judul lagu dimulai dengan huruf '${game.answer.charAt(0)}'`);
            break;

        case 'stoptebaklagukpop':
            if (!game.started) throw 'Tidak ada permainan yang sedang berlangsung';
            m.reply(`Permainan dihentikan. Jawaban yang benar adalah: ${game.answer}`);
            game.started = false;
            break;

        default:
            throw `Perintah tidak valid: ${command}`;
    }
}

handler.help = ['starttebaklagukpop', 'tebaklagukpop <judul lagu>', 'hinttebaklagukpop', 'stoptebaklagukpop'];
handler.tags = ['game'];
handler.command = /^(starttebaklagukpop|tebaklagukpop|hinttebaklagukpop|stoptebaklagukpop)$/i;
handler.premium = false;

export default handler;

[
  {
    "lagu": "json/lagukpop/just-one-day-BTS.mp3",
    "judul": "just one day",
    "penyanyi": "BTS"
  },
  {
    "lagu": "json/lagukpop/home-BTS.mp3",
    "judul": "home",
    "penyanyi": "BTS"
  },
  {
    "lagu": "json/lagukpop/no-more-dream-BTS.mp3",
    "judul": "no more dream",
    "penyanyi": "BTS"
  },
  {
    "lagu": "json/lagukpop/on-BTS.mp3",
    "judul": "ON",
    "penyanyi": "BTS"
  },
  {
    "lagu": "json/lagukpop/run-BTS.mp3",
    "judul": "run BTS",
    "penyanyi": "BTS"
  },
  {
    "lagu": "json/lagukpop/Danger-BTS.mp3",
    "judul": "Danger",
    "penyanyi": "BTS"
  },
  {
    "lagu": "json/lagukpop/Apanman-BTS.mp3",
    "judul": "anpanman",
    "penyanyi": "BTS"
  },
  {
    "lagu": "the-truth-untold-BTS.mp3",
    "judul": "the truth untold",
    "penyanyi": "BTS"
  },
  {
    "lagu": "json/lagukpop/Boy-inlove-bts.mp3",
    "judul": "Boy in luv",
    "penyanyi": "BTS"
  },
  {
    "lagu": "json/lagukpop/mic-DROP-BTS.mp3",
    "judul": "Mic drop",
    "penyanyi": "BTS"
  },
  {
    "lagu": "json/lagukpop/good-thing-nct27.mp3",
    "judul": "Good thing",
    "penyanyi": "NCT 127"
  },
  {
    "lagu": "json/lagukpop/Make-wish-NCTU.mp3",
    "judul": "Make A wish",
    "penyanyi": "NCT U"
  },
  {
    "lagu": "json/lagukpop/kick-it-NCT.mp3",
    "judul": "kick it",
    "penyanyi": "NCT 127"
  },
  {
    "lagu": "json/lagukpop/like-we-just-met-NCTDREM.mp3",
    "judul": "Like we just met",
    "penyanyi": "NCT DREAM"
  },
  {
    "lagu": "json/lagukpop/BOOM-NCTDREM.mp3",
    "judul": "Boom",
    "penyanyi": "NCT DREAM"
  }
]

ini nih gini