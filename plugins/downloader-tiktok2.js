import fetch from "node-fetch";
import axios from "axios"

let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!text) throw `*example:* ${usedPrefix + command} https://vt.tiktok.com/xxxxxxx`
   conn.sendMessage(m.chat, {
		react: {
			text: 'ℹ️',
			key: m.key,
		}
	})
      let result1 = await fetch(`https://api.agatz.xyz/api/tiktok?url=${text}`)
    let res = await result1.json()
    let wkwk1 = res.result.link
      conn.sendFile(m.chat, wkwk1, 'error.mp4', `${text}`, m)
}
handler.help = ['tiktok2 *⧼url⧽*'];
handler.tags = ['downloader'];
handler.command = /^(tiktok2|tt2)$/i;
handler.limit = true;
handler.group = false;

export default handler;