/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
import fs from 'fs/promises';

// Definisi fungsi sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handler = async (m, { conn }) => {
  const chatID = m.chat;
  const groupInfo = await conn.groupMetadata(chatID);
  const participants = groupInfo.participants;
  const groupName = groupInfo.subject;

  let vcard = '';
  let noPort = 0;
  for (let participant of participants) {
    if (participant.id && participant.id.includes('@s.whatsapp.net')) {
      vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${participant.id.split("@")[0]}\nTEL;type=CELL;type=VOICE;waid=${participant.id.split("@")[0]}:+${participant.id.split("@")[0]}\nEND:VCARD\n`;
    }
  }

  if (noPort === 0) {
    return m.reply('Tidak ada kontak yang dapat disimpan.');
  }

  const fileName = './contacts.vcf';
  await fs.writeFile(fileName, vcard.trim());

  m.reply('Mengimpor ' + noPort + ' kontak..');
  await sleep(2000); // Menggunakan fungsi sleep di sini
  conn.sendMessage(m.chat, {
    document: await fs.readFile(fileName),
    mimetype: 'text/vcard',
    fileName: 'Contact.vcf',
    caption: 'GROUP: ' + groupName + '\nMEMBER: ' + noPort
  }, { quoted: m });
  await fs.unlink(fileName);
};

handler.help = ['svkontak'];
handler.tags = ['pushkontak'];
handler.command = ['svkontak'];
handler.owner = true;
export default handler;