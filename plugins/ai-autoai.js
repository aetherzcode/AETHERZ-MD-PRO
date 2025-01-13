/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
import axios from 'axios';

let handler = async (m, { conn, text }) => {
    conn.vynaGPT = conn.vynaGPT ? conn.vynaGPT : {};

    if (!text) throw `*Contoh:* .autoai *[on/off]*`;

    if (text === "on") {
        conn.vynaGPT[m.sender] = {
            messages: []
        };
        m.reply("[ ✓ ] Berhasil mengaktifkan bot VynaGPT");
    } else if (text === "off") {
        delete conn.vynaGPT[m.sender];
        m.reply("[ ✓ ] Berhasil menonaktifkan bot VynaGPT");
    }
};

handler.before = async (m, { conn }) => {
    conn.vynaGPT = conn.vynaGPT ? conn.vynaGPT : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;
    if (!conn.vynaGPT[m.sender]) return;

    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return;

    if (conn.vynaGPT[m.sender] && m.text) {
        let name = conn.getName(m.sender);
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});

        const prompt = `Nama lu AETHERz-MD, lu AI asisten yang pintar dan ceria. Lu diciptain sama AETHER. Lu tuh ceria banget dan selalu bantuin orang lain, kadang-kadang bisa manis juga kalo ngomongnya manis sama lu. Hobi lu bercerita dan dengerin orang bercerita, dan gaya bicara lu aksen anak jaksel`;
        const apiUrl = `https://rest-api.aetherss.xyz/api/ai?prompt=${encodeURIComponent(prompt)}&text=${encodeURIComponent(m.text)}`;

        try {
            const response = await axios.get(apiUrl, {
                headers: { 'accept': 'application/json' }
            });

            const responseData = response.data;
            const answer = responseData.result;
            await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
            m.reply(answer);
            conn.vynaGPT[m.sender].messages = [
                { role: "system", content: `Halo, saya AETHERzGPT, dikembangkan oleh AETHER. Anda sedang berbicara dengan ${name}` },
                { role: "user", content: m.text }
            ];
        } catch (error) {
            console.error("Error fetching data:", error);
            m.reply("Maaf, terjadi kesalahan saat memproses permintaan Anda.");
        }
    }
};

handler.command = ['autoai'];
handler.tags = ["ai"];
handler.help = ['autoai'].map(a => a + " *[on/off]*");

export default handler;