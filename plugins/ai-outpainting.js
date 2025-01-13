import axios from "axios"
import { readFileSync } from "fs"
import uploadImage from '../lib/uploadImage.js'


let handler = async (m, { conn, usedPrefix, command, text }) => {

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Send Media Nya Kak'
let media = await q.download()
let url = await uploadImage(media)
if (!text) throw 'Reply/Send Images And Input Ur Prompt\nExample: .outpainting on space'
m.reply(`_Generating Images With Prompt_`)
const { data } = await axios.post(`https://api.itsrose.life/image/outpainting?apikey=${global.rose}`, {
  prompt: text,
  type: 'url',
  init_image: url
}).catch((e) => e?.["response"]);
const { status, message } = data; 

if (!status) {
	return m.reply(message);
}
const { result } = data;
console.log(result);
await conn.sendMessage(
		m.chat,
		{
			image: Buffer.from(result.images[0], 'base64'),
			caption: `_Succes Generating Images_`,
		},
		{ quoted: m }
	);
}
handler.help = ['outpainting']
handler.tags = ['ai']
handler.command = /^(outpainting)$/i
handler.limit = true

export default handler