import fetch from 'node-fetch'
import axios from "axios"
import PDFDocument from "pdfkit"
import { extractImageThumb } from "@whiskeysockets/baileys"
let handler = async(m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `Contoh\n${usedPrefix + command} 344253`
  if (isNaN(text)) throw `Contoh\n${usedPrefix + command} 344253`
  let f = await fetch(API('https://api.betabotz.eu.org', '/api/nsfw/hentai' + text, null, 'apikey'))
  let xx = await f.json()
  await m.reply('_In progress, please wait..._')
  let pages = xx.result.image
  let buffer = await (await fetch(xx.result.image[0])).buffer()
  let jpegThumbnail = await extractImageThumb(buffer)
  let imagepdf = await toPDF(pages)
  await conn.sendMessage(m.chat, { document: imagepdf, jpegThumbnail, fileName: text + '.pdf', mimetype: 'application/pdf' }, { quoted: m })
}
handler.help = ['nhentai <kode>']
handler.tags = ['nsfw', 'menuprem']
handler.command = /^(nhentai)$/i
handler.premium = true
handler.nsfw = true
handler.age = 18
export default handler
function toPDF(images, opt = {}) {
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(images)) images = [images]
            let buffs = [],
            doc = new PDFDocument({
                margin: 0, size: 'A4'
            })
            for (let x = 0; x < images.length; x++) {
                if (/.webp|.gif/.test(images[x])) continue
                let data = (await axios.get(images[x], {
                    responseType: 'arraybuffer', ...opt
                })).data
                doc.image(data, 0, 0, {
                    fit: [595.28, 841.89], align: 'center', valign: 'center'
                })
                if (images.length != x + 1) doc.addPage()
            }
            doc.on('data', (chunk) => buffs.push(chunk))
            doc.on('end', () => resolve(Buffer.concat(buffs)))
            doc.on('error', (err) => reject(err))
            doc.end()
        })
    }