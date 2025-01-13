/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) throw `Contoh penggunaan: ${usedPrefix + command} Hai zetaa`;

        await conn.sendMessage(m.chat, { react: { text: `🪀`, key: m.key } });

        let response = await fetch(`https://api.kyuurzy.site/api/ai/aizeta?query=${encodeURIComponent(text)}`);
        let data = await response.json();

        if (data.status && data.result && data.result.status) {
            await conn.sendMessage(m.chat, {
                text: data.result.answer,
                contextInfo: {
                    externalAdReply: {
                        title: "Z E T A",
                        body: wm,
                        thumbnailUrl: global.aetherzjpg,
                        sourceUrl: link.web,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } else {
            console.log("Tidak ada respons dari API atau terjadi kesalahan.");
            await m.reply("Maaf, tidak ada respons dari API atau terjadi kesalahan.");
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        await m.reply("Terjadi kesalahan dalam menjalankan perintah.");
    }
};

handler.help = ["zeta"];
handler.tags = ["aiv2"];
handler.command = /^aizeta|zeta$/i;
export default handler;