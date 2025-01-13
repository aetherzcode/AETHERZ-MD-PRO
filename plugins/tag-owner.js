import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
let stiker = await sticker(null, `https://telegra.ph/file/2a72d5c87d590e6c596f2.jpg`, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
    
} 

handler.customPrefix = /^(@6282389924037)$/i;
handler.command = new RegExp()

export default handler