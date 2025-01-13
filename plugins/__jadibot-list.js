/**
 * Crated By Fokus ID
 *
 * Instagram @aguzfamilia
 * Github: @FokusDotId
 * Telegram: @FokusID
 * for business please DM on Instagram or Telegram
 * 
 * PLEASE DONT REMOVE THIS WATERMARK!!
 */

import { jidNormalizedUser } from "@whiskeysockets/baileys";
import Connection from "../lib/connection.js";
let handler = async (m, { usedPrefix }) => {
    const users = [...Connection.conns.entries()].map(([k, v]) => v.user);
    if (!users.length) throw 'Tidak ada bot aktif'
    const text = `
*List Jadibot*

${users.map((user, i) => `${i + 1}. @${user?.jid?.split?.("@")?.[0] ?? jidNormalizedUser(user?.id)?.split?.("@")?.[0] ?? user?.id}${user?.name ? ` (${user.name})` : ''}\nhttps://wa.me/${parseInt(user?.jid ?? jidNormalizedUser(user?.id))}?text=${usedPrefix}menu`).join('\n')}
`;
    await m.reply(text.trim());
};

handler.help = ['listjadibot'];
handler.tags = ['jadibot'];
handler.command = /^(list(jadi)?bot|(jadi)?botlist)$/i;

export default handler;