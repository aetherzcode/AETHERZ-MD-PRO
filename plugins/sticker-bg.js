import axios from 'axios'
import fetch from 'node-fetch'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        if (!mime || !/image/.test(mime)) throw 'Kirim/Reply Gambar Dengan Caption ' + usedPrefix + command
        m.reply(wait)

        const img = await q.download()
        const { data } = await axios.post("https://backend.zyro.com/v1/ai/remove-background", {
            image: "data:image/jpeg;base64," + img.toString("base64")
        })
        const image = Buffer.from(data.result.split(",")[1], "base64")

        stiker = await createSticker(image)

    } catch (e) {
        console.log(e)
        stiker = e
    } finally {
        m.reply(stiker)
    }
}

handler.help = ['stikerbg']
handler.tags = ['tools']
handler.command = /^(stikerbg)$/i
handler.limit = true
handler.register = true

export default handler

const isUrl = (text) => text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))

async function createSticker(image) {
    let stickerMetadata = {
        pack: 'IG: aetherz17_',
        author: 'Callme Pinot',
        quality: 100
    }
    return (new Sticker(image, stickerMetadata)).toBuffer()
}
/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/