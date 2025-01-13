import { ocrSpace } from 'ocr-space-api-wrapper'
import uploadImage from '../lib/uploadImage.js'
let handler = async (m, { conn, usedPrefix }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (!mime) throw `Kirim/Balas Gambar Dengan Caption ${usedPrefix}ocr !`
	if (!/image\/(jpe?g|png)/.test(mime)) throw 'Fitur Ini Hanya Mendukung Gambar!'
	m.reply(wait)
	let img = await q.download()
	let url = await uploadImage(img)
	let result = await ocrSpace (url, { apiKey: 'K83629685788957' })
	//console.log(result)
	m.reply(result.ParsedResults[0].ParsedText)
}
handler.help = ["ocr"].map(v => v + ' <text>')
handler.tags = ["internet"]
handler.command = /^(ocr)$/i

export default handler