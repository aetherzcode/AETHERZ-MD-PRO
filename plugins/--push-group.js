const handler = async (m, {
    conn,
    args,
    groupMetadata,
    usedPrefix,
    command
}) => {
    if (args.length < 1) return m.reply("Format pesan salah. Contoh penggunaan: pushgc <idgroup>|<pesan>");
    
    let [groupId, text] = args.join(' ').split('|');
    
    if (!groupId || !text) return m.reply("Format pesan salah. Contoh penggunaan: pushkontak <idgroup>|<pesan>");

    let targetGroup = groupId.endsWith('@g.us') ? groupId : groupId + '@g.us';

    let groupMembers = await conn.groupMetadata(targetGroup).catch(console.error);
    if (!groupMembers) return m.reply('Gagal mendapatkan info grup, coba lagi nanti');

    let participants = groupMembers.participants.map(member => member.id);
    let count = participants.length;
    let sentCount = 0;
    m.reply('Sedang memproses...');
    for (let participant of participants) {
        setTimeout(async () => {
            try {
                await conn.sendMessage(participant, {
                    text: text
                });
                sentCount++;
                if (sentCount === count) {
                    m.reply(`Berhasil mengirim pesan kepada ${sentCount} anggota grup.`);
                }
            } catch (error) {
                console.error(error);
            }
        }, sentCount * 1000);
    }
};

handler.help = ['pushgc'];
handler.tags = ['pushkontak'];
handler.command = ['pushgc'];

export default handler;

/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/