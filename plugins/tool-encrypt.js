import JavaScriptObfuscator from 'javascript-obfuscator';

const handler = async (m, { conn, text }) => {
    console.log("Handler enc dipanggil.");

    try {
        let codeToObfuscate;
        if (m.quoted && m.quoted.text) {
            console.log("Membaca teks dari pesan reply.");
            codeToObfuscate = m.quoted.text;
        } 
        else if (text) {
            console.log("Membaca teks dari parameter.");
            codeToObfuscate = text;
        } 
        else {
            console.log("Teks tidak ditemukan.");
            return conn.reply(m.chat, '[!] Masukkan teks JavaScript yang ingin di-obfuscate atau reply pesan yang berisi kode!', m);
        }

        console.log("Teks diterima:", codeToObfuscate);

        const obfuscationResult = JavaScriptObfuscator.obfuscate(codeToObfuscate);
        const obfuscatedCode = obfuscationResult.getObfuscatedCode();

        console.log("Obfuscasi berhasil.");
        conn.reply(m.chat, obfuscatedCode, m);
    } catch (error) {
        console.error("Error saat obfuscasi:", error);
        conn.reply(m.chat, `[!] Terjadi kesalahan saat mengobfuscate: ${error.message}`, m);
    }
};

handler.help = ['enc'];
handler.tags = ['tools'];
handler.command = /^enc$/i;
handler.limit = true;

export default handler;