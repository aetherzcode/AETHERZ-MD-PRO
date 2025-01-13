import fs from 'fs';
import path from 'path';

let handler = async (m, {
    text
}) => {
    if (!text) return m.reply('Harap masukkan nama file dengan format: *nama-file-lama>nama-file-baru*.');

    const [oldFileName, newFileName] = text.split('>');
    if (!oldFileName || !newFileName) return m.reply('Format salah. Gunakan format: *nama-file-lama>nama-file-baru*.');

    const oldFilePath = path.join('./plugins', oldFileName.trim());
    const newFilePath = path.join('./plugins', newFileName.trim());

    if (!fs.existsSync(oldFilePath)) return m.reply(`File "${oldFileName}" tidak ditemukan.`);
    if (fs.existsSync(newFilePath)) return m.reply(`File dengan nama "${newFileName}" sudah ada.`);

    try {
        fs.renameSync(oldFilePath, newFilePath);
        m.reply(`File "${oldFileName}" berhasil diubah namanya menjadi "${newFileName}".`);
    } catch (error) {
        m.reply(`Gagal mengganti nama file: ${error.message}`);
    }
};

handler.help = ['renamefile nama-file-lama>nama-file-baru'];
handler.tags = ['owner'];
handler.command = /^renamefile$/i;
handler.rowner = true;

export default handler;