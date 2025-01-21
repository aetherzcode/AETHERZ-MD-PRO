import yts from "yt-search";
const { generateWAMessageFromContent } = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `Contoh: ${usedPrefix + command} cupid`;

    m.reply("Tunggu sebentar...");

    try {
        let results = await yts(text);

        if (!results || !results.all || results.all.length === 0) {
            return conn.reply(m.chat, "Maaf, tidak ada hasil ditemukan.", m);
        }

        // Ambil maksimal 10 hasil
        let listItems = results.all.slice(0, 10).map((video) => ({
            title: video.title || "Tidak ada judul",
            description: `Durasi: ${video.timestamp || "Tidak diketahui"} | Views: ${video.views || 0}`,
            id: `.ytaudio ${video.url}`,
        }));

        const data = {
            title: "Hasil Pencarian Lagu",
            sections: [
                {
                    title: `Hasil untuk: ${text}`,
                    rows: listItems,
                },
            ],
        };

        let msgs = generateWAMessageFromContent(m.chat, {
            listMessage: {
                title: "Hasil Pencarian Lagu",
                description: "Pilih salah satu lagu di bawah ini",
                buttonText: "Pilih Lagu",
                listType: 1,
                sections: data.sections,
            },
        });

        conn.relayMessage(m.chat, msgs.message, {});
    } catch (err) {
        console.error(err);
        conn.reply(m.chat, "Terjadi kesalahan saat memproses permintaan Anda.", m);
    }
};

handler.help = ["play3"];
handler.tags = ["downloader"];
handler.command = /^(play3)$/i;

export default handler;