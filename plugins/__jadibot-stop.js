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
let handler = async (m, { conn, text, isOwner }) => {
    const parent = await Connection.conn;
    let jid = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : conn.user?.jid || jidNormalizedUser(conn.user?.id);
    if (!jid || jid === "@s.whatsapp.net") throw 'Nomor tidak valid';
    if (jid !== conn.user?.jid && !isOwner) throw 'Hanya bisa digunakan oleh owner';
    const number = jid.split('@')[0];
    if (!number) throw 'Nomor tidak valid';
    if (!Connection.conns.has(number)) throw 'Bot tidak aktif';
    await conn.reply(m.chat, "Goodbye bot!", m);
    await Connection.conns.get(number)?.end?.();
    await Connection.conns.delete(number);
};

handler.help = ["stopjadibot"];
handler.tags = ["jadibot"];
handler.command = /^stop(jadi)?bot$/i;

export default handler;