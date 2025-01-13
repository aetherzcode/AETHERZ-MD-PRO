import { truth } from '@bochilteam/scraper';

let handler = async (m, { conn, usedPrefix }) => {
    let text = `${await truth()}`;
    conn.sendMessage(m.chat, {
        text: text,
        contextInfo: {
            externalAdReply: {
                title: `Truth or Dare`,
                thumbnailUrl: 'https://telegra.ph/file/7caa2b8da56c89f486c95.jpg',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });
}

handler.help = ['truth', 'tod'];
handler.tags = ['quotes', 'fun'];
handler.command = /^(truth|tod)$/i;

export default handler;
/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/