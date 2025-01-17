import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const exec_ = promisify(exec);

const handler = async (m, { conn, isROwner }) => {
   try {
      let zipFileName = `AETHERZ-MD-PRO.zip`;

      if (fs.existsSync("node_modules")) {
         m.reply("Folder 'node_modules' tidak ikut di backup.");
      }

      let zipCommand = `
         zip -r ${zipFileName} * \
         -x "node_modules/*" \
         -x "tmp/*" \
         "tmp/1736424358240.mp3" \
         "tmp/1736424358245.mp3.opus" \
         "tmp/1736424710313.mp3" \
         "tmp/1736424710319.mp3.opus"
      `;

      await exec_(zipCommand);

      const file = fs.readFileSync(zipFileName);
      conn.sendMessage(
         m.chat,
         {
            document: file,
            mimetype: "application/zip",
            fileName: zipFileName,
            caption: "Backup selesai. Silakan unduh file backup.",
         },
         { quoted: m }
      );

      setTimeout(() => {
         fs.unlinkSync(zipFileName);
         m.reply("File backup telah dihapus.");
      }, 5000);

   } catch (error) {
      m.reply("Terjadi kesalahan saat melakukan backup.");
      console.error(error);
   }
};

handler.help = ["backupsc"];
handler.tags = ["owner"];
handler.command = ["backupsc"];
handler.owner = true;

export default handler;