/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
import axios from 'axios';

let handler = async (m, { conn, text }) => {
    conn.simi = conn.simi ? conn.simi : {};

    if (!text) throw `*Contoh:* .autosimi *[on/off]*`;

    if (text == "on") {
        conn.simi[m.sender] = {
            active: true
        }
        m.reply("[ ✓ ] Berhasil mengaktifkan fitur percakapan dengan Simi VynaGPT")
    } else if (text == "off") {
        delete conn.simi[m.sender]
        m.reply("[ ✓ ] Berhasil menonaktifkan fitur percakapan dengan Simi VynaGPT")
    }
}

handler.before = async (m, { conn }) => {
    conn.simi = conn.simi ? conn.simi : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return
    if (!conn.simi[m.sender] || !conn.simi[m.sender].active) return;

    if (conn.simi[m.sender] && m.text) {
        try {
            const response = await axios.get(`https://api.betabotz.eu.org/api/search/simisimi?query=${encodeURIComponent(m.text)}&apikey=${lann}`);
            
            const responseData = response.data;
            if (responseData.status !== 200) {
                throw new Error(responseData.message);
            }
            
            const answer = responseData.result;
            m.reply(answer);
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
}

handler.command = ['autosimi'];
handler.tags = ["ai"]
handler.help = ['autosimi'].map(a => a + " *[on/off]*");

export default handler;
/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/