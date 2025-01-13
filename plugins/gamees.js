const { proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let M = proto.WebMessageInfo;
    let chats = db.data.chats[m.chat];
    let users = db.data.users;
    let gameData = chats.gameData || {};

    switch (command) {
        case 'startpuzzle':
            if (!text) throw `Gunakan: ${usedPrefix + command} <teks>`;
            let puzzle = text.split('').sort(() => Math.random() - 0.5).join('');
            gameData.puzzle = { original: text, scrambled: puzzle, points: 0 };
            chats.gameData = gameData;
            m.reply(`Tebak kalimat ini: ${puzzle}`);
            break;
        
        case 'anspuzzle':
            if (!gameData.puzzle) throw 'Tidak ada permainan Puzzle yang sedang berjalan.';
            if (text === gameData.puzzle.original) {
                gameData.puzzle.points += 10;
                m.reply(`Jawaban benar! Poin Anda: ${gameData.puzzle.points}`);
                delete gameData.puzzle;
                chats.gameData = gameData;
            } else {
                m.reply('Jawaban salah. Coba lagi!');
            }
            break;

        case 'trivia':
            // Misalnya, pertanyaan trivia disimpan dalam array
            let triviaQuestions = [
                { question: "Siapa presiden pertama Indonesia?", answer: "Soekarno" },
                { question: "Apa ibu kota Jepang?", answer: "Tokyo" },
                // Tambahkan pertanyaan lainnya
            ];
            let randomTrivia = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
            gameData.trivia = { question: randomTrivia.question, answer: randomTrivia.answer.toLowerCase(), points: 0 };
            chats.gameData = gameData;
            m.reply(randomTrivia.question);
            break;

        case 'anstrivia':
            if (!gameData.trivia) throw 'Tidak ada permainan Trivia yang sedang berjalan.';
            if (text.toLowerCase() === gameData.trivia.answer) {
                gameData.trivia.points += 10;
                m.reply(`Jawaban benar! Poin Anda: ${gameData.trivia.points}`);
                delete gameData.trivia;
                chats.gameData = gameData;
            } else {
                m.reply('Jawaban salah. Coba lagi!');
            }
            break;

        case 'starthangman':
            if (!text) throw `Gunakan: ${usedPrefix + command} <kata>`;
            gameData.hangman = { word: text.toLowerCase(), guessed: [], attempts: 5 };
            chats.gameData = gameData;
            m.reply('Permainan Hangman dimulai! Tebak hurufnya.');
            break;

        case 'guesshangman':
            if (!gameData.hangman) throw 'Tidak ada permainan Hangman yang sedang berjalan.';
            let letter = text.toLowerCase();
            if (gameData.hangman.guessed.includes(letter)) {
                m.reply('Anda sudah menebak huruf ini.');
            } else if (gameData.hangman.word.includes(letter)) {
                gameData.hangman.guessed.push(letter);
                let revealedWord = gameData.hangman.word.split('').map(l => gameData.hangman.guessed.includes(l) ? l : '_').join('');
                m.reply(`Benar! Kata: ${revealedWord}`);
                if (!revealedWord.includes('_')) {
                    m.reply('Selamat! Anda menebak kata dengan benar.');
                    delete gameData.hangman;
                    chats.gameData = gameData;
                }
            } else {
                gameData.hangman.attempts -= 1;
                m.reply(`Salah! Sisa percobaan: ${gameData.hangman.attempts}`);
                if (gameData.hangman.attempts <= 0) {
                    m.reply(`Game Over! Kata yang benar adalah: ${gameData.hangman.word}`);
                    delete gameData.hangman;
                    chats.gameData = gameData;
                }
            }
            break;

        case 'startquiz':
            let personalityQuestions = [
                "Apa hobi favorit Anda?",
                "Bagaimana Anda menghabiskan akhir pekan Anda?",
                "Apa warna favorit Anda?",
                // Tambahkan pertanyaan lainnya
            ];
            gameData.quiz = { questions: personalityQuestions, answers: [] };
            chats.gameData = gameData;
            m.reply(personalityQuestions[0]);
            break;

        case 'ansquiz':
            if (!gameData.quiz) throw 'Tidak ada Kuis Kepribadian yang sedang berjalan.';
            gameData.quiz.answers.push(text);
            if (gameData.quiz.answers.length < gameData.quiz.questions.length) {
                m.reply(gameData.quiz.questions[gameData.quiz.answers.length]);
            } else {
                m.reply(`Terima kasih telah menyelesaikan kuis! Berikut adalah deskripsi kepribadian Anda:`);
                // Tambahkan logika untuk memberikan deskripsi kepribadian berdasarkan jawaban
                delete gameData.quiz;
                chats.gameData = gameData;
            }
            break;

        case 'startsongguess':
            // Misalnya, link klip audio disimpan dalam array
            let songClips = [
                { link: "https://example.com/song1.mp3", title: "Lagu 1" },
                { link: "https://example.com/song2.mp3", title: "Lagu 2" },
                // Tambahkan klip lagu lainnya
            ];
            let randomSong = songClips[Math.floor(Math.random() * songClips.length)];
            gameData.song = { link: randomSong.link, title: randomSong.title.toLowerCase() };
            chats.gameData = gameData;
            conn.sendFile(m.chat, randomSong.link, 'song.mp3', 'Tebak judul atau penyanyi lagu ini!');
            break;

        case 'anssong':
            if (!gameData.song) throw 'Tidak ada permainan Tebak Lagu yang sedang berjalan.';
            if (text.toLowerCase() === gameData.song.title) {
                m.reply('Jawaban benar!');
                delete gameData.song;
                chats.gameData = gameData;
            } else {
                m.reply('Jawaban salah. Coba lagi!');
            }
            break;

        case 'leaderboards':
            // Contoh logika untuk leaderboard
            let leaderboard = Object.entries(users).sort((a, b) => b[1].points - a[1].points).map(([user, data], i) => `${i + 1}. ${conn.getName(user)}: ${data.points} poin`).join('\n');
            m.reply(`Leaderboard:\n${leaderboard}`);
            break;

        case 'mystats':
            let userStats = users[m.sender];
            if (!userStats) throw 'Anda belum bermain game apa pun.';
            m.reply(`Statistik Anda:\nPoin: ${userStats.points}`);
            break;

        default:
            throw `Perintah tidak valid: ${command}`;
    }
}

handler.help = [
    'startpuzzle <teks>', 'anspuzzle <teks>',
    'trivia', 'anstrivia <jawaban>',
    'starthangman <kata>', 'guesshangman <huruf>',
    'startquiz', 'ansquiz <jawaban>',
    'startsongguess', 'anssong <judul>',
    'leaderboards', 'mystats'
];
handler.tags = ['game'];
handler.command = /^(startpuzzle|anspuzzle|trivia|anstrivia|starthangman|guesshangman|startquiz|ansquiz|startsongguess|anssong|leaderboards|mystats)$/i;
handler.premium = false;

export default handler;

/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/