/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
import fetch from "node-fetch";

let wm = "© AETHERZCODE";
let link = { web: "https://aetherz.xyz" };
global.aetherzjpg = "https://files.catbox.moe/3cj9sd.jpg";

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) throw `Contoh penggunaan: ${usedPrefix + command} Hai Meta LLAMA`;

        await conn.sendMessage(m.chat, { react: { text: `🪀`, key: m.key } });

        let response = await fetch(`https://api.ryzendesu.vip/api/ai/meta-llama?text=${encodeURIComponent(text)}`);
        if (!response.ok) throw `Error API: ${response.status} - ${response.statusText}`;

        let data = await response.json();
        console.log("Respons API:", data);

        if (data.action === "success" && data.response) {
            await conn.sendMessage(m.chat, {
                text: data.response,
                contextInfo: {
                    externalAdReply: {
                        title: "L L A M A - V2",
                        body: wm,
                        thumbnailUrl: global.aetherzjpg,
                        sourceUrl: link.web,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } else {
            console.log("API mengembalikan respons yang tidak valid:", data);
            await m.reply("Maaf, tidak ada respons dari API atau terjadi kesalahan.");
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        await m.reply("Terjadi kesalahan dalam menjalankan perintah.");
    }
};

handler.help = ["llama2"];
handler.tags = ["ai"];
handler.command = /^aillama2|llama2$/i;
export default handler;