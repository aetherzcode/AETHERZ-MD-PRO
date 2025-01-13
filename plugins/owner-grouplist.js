let handler = async (m, { conn, participants, command, args }) => {
    let now = new Date() * 1
    let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])

    switch(command) {
        case 'grouplist':
            let txt = '';
            for (let i = 0; i < groups.length; i++) {
                let jid = groups[i]
                txt += `${i + 1}. ${await conn.getName(jid)}\n${jid} [${conn.chats[jid]?.metadata?.read_only ? 'Left' : 'Joined'}]\n${db.data.chats[jid] == undefined ? db.data.chats[jid] = {
                    isBanned: false,
                    welcome: false,
                    antiLink: false,
                    delete: true,
                } : db.data.chats[jid].expired ? msToDate(db.data.chats[jid].expired - now) : '*Tidak Diatur Expired Group*'}
${db.data.chats[jid].isBanned ? '✅' : '❌'} _Group Banned_
${db.data.chats[jid].welcome ? '✅' : '❌'} _Auto Welcome_
${db.data.chats[jid].antiVirtex ? '✅' : '❌'} _Anti Virtex_
${db.data.chats[jid].antiLink ? '✅' : '❌'} _Anti Link_\n\n`
            }

            m.reply(`List Groups:
Total Group: ${groups.length}

${txt}`)
            break;
        case 'comotid':
            if (args.length !== 1 || isNaN(args[0])) return m.reply('Format pesan salah. Gunakan: .comotid <nomor_urutan>');
            let index = parseInt(args[0]);
            let groupId = getGroupIdByIndex(conn, index); 
            if (!groupId) return m.reply('Nomor urutan grup tidak valid.');
            m.reply(`Ini adalah ID Grup nomor ${index}: ${groupId}`);
            break;
    }
}

handler.help = ['grouplist']
handler.tags = ['group']
handler.command = /^(grouplist|comotid)$/i
handler.owner = true
export default handler

function msToDate(ms) {
    let temp = ms
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " Days ⏳ \n" + hours + " Hours ⏳ \n" + minutes + " Minute ⏳ ";
}

// Fungsi untuk mengambil ID grup berdasarkan nomor urutan
function getGroupIdByIndex(conn, index) {
    let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
    if (index < 1 || index > groups.length) return null;
    return groups[index - 1];
}