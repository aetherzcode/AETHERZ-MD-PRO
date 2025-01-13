import axios from 'axios'
import { FormData, Blob } from 'formdata-node';
let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'Fotonya Mana? Reply gambar yg gk ada button aja'
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`
    m.reply(wait)
    let img = await q.download()
    let form = new FormData()
    let blob = new Blob([img], { type: "image/jpg" })
    form.append("file", blob, 'image.jpg')
    let { data } = await axios({
            baseURL: APIs['rose'],
            url: "/image/differentMe",
            method: "POST",
            params: {
                style: 'anime',
                json: true,
                apikey: APIKeys[APIs['rose']],
            },
            data: form,
    })
    let image = Buffer.from(data.result.base64Image, "base64")
    conn.sendFile(m.chat, image, '', 'Ini Dia Kak', m)
}
handler.help = ['differentme']
handler.tags = ['ai']
handler.command = /^(differentme)$/i
handler.limit = true
export default handler