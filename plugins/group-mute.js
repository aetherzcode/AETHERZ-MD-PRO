let handler = async (m, { conn, args, isPrefix, command, isROwner }) => {
    let gc = global.db.data.chats[m.chat];

    if (gc.mute === 'true' && !isROwner) {
        conn.reply(m.chat, `Bot is currently muted and can only be accessed by the owner.`, m);
        return;
    }

    let opt = [0, 1,'off', 'on'];

    if (!args || !args[0] || !opt.includes(parseInt(args[0]))) {
        conn.reply(m.chat, `.mutegc on\n.mutegc off`, m);
        return;
    }

    if (parseInt(args[0]) === 1) {
        if (gc.mute) {
            conn.reply(m.chat, `Previously muted`, m);
        } else {
            gc.mute = true;
            conn.reply(m.chat, `Successfully muted.`, m);
        }
    } else if (parseInt(args[0]) === 0) {
        if (!gc.mute) {
            conn.reply(m.chat, `Previously unmuted.`, m);
        } else {
            gc.mute = false;
            conn.reply(m.chat, `Successfully unmuted.`, m);
        }
    }
};

handler.help = ["mutegc 0/1"];
handler.tags = ["group"];
handler.command = ["mutegc", "mute", "off/on"];

handler.admin = true
export default handler;

