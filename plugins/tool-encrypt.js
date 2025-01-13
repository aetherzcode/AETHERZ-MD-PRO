import JavaScriptObfuscator from 'javascript-obfuscator';

const handler = async (m, { conn, text }) => {
    console.log("Handler enc dipanggil.");
    try {
        if (!text) {
            console.log("Teks tidak ditemukan."); 
            return conn.reply(m.chat, '[!] Masukkan teks JavaScript yang ingin di-obfuscate!', m);
        }

        console.log("Teks diterima:", text);
        const obfuscationResult = JavaScriptObfuscator.obfuscate(text);
        const obfuscatedCode = obfuscationResult.getObfuscatedCode();

        console.log("Obfuscasi berhasil.");
        conn.reply(m.chat, `Berhasil di-obfuscate!\n\n${obfuscatedCode}`, m);
    } catch (error) {
        console.error("Error saat obfuscasi:", error);
        conn.reply(m.chat, `[!] Terjadi kesalahan saat mengobfuscate: ${error.message}`, m);
    }
};

handler.help = ['enc'];
handler.tags = ['tools'];
handler.command = /^enc$/i;

export default handler;