let handler = async (m, { conn }) => {
    let groups = Object.keys(conn.chats).filter(jid => jid.endsWith('@g.us'));
    
    for (let i = 0; i < groups.length; i++) {
        await conn.groupLeave(groups[i]);
    }
    
    m.reply("Saya telah keluar dari semua grup.");
}

handler.command = /^outallgc$/i
handler.owner = true
export default handler
/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/