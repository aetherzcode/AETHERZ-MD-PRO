import { sticker } from '../lib/sticker.js';

let stickers = [
    "https://telegra.ph/file/e063366d797484ba89c3e.jpg",
    "https://telegra.ph/file/6640a10f7632798ef54e4.jpg",
    "https://telegra.ph/file/731c69fac73385b08fb1c.jpg",
    "https://telegra.ph/file/8e50d6b5e24c53f4ce8e1.jpg",
    "https://telegra.ph/file/4cdc5ea0efca793fb6f63.jpg",
    "https://telegra.ph/file/0d6e04b31395edf880e49.jpg",
    "https://telegra.ph/file/2a8effe0cef8256c153ba.jpg",
    "https://telegra.ph/file/50f539c3880818e6c60af.jpg"
];

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
    let stiker = await sticker(null, randomSticker, global.packname, global.author);
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
    throw stiker.toString(); 
};

handler.customPrefix = /^(hitam|ireng|jawir)$/i;
handler.command = new RegExp();

export default handler;
/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/