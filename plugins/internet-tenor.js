import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (command == 'gettenor') {
if (!text) throw `*example:* nakano|2`
let urut = text.split`|`
  let text1 = urut[0]
  let text2 = urut[1]
  
    let gas = await fetch(`https://g.tenor.com/v1/search?q=${text1}&key=LIVDSRZULELA&limit=${text2}`)
    let json = await gas.json()
    let ter = json.results
    let startTime = new Date();
    
    for (let i = 0; i < ter.length; i++) {
        let out = ter[i].media[0].mp4.url
        await conn.sendFile(m.chat, out, '',  `*Fetching:* ${(new Date() - startTime) / 1000} seconds`, m)
    }
  }

  if (command == 'urltopdf') {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} https://t.me/addsticker/...`
        let gas = `https://api.html2pdf.app/v1/generate?url=${text}&apiKey=DzhGk9fhdPope6j8PmVmbxoNDDiWbsFpdeKZfMMrrxtsl3pXCRbfYOd7N4HovaJ1`
        return conn.sendFile(m.chat, gas, 'hasil.pdf', 'Nih Kak', m)
      }
    }
  
handler.help = ['gettenor', 'urltopdf','tenor']
handler.tags = ['tools','downloader']
handler.command = /^(tenor|gettenor|urltodf)$/i
handler.register = true
handler.premium = false
handler.limit = true

export default handler