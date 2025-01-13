/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
// CREDITS JANGAN HAPUS GA KASIAN SAMA AKU:)

const quotes = [
    "Karena aku tahu rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan untuk celaka, untuk memberikan kepadamu hari depan yang penuh harapan. (Yeremia 29:11)",
    "Aku berserah kepada TUHAN, maka aku dipelihara-Nya; aku tak takut kepada siapapun. (Mazmur 56:12)",
    "Aku telah menyampaikan perintah kepada kamu, supaya kamu harus tabah dan berani! Janganlah gentar dan janganlah tawar hati, sebab TUHAN, Allahmu, menyertai engkau, ke mana pun engkau pergi. (Yosua 1:9)",
    // Add other quotes here...
];

function getRandom() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

async function galauHandler(message) {
    let data = getRandom();
    message.reply(data.trim(), null, {
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: 'R E N U N G A N A L K I T A B',
                thumbnailUrl: 'https://telegra.ph/file/217a057dcda086c80d04f.jpg',
                sourceUrl: 'https://github.com/VynaaValerie',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });
}

galauHandler.help = ['alkitab'];
galauHandler.tags = ['quotes'];
galauHandler.command = /^(renunganalkitab|alkitab)$/i;
galauHandler.limit = true;

export default galauHandler;